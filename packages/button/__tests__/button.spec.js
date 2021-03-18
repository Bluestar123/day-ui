import { mount } from '@vue/test-utils'
import Button from '../src/index.vue'

const AXIOM = 'Rem is the best girl'

describe('Button.vue', () => {
  it('create', () => {
    const wrapper = mount(Button, {
      props: { type: 'primary' }
    })
    expect(wrapper.classes()).toContain('d-button--primary')
  })

  it('icon', () => {
    const wrapper = mount(Button, {
      props: { icon: 'search' }
    })
    expect(wrapper.find('.d-icon-search').exists()).toBeTruthy()
  })
  it('nativeType', () => {
    const wrapper = mount(Button, {
      props: { nativeType: 'submit' }
    })
    expect(wrapper.attributes('type')).toBe('submit')
  })
  it('loading', () => {
    const wrapper = mount(Button, {
      props: { loading: true }
    })
    expect(wrapper.classes()).toContain('is-loading')
    expect(wrapper.find('.d-icon-loading').exists()).toBeTruthy()
  })
  it('size', () => {
    const wrapper = mount(Button, {
      props: { size: 'medium' }
    })
    expect(wrapper.classes()).toContain('d-button--medium')
  })
  it('plain', () => {
    const wrapper = mount(Button, {
      props: { plain: true }
    })
    expect(wrapper.classes()).toContain('is-plain')
  })
  it('round', () => {
    const wrapper = mount(Button, {
      props: { round: true }
    })
    expect(wrapper.classes()).toContain('is-round')
  })
  it('circle', () => {
    const wrapper = mount(Button, {
      props: { circle: true }
    })
    expect(wrapper.classes()).toContain('is-circle')
  })

  test('render text', () => {
    const wrapper = mount(Button, {
      slots: {
        default: AXIOM
      }
    })
    expect(wrapper.text()).toEqual(AXIOM)
  })

  test('handle click', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: AXIOM
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted()).toBeDefined()
  })

  test('handle click inside', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: '<span class="inner-slot"></span>'
      }
    })
    await wrapper.element.querySelector('.inner-slot').click()
    expect(wrapper.emitted()).toBeDefined()
  })

  test('loading implies disabled', async () => {
    const wrapper = mount(Button, {
      slots: {
        default: AXIOM
      },
      props: { loading: true }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })

  it('disabled', async () => {
    const wrapper = mount(Button, {
      props: { disabled: true }
    })
    expect(wrapper.classes()).toContain('is-disabled')
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeUndefined()
  })
})
