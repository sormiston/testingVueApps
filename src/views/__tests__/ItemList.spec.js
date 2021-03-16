import { shallowMount } from '@vue/test-utils';
import ItemList from '@/views/ItemList.vue';
import Item from '@/components/Item.vue';
import flushPromises from 'flush-promises';
import { fetchListData } from '@/api/api.js';

jest.mock('@/api/api.js');

describe('ItemList.vue', () => {
  test('calls $bar start on load', () => {
    const $bar = {
      start: jest.fn(),
      finish: () => {}
    };
    shallowMount(ItemList, { mocks: { $bar } });
    expect($bar.start).toHaveBeenCalledTimes(1);
  });

  test('renders an Item with data for each item', async () => {
    expect.assertions(4);
    // mock obj not used here, but necessary for "leaky bucket" problem
    const $bar = {
      start: () => {},
      finish: () => {}
    };
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
    fetchListData.mockResolvedValueOnce(items); // one-time only mock implementation for this test
    const wrapper = shallowMount(ItemList, { mocks: { $bar } });
    await flushPromises();
    const Items = wrapper.findAllComponents(Item);
    expect(Items).toHaveLength(items.length);
    Items.wrappers.forEach((wrapper, i) => {
      expect(wrapper.props().item).toBe(items[i]);
    });
  });

  test('calls $bar.finish when load is successful', async () => {
    expect.assertions(1);
    const $bar = {
      start: () => {},
      finish: jest.fn()
    };
    shallowMount(ItemList, { mocks: { $bar } });
    // mock provided by imported module, see line 7
    await flushPromises();

    expect($bar.finish).toHaveBeenCalled();
  });

  test('calls $bar.fail when load unsuccessful', async () => {
    expect.assertions(1);
    const $bar = {
      start: () => {},
      finish: () => {},
      fail: jest.fn()
    };
    fetchListData.mockRejectedValueOnce()
    shallowMount(ItemList, { mocks: { $bar } })
    await flushPromises()
    
    expect($bar.fail).toHaveBeenCalled()
  });
});
