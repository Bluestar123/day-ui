import { mount } from '@vue/test-utils'
import Icon from '../src/index.vue'

describe('Icon', () => {
  it('test', () => {
    const wrapper = mount(Icon, {
      props: {
        name: 'test'
      }
    })
    expect(wrapper.classes()).toContain('d-icon-test')
  })
})
