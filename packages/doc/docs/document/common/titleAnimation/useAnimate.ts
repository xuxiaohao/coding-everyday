import { onMounted, ref } from 'vue'

export function useAnimate(options) {
  const elRef = ref<HTMLDivElement>()

  onMounted(() => {
    const el = elRef.value

    let index = 0
    el?.querySelectorAll(options.selector).forEach((p) => {
      const spans = p.textContent.split('').map((v) => {
        return `<span style="--time:${index++ * options.duration}ms">${v}</span>`
      })
      p.innerHTML = spans.join('')
    })
  })

  return {
    elRef
  }
}
