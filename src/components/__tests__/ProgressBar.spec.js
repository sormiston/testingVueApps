import { shallowMount } from '@vue/test-utils';
import ProgressBar from '../ProgressBar.vue';

describe('ProgressBar.vue', () => {
  test('is hidden on initial render', () => {
    const wrapper = shallowMount(ProgressBar);
    expect(wrapper.classes()).toContain('hidden'); // #A
  });

  test('initializes with 0% width', () => {
    const wrapper = shallowMount(ProgressBar);
    expect(wrapper.element.style.width).toBe('0%'); // #A
  });

  test('displays the bar when start is called', () => {
    const wrapper = shallowMount(ProgressBar)
    expect(wrapper.classes()).toContain('hidden')
    wrapper.vm.start()
    expect(wrapper.classes()).not.toContain('hidden')
  });
});
