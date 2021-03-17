<template>
  <div ref="root" class="d-affix" :style="rootStyle">
    <!-- 定位元素 -->
    <div :class="{ 'd-affix--fixed': state.fixed }" :style="affixStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {
  defineComponent,
  computed,
  ref,
  reactive,
  watch,
  onMounted,
  onBeforeMount
} from 'vue'
import { getScrollContainer, off, on } from 'packages/utils/dom'
import {
  addResizeListener,
  removeResizeListener
} from 'packages/utils/resize-event'

export default defineComponent({
  name: 'DAffix',
  props: {
    zIndex: {
      type: Number,
      default: 100
    },
    // 在哪个容器内
    target: {
      type: String,
      default: ''
    },
    // 上下偏移量
    offset: {
      type: Number,
      default: 0
    },
    position: {
      type: String,
      default: 'top'
    }
  },
  emits: ['scroll', 'change'],
  setup(props, { emit }) {
    const target = ref(null)
    const root = ref(null)
    const scrollContainer = ref(null)
    // 定位元素属性
    const state = reactive({
      fixed: false,
      height: 0, // height of target
      width: 0, // width of target
      scrollTop: 0, // scrollTop of documentElement
      clientHeight: 0, // 窗口高度
      transform: 0
    })

    const rootStyle = computed(() => {
      return {
        height: state.fixed ? `${state.height}px` : '',
        width: state.fixed ? `${state.width}px` : ''
      }
    })

    const affixStyle = computed(() => {
      if (!state.fixed) return
      const offset = props.offset ? `${props.offset}px` : 0
      const transform = state.transform
        ? `translateY(${state.transform}px)`
        : ''

      return {
        height: `${state.height}px`,
        width: `${state.width}px`,
        top: props.position === 'top' ? offset : '',
        bottom: props.position === 'bottom' ? offset : '',
        transform: transform,
        zIndex: props.zIndex
      }
    })

    const updateState = () => {
      const rootRect = root.value.getBoundingClientRect()
      const targetRect = target.value.getBoundingClientRect()
      //
      state.height = rootRect.height
      state.width = rootRect.width
      // 没有 target 取 html 的 scrollTOP
      state.scrollTop =
        scrollContainer.value === window
          ? document.documentElement.scrollTop
          : scrollContainer.value.scrollTop

      state.clientHeight = document.documentElement.clientHeight
      if (props.position === 'top') {
        if (props.target) {
          const difference = targetRect.bottom - props.offset - state.height
          state.fixed = props.offset > rootRect.top && targetRect.bottom > 0
          state.transform = difference < 0 ? difference : 0
        } else {
          // 以html为相对容器，页面滚动，固定定位
          state.fixed = props.offset > rootRect.top
        }
      } else {
        if (props.target) {
          const difference =
            state.clientHeight - targetRect.top - props.offset - state.height
          state.fixed =
            state.clientHeight - props.offset < rootRect.bottom &&
            state.clientHeight > targetRect.top
          state.transform = difference < 0 ? -difference : 0
        } else {
          console.log(state.clientHeight - props.offset, rootRect.bottom)
          state.fixed = state.clientHeight - props.offset < rootRect.bottom
        }
      }
    }

    const onScroll = () => {
      updateState()
      emit('scroll', {
        scrollTop: state.scrollTop,
        fixed: state.fixed
      })
    }

    watch(
      () => state.fixed,
      () => {
        emit('change', state.fixed)
      }
    )

    onMounted(() => {
      if (props.target) {
        target.value = document.querySelector(props.target)
        if (!target.value) {
          throw new Error(`target is not existed: ${props.target}`)
        }
      } else {
        target.value = document.documentElement // html
      }

      scrollContainer.value = getScrollContainer(root.value)
      on(scrollContainer.value, 'scroll', onScroll)
      addResizeListener(root.value, updateState)
    })

    onBeforeMount(() => {
      off(scrollContainer.value, 'scroll', onScroll)
      removeResizeListener(root.value, updateState)
    })

    return {
      root,
      state,
      rootStyle,
      affixStyle
    }
  }
})
</script>
