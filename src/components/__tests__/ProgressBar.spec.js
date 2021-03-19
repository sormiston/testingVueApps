import { shallowMount } from '@vue/test-utils'
import { nextTick } from 'vue'
import ProgressBar from '@/components/ProgressBar.vue'

describe('ProgressBar.vue', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  test('is hidden on initial render', () => {
    const wrapper = shallowMount(ProgressBar)
    expect(wrapper.classes()).toContain('hidden') // #A
  })

  test('initializes with 0% width', () => {
    const wrapper = shallowMount(ProgressBar)
    expect(wrapper.element.style.width).toBe('0%') // #A
  })

  test('displays the bar when start is called', async () => {
    const wrapper = shallowMount(ProgressBar)
    expect(wrapper.classes()).toContain('hidden')
    wrapper.vm.start()
    await nextTick()
    expect(wrapper.classes()).not.toContain('hidden')
  })

  test('sets the bar to 100% width when finish is called', async () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.start()
    wrapper.vm.finish()
    await nextTick()
    expect(wrapper.element.style.width).toBe('100%')
  })

  test('hides the bar when finish is called', async () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.start()
    wrapper.vm.finish()
    await nextTick()
    expect(wrapper.classes()).toContain('hidden')
  })

  test('resets to 0% width when start is called', async () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.finish()
    wrapper.vm.start()
    await nextTick()
    expect(wrapper.element.style.width).toBe('0%')
  })

  test('increases width by 1% every 100ms after start call', async () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.start()
    jest.runTimersToTime(100)
    await nextTick()
    expect(wrapper.element.style.width).toBe('1%')
    jest.runTimersToTime(900)
    await nextTick()
    expect(wrapper.element.style.width).toBe('10%')
    jest.runTimersToTime(4000)
    await nextTick()
    expect(wrapper.element.style.width).toBe('50%')
  })

  test('clears timer when finish is called', async () => {
    jest.spyOn(window, 'clearInterval')
    setInterval.mockReturnValue(123)
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.start()
    wrapper.vm.finish()
    await nextTick()
    expect(window.clearInterval).toHaveBeenCalledWith(123)
  })

  test("has class 'error' if fail method called", async () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.fail()
    await nextTick()
    expect(wrapper.classes()).toContain('error')
  })

  // kinda dumb
  test('has width of 100% if fail method called', async () => {
    const wrapper = shallowMount(ProgressBar)
    wrapper.vm.fail()
    await nextTick
    expect(wrapper.element.style.width).toBe('100%')
  })
})
