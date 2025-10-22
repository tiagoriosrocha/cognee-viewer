// Teste para o componente App
// Este arquivo demonstra como testar componentes Vue

import { mount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
  it('renders properly', () => {
    const wrapper = mount(App)
    expect(wrapper.exists()).toBe(true)
  })

  it('has the correct name', () => {
    const wrapper = mount(App)
    expect(wrapper.vm.$options.name).toBe('App')
  })

  it('renders AppLayout component', () => {
    const wrapper = mount(App)
    expect(wrapper.findComponent({ name: 'AppLayout' }).exists()).toBe(true)
  })
})
