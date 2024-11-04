import { isRef as p, ref as i, shallowRef as g, watchEffect as w, computed as A } from 'vue'
const E = () => {}
function z(v, u, a) {
  let l
  p(a)
    ? (l = {
        evaluating: a,
      })
    : (l = a || {})
  const { lazy: s = !1, evaluating: e = void 0, shallow: h = !0, onError: d = E } = l,
    o = i(!s),
    n = h ? g(u) : i(u)
  let t = 0
  return (
    w(async (m) => {
      if (!o.value) return
      t++
      const c = t
      let f = !1
      e &&
        Promise.resolve().then(() => {
          e.value = !0
        })
      try {
        const r = await v((y) => {
          m(() => {
            e && (e.value = !1), f || y()
          })
        })
        c === t && (n.value = r)
      } catch (r) {
        d(r)
      } finally {
        e && c === t && (e.value = !1), (f = !0)
      }
    }),
    s ? A(() => ((o.value = !0), n.value)) : n
  )
}
export { z as asyncComputed, z as computedAsync }
