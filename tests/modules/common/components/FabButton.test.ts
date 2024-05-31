import { shallowMount } from '@vue/test-utils';
import FabButton from '@/modules/common/components/FabButton.vue';

describe('<FabButton />', () => {
  it('Renders with default position', () => {
    const wrapper = shallowMount(FabButton);
    const defaultPosition = 'bottom-right';

    const buttonClasses = wrapper.find('button').classes();
    const classesToHave = [
      'btn',
      'btn-circle',
      'btn-secondary',
      'fixed',
      'overflow-hidden',
      defaultPosition,
    ];

    expect(wrapper.props().position).toBe(defaultPosition);
    expect(buttonClasses).toEqual(classesToHave);
  });

  it('Renders with top-left position', () => {
    const wrapper = shallowMount(FabButton, {
      props: {
        position: 'top-left',
      },
    });

    const button = wrapper.find('button');

    expect(button.classes()).toContain('top-left');
  });

  it('Renders with top-right position', () => {
    const wrapper = shallowMount(FabButton, {
      slots: {
        default: '<span>Hello</span>',
      },
    });

    const slotContent = wrapper.find('button span');

    expect(slotContent.exists()).toBe(true);
    expect(slotContent.text()).toBe('Hello');
  });
});
