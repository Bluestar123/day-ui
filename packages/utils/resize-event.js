import isServer from './isServer'
import ResizeObserver from 'resize-observer-polyfill'

const resizeHandler = function(entries) {
  for (const entry of entries) {
    /**
     * const {left, top, width, height} = entry.contentRect;
     * 'Element:', entry.target
        Element's size: ${ width }px x ${ height }px`
        Element's paddings: ${ top }px ; ${ left }px`
     */
    const listeners = entry.__resizeListeners__ || []
    if (listeners.length) {
      listeners.forEach(fn => fn())
    }
  }
}
// 监听element元素size改变，执行fn
export const addResizeListener = function(element, fn) {
  if (isServer || !element) return
  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = []
    /**
     * https://github.com/que-etc/resize-observer-polyfill
     *
     */
    element.__ro__ = new ResizeObserver(resizeHandler)
    // 观察的对象
    element.__ro__.observe(element)
  }
  element.__resizeListeners__.push(fn)
}
// 退出移除监听
export const removeResizeListener = function(element, fn) {
  if (!element || !element.__resizeListeners__) return
  element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1)
  if (!element.__resizeListeners__.length) {
    // 取消监听
    element.__ro__.disconnect()
  }
}
