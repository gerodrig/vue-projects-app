import { mount } from '@vue/test-utils';
import CustomModal from '@/modules/common/components/CustomModal.vue';

describe('<CustomModal />', () => {
  it('Renders dialog with default stae', () => {
    const wrapper = mount(CustomModal);

    const modal = wrapper.find('.modal');
    expect(modal.attributes('open')).toBeUndefined();
  });

  it('Renders dialog with header, body and footer solots', () => {
    const wrapper = mount(CustomModal, {
      slots: {
        header: '<span>Header content</span>',
        body: '<span>Body content</span>',
        footer: '<span>Footer content</span>',
      },
    });
    expect(wrapper.text()).toContain('Header content');
    expect(wrapper.find('.my-5').text()).toContain('Body content');
    expect(wrapper.text()).toContain('Footer content');
  });

  it('Opens and closes dialog when open prop changes', async () => {
    const wrapper = mount(CustomModal, {
      props: {
        open: true,
      },
    });

    const modal = wrapper.find('.modal');
    const modalBackground = wrapper.find('.modal-backdrop');

    expect(modal.attributes('open')).toBeDefined();

    //check for backdrop
    expect(modalBackground.exists()).toBe(true);
    expect(modalBackground.classes()).toEqual([
      'fixed',
      'top-0',
      'left-0',
      'z-10',
      'w-screen',
      'h-screen',
      'bg-black',
      'modal-backdrop',
      'opacity-40',
    ]);

    //change open prop
    await wrapper.setProps({ open: false });

    expect(modal.attributes('open')).toBeUndefined();
    expect(modalBackground.find('.modal-backdrop').exists()).toBe(false);
  });
});
