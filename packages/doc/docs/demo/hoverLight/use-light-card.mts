import { onMounted, onUnmounted, ref } from 'vue'

export interface IOptions {
  width?: number
  height?: number
  color?: string
  blur?: number
}

export function useLightCard(options: IOptions = {}) {
  const cardRef = ref<HTMLDivElement | null>(null) // 获取卡片的DOM

  const _options = Object.assign(
    {
      width: 60,
      height: 60,
      color: '#ff4132',
      blur: 30
    },
    options
  )

  // 鼠标移入
  function onMouseEnter() {
    cardRef.value?.classList.add('light')
  }

  function onMouseMove(e: MouseEvent) {
    const { clientX, clientY } = e
    const cardDom = cardRef.value
    if (cardDom) {
      const { x, y } = cardDom.getBoundingClientRect()

      cardDom.style.setProperty('--x', clientX - x - _options.width / 2 + 'px')
      cardDom.style.setProperty('--y', clientY - y - _options.height / 2 + 'px')
      cardDom.style.setProperty('--color', _options.color)
      cardDom.style.setProperty('--blur', _options.blur + 'px')

      // 设置动画效果
      const rotateX = ((clientX - x - 100) / 100) * 2
      const rotateY = ((clientY - y - 100) / 100) * 2

      cardDom.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
    }
  }

  function onMouseLeave() {
    const cardDom = cardRef.value

    // 移除样式属性
    if (cardDom) {
      cardDom.style.removeProperty('--x')
      cardDom.style.removeProperty('--y')
      cardDom.style.removeProperty('--color')
      cardDom.style.removeProperty('--blur')
      cardDom.style.removeProperty('transform')
      if (cardDom.getAttribute('style') === '') {
        cardDom.removeAttribute('style')
      }
    }
    cardRef.value?.classList.remove('light')
  }

  onMounted(() => {
    cardRef.value?.addEventListener('mouseenter', onMouseEnter)
    cardRef.value?.addEventListener('mousemove', onMouseMove)
    cardRef.value?.addEventListener('mouseleave', onMouseLeave)
  })

  onUnmounted(() => {
    cardRef.value?.removeEventListener('mouseenter', onMouseEnter)
    cardRef.value?.removeEventListener('mousemove', onMouseMove)
    cardRef.value?.removeEventListener('mouseleave', onMouseLeave)
  })

  return {
    cardRef
  }
}
