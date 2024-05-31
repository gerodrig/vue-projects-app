import { nextTick } from 'vue';
import { createTestingPinia } from '@pinia/testing';

import { mount } from '@vue/test-utils';
import SideMenu from '@/modules/projects/components/SideMenu.vue';
import { useProjectsStore } from '@/modules/projects/store/projects.store';
import { fakeProjects } from '../../../mocks/projects.fake';

describe('<SideMenu />', () => {
  const wrapper = mount(SideMenu, {
    global: {
      stubs: ['RouterLink'],
      plugins: [createTestingPinia()],
    },
  });

  const store = useProjectsStore();

  beforeEach(() => {
    store.$patch({
      projects: [],
    });
  });

  it('Should render with no projects', () => {
    expect(wrapper.html()).toContain('There are no projects available');
  });

  it('Should render with projects', async () => {
    store.$patch({
      projects: fakeProjects,
    });

    await nextTick();

    expect(wrapper.html()).not.toContain('There are no projects available');
    expect(wrapper.html()).toMatchSnapshot();
  });
});
