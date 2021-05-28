<template>
  <!-- 显示隐藏有动画效果 -->
  <transition name="d-alert-fade">
    <div
      class="d-alert"
      :class="[typeClass, center ? 'is-center' : '', 'is-' + effect]"
      v-show="visible"
      role="alert"
    >
      <!-- 左侧图标 -->
      <i
        class="d-alert__icon"
        :class="[iconClass, isBigIcon]"
        v-if="showIcon"
      ></i>
      <!-- title 和 描述 -->
      <div class="d-alert__content">
        <span
          class="d-alert__title"
          :class="[isBoldTitle]"
          v-if="title || $slots.title"
        >
          <slot name="title">{{ title }}</slot>
        </span>
        <p v-if="$slots.default && !description" class="d-alert__description">
          <slot></slot>
        </p>
        <p v-if="description && !$slots.default" class="d-alert__description">
          {{ description }}
        </p>
        <i
          class="d-alert__closebtn"
          :class="{
            'is-customed': closeText !== '',
            'd-icon-close': closeText === ''
          }"
          v-show="closable"
          @click="close"
          >{{ closeText }}</i
        >
      </div>
    </div>
  </transition>
</template>

<script>
import { computed, defineComponent, toRefs, ref } from 'vue'

// icon 样式色  默认info没放
const TYPE_CLASSES_MAP = {
  success: 'd-icon-success',
  warning: 'd-icon-warning',
  error: 'd-icon-error'
}

export default defineComponent({
  name: 'DAlert',
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    // 按钮对应的几种类型一样
    type: {
      type: String,
      default: 'info'
    },
    closable: {
      type: Boolean,
      default: true
    },
    closeText: {
      type: String,
      default: ''
    },
    showIcon: Boolean,
    center: Boolean,
    effect: {
      type: String,
      default: 'light', // 默认主题 浅色
      validator: function (value) {
        return ['light', 'dark'].indexOf(value) !== -1
      }
    }
  },
  emits: ['close'],
  setup(props, { emit, slots }) {
    // 接受的属性转为响应式
    const { description, type } = toRefs(props)
    // 使用 v-show 显示隐藏
    const visible = ref(true)
    // 关闭事件
    const close = () => {
      visible.value = false
      emit('close')
    }
    const typeClass = computed(() => {
      return `d-alert--${type.value}`
    })

    const iconClass = computed(() => {
      return TYPE_CLASSES_MAP[type.value] || 'd-icon-info'
    })

    const isBigIcon = computed(() => {
      return description.value || slots.default ? 'is-big' : ''
    })
    const isBoldTitle = computed(() => {
      return description.value || slots.default ? 'is-bold' : ''
    })
    return {
      close,
      visible,
      typeClass,
      iconClass,
      isBigIcon,
      isBoldTitle
    }
  }
})
</script>