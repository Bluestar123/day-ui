<template>
  <i :class="`d-icon-${name}`"></i>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DIcon',
  props: {
    name: String
  }
})
</script>
