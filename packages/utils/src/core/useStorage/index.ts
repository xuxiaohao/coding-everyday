import type { RemovableRef } from '@/shared'
import {
  customStorageEventName,
  pausableWatch,
  StorageEventLike,
  tryOnMounted,
  useEventListener,
} from '@vueuse/core'
import { nextTick, ref, shallowRef, toValue, type MaybeRefOrGetter } from 'vue'

export interface StorageLike {
  getItem: (key: string) => string | null
  setItem: (key: string, value: string) => void
  removeItem: (key: string) => void
}

export interface Serializer<T> {
  read: (raw: string) => T
  write: (value: T) => string
}

export interface UseStorageOptions<T> {
  flush?: 'pre' | 'post' | 'sync'
  deep?: boolean
  listenToStorageChanges?: boolean
  writeDefaults?: boolean
  mergeDefaults?: boolean | ((storageValue: T, defaults: T) => T)
  serializer?: Serializer<T>
  onError?: (error: unknown) => void
  shallow?: boolean
  initOnMounted?: boolean
  eventFilter?: (event: StorageEvent) => void
}

function guessSerializerType<T extends string | number | boolean | object | null>(rawInit: T) {
  return rawInit == null
    ? 'any'
    : rawInit instanceof Set
      ? 'set'
      : rawInit instanceof Map
        ? 'map'
        : rawInit instanceof Date
          ? 'date'
          : typeof rawInit === 'boolean'
            ? 'boolean'
            : typeof rawInit === 'string'
              ? 'string'
              : typeof rawInit === 'object'
                ? 'object'
                : !Number.isNaN(rawInit)
                  ? 'number'
                  : 'any'
}

export const StorageSerializer: Record<
  'boolean' | 'object' | 'number' | 'any' | 'string' | 'map' | 'set' | 'date',
  Serializer<any>
> = {
  boolean: {
    read: (v: any) => v === 'true',
    write: (v: any) => String(v),
  },
  object: {
    read: (v: any) => JSON.parse(v),
    write: (v: any) => JSON.stringify(v),
  },
  number: {
    read: (v: any) => Number.parseFloat(v),
    write: (v: any) => String(v),
  },
  any: {
    read: (v: any) => v,
    write: (v: any) => String(v),
  },
  string: {
    read: (v: any) => v,
    write: (v: any) => String(v),
  },
  map: {
    read: (v: any) => new Map(JSON.parse(v)),
    write: (v: any) => JSON.stringify(Array.from((v as Map<any, any>).entries())),
  },
  set: {
    read: (v: any) => new Set(JSON.parse(v)),
    write: (v: any) => JSON.stringify(Array.from(v as Set<any>)),
  },
  date: {
    read: (v: any) => new Date(v),
    write: (v: any) => v.toISOString(),
  },
}

export function useStorage<T extends string | number | boolean | object | null>(
  key: string,
  defaults: MaybeRefOrGetter<T>,
  storage: StorageLike | undefined,
  options: UseStorageOptions<T> = {}
): RemovableRef<T> {
  const {
    flush = 'pre',
    deep = true,
    listenToStorageChanges = true,
    writeDefaults = true,
    mergeDefaults = true,
    shallow,
    eventFilter,
    onError = (e) => {
      console.error(e)
    },
    initOnMounted,
  } = options

  const data = (shallow ? shallowRef : ref)(
    typeof defaults === 'function' ? defaults() : defaults
  ) as RemovableRef<T>

  if (!storage) {
    try {
      storage = window.localStorage
    } catch (e) {
      onError(e)
    }
  }

  if (!storage) {
    return data
  }

  const rawInit: T = toValue(defaults)
  const type = guessSerializerType<T>(rawInit)
  const serializer = options.serializer ?? StorageSerializer[type]

  const { pause: pauseWatch, resume: resumeWatch } = pausableWatch(data, () => write(data.value), {
    flush,
    deep,
    eventFilter,
  } as any)

  if (window && listenToStorageChanges) {
    tryOnMounted(() => {
      if (storage instanceof Storage) {
        useEventListener(window, 'storage', update)
      } else {
        useEventListener(window, customStorageEventName, updateFromCustomEvent)
      }
      if (initOnMounted) {
        update()
      }
    })
  }
  if (!initOnMounted) {
    update()
  }

  function dispatchWriteEvent(oldValue: string | null, newValue: string | null) {
    if (window) {
      const payload = {
        key,
        oldValue,
        newValue,
        storageArea: storage as Storage,
      }

      window.dispatchEvent(
        storage instanceof StorageEvent
          ? new StorageEvent('storage', payload)
          : new CustomEvent<StorageEventLike>(customStorageEventName, {
              detail: payload,
            })
      )
    }
  }

  function write(v: unknown) {
    try {
      const oldValue = storage!.getItem(key)
      if (v === null) {
        dispatchWriteEvent(oldValue, null)
        storage!.removeItem(key)
      } else {
        const serialized = serializer.write(v as any)
        if (oldValue !== serialized) {
          storage!.setItem(key, serialized)
          dispatchWriteEvent(oldValue, serialized)
        }
      }
    } catch (e) {
      onError(e)
    }
  }

  function read(event?: StorageEventLike) {
    const rawValue = event ? event.newValue : storage!.getItem(key)

    if (rawValue == null) {
      if (writeDefaults && rawInit != null) {
        storage!.setItem(key, serializer.write(rawInit))
      }
      return rawInit
    } else if (!event && mergeDefaults) {
      const value = serializer.read(rawValue)
      if (typeof mergeDefaults === 'function') {
        return mergeDefaults(value, rawInit)
      } else if (type === 'object' && !Array.isArray(value)) {
        return { ...(rawInit as any), ...value }
      }
      return value
    } else if (typeof rawValue !== 'string') {
      return rawValue
    } else {
      return serializer.read(rawValue)
    }
  }

  function update(event?: StorageEventLike) {
    if (event && event.storageArea !== storage) {
      return
    }
    if (event && event.key == null) {
      data.value = rawInit
      return
    }

    if (event && event.key !== key) {
      return
    }

    pauseWatch()
    try {
      if (event?.newValue !== serializer.write(data.value)) {
        data.value = read(event)
      }
    } catch (e) {
      onError(e)
    } finally {
      if (event) {
        nextTick(resumeWatch)
      } else {
        resumeWatch()
      }
    }
  }

  function updateFromCustomEvent(event: CustomEvent<StorageEventLike>) {
    update(event.detail)
  }

  return data
}
