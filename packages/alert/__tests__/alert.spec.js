import DAlert from '../src/index.vue'
import { mount } from '@vue/test-utils'

describe('alert.vue', () => {
  describe('props', () => {
    it('title', () => {
      const wrapper = mount(DAlert, {
        props: {
          title: 'test title'
        }
      })

      const wrapperSlot = mount(DAlert, {
        slots: {
          title: () => {
            return 'title slot'
          }
        }
      })

      expect(wrapper.find('span').text()).toBe('test title')
      expect(wrapperSlot.find('span').text()).toBe('title slot')
    })

    it('description', () => {
      const wrapper = mount(DAlert, {
        props: {
          description: 'test description'
        }
      })
      const wrapperSlot = mount(DAlert, {
        slots: {
          default: () => {
            return 'description slot'
          }
        }
      })
      expect(wrapper.find('.el-alert__description').text()).toBe(
        'test description'
      )
      expect(wrapperSlot.find('.el-alert__description').text()).toBe(
        'description slot'
      )
    })

    it('closable', () => {
      const wrapperTrue = mount(DAlert, {
        props: {
          closable: true
        }
      })

      const wrapperTrueWithText = mount(DAlert, {
        props: {
          closable: true,
          closeText: '知道了'
        }
      })
      const wrapperFalse = mount(DAlert, {
        props: {
          closable: false
        }
      })
      expect(wrapperTrue.find('.el-alert__closebtn').attributes('style')).toBe(
        undefined
      )
      expect(wrapperTrueWithText.find('.el-alert__closebtn').text()).toBe(
        '知道了'
      )
      expect(wrapperFalse.find('.el-alert__closebtn').attributes('style')).toBe(
        'display: none;'
      )
    })
  })
  it('showIcon', () => {
    const wrapperTrue = mount(DAlert, {
      props: {
        showIcon: true
      }
    })
    const wrapperFalse = mount(DAlert, {
      props: {
        showIcon: false
      }
    })
    expect(wrapperTrue.find('.el-alert__icon').exists()).toBe(true)
    expect(wrapperFalse.find('.el-alert__icon').exists()).toBe(false)
  })
})

describe('event', () => {
  it('close', () => {
    const wrapper = mount(DAlert)
    wrapper.find('.el-alert__closebtn').trigger('click')
    expect(wrapper.emitted('close')).toBeTruthy()
  })
})
