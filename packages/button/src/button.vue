<template>
  <button
    :class="[
      'p-button',
      type ? 'p-button--' + type : '',
      buttonSize ? 'p-button--' + buttonSize : '',
      {
        'is-disabled': disabled,
        'is-loading': loading,
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle
      }
    ]"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="buttonType"
    @click="handleClick"
  >
    <i v-if="loading" class="p-icon-loading"></i>
    <i v-if="icon && !loading" :class="'p-icon-' + icon"></i>
    <span v-if="$slots.default"><slot></slot></span>
    <!--v-if="$slots.default" 防止span标签占位-->
  </button>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'DButton',
  props: {
    type: {
      type: String,
      default: 'default',
      validator: (val) => {
        return [
          'primary',
          'success',
          'warning',
          'danger',
          'info',
          'text',
          'default'
        ].includes(val)
      }
    },
    size: {
      type: String,
      default: 'medium',
      validator: (val) => {
        return ['', 'large', 'medium', 'small', 'mini'].includes(val)
      }
    },
    icon: {
      type: String,
      default: ''
    },
    buttonType: {
      type: String,
      default: 'button',
      validator: (val) => {
        return ['button', 'reset', 'submit'].includes(val)
      }
    },
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    autofocus: Boolean,
    round: Boolean,
    circle: Boolean
  },
  emits: ['click'],
  setup(props, { emit }) {
    // const vm: any = getCurrentInstance()
    // let $PEACE = {}
    // if ('$PEACE' in vm.proxy) {
    //   $PEACE = vm.proxy.$PEACE
    // }

    const buttonSize = computed(() => {
      return props.size || 'medium'
    })

    const handleClick = (e) => {
      emit('click', e)
    }

    return {
      buttonSize,
      handleClick
    }
  }
})
</script>

<style lang="sass" scoped>
@import '../../../styles/button.scss'
</style>
