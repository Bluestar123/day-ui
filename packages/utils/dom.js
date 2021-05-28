import isServer from './isServer'
import { camelize } from './util'

// 函数式编程处理元素监听
export const on = function(element, event, handler, useCapture = false) {
  if (element && event && handler) {
    element.addEventListener(event, handler, useCapture)
  }
}

export const off = function(element, event, handler, useCapture = false) {
  if (element && event && handler) {
    element.removeEventListener(event, handler, useCapture)
  }
}

export const getStyle = function(element, styleName) {
  if (isServer) return
  if (!element || !styleName) return null
  styleName = camelize(styleName)
  if (styleName === 'float') {
    /**
     * ie6~8下：style.styleFloat
        FF/chrome 以及ie9以上：style.cssFloat
     */
    styleName = 'cssFloat' // FF/chrome 以及ie9以上   float兼容性写法
  }
  try {
    const style = element.style[styleName]
    if (style) return style
    // 获取window对象， firefox低版本3.6 才能使用getComputed方法，iframe pupup extension window === document.defaultView，否则指向错误
    // https://www.cnblogs.com/yuan-shuai/p/4125511.html
    const computed = document.defaultView.getComputedStyle(element, '')
    return computed ? computed[styleName] : ''
  } catch (e) {
    return element.style[styleName]
  }
}

/**
 *
 * @param {*} el
 * @param {*} isVertical 是否垂直方向 overflow-y
 * @returns
 */
export const isScroll = (el, isVertical) => {
  if (isServer) return
  const determineDirection = isVertical === null || isVertical === undefined
  const overflow = determineDirection
    ? getStyle(el, 'overflow')
    : isVertical
    ? getStyle(el, 'overflow-y')
    : getStyle(el, 'overflow-x')

  return overflow.match(/(scroll|auto)/)
}

/**
 * 获取滚动容器
 * @param {*} el 滚动的容器
 * @param {*} isVertical
 * @returns
 */
export const getScrollContainer = (el, isVertical) => {
  if (isServer) return
  let parent = el
  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return window
    }
    if (isScroll(parent, isVertical)) {
      return parent
    }
    parent = parent.parentNode
  }
  return parent
}
