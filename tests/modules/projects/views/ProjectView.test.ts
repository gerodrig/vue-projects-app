import { useRouter } from 'vue-router';
import type { Mock } from 'vitest';
import { mount } from '@vue/test-utils';

import { useProjectsStore } from '@/modules/projects/store/projects.store';
import { fakeProjects } from '../../../mocks/projects.fake';
import ProjectView from '@/modules/projects/views/ProjectView.vue';

vi.mock('vue-router');
vi.mock('@/modules/projects/store/projects.store');

describe('Description', () => {
  it('Should render with project data', () => {
    (useProjectsStore as any).mockReturnValue({
      projectList: fakeProjects,
    });

    const wrapper = mount(ProjectView, {
      props: {
        id: '1',
      },
      global: {
        stubs: ['RouterLink'],
      },
    });
    const tableRows = wrapper.findAll('tr.hover');

    expect(tableRows.length).toBe(fakeProjects[0].tasks.length + 1);
  });
  it('Should redirect to projects page if projectId is not found', () => {
    (useProjectsStore as any).mockReturnValue({
      projectList: [],
    });

    const replaceSpy = vi.fn();

    (useRouter as Mock).mockReturnValue({
      replace: replaceSpy,
    });

    mount(ProjectView, {
      props: {
        id: '1',
      },
      global: {
        stubs: ['RouterLink'],
      },
    });

    expect(replaceSpy).toHaveBeenCalledWith('/');
  });
});
