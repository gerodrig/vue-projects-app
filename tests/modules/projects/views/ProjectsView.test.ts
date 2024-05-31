import { useProjectsStore } from '@/modules/projects/store/projects.store';
import ProjectsView from '@/modules/projects/views/ProjectsView.vue';
import { createTestingPinia } from '@pinia/testing';
import { mount } from '@vue/test-utils';
import { fakeProjects } from '../../../mocks/projects.fake';

describe('<ProjectsView />', () => {
  const wrapper = mount(ProjectsView, {
    global: {
      plugins: [createTestingPinia()],
    },
  });

  const store = useProjectsStore();

  beforeEach(() => {
    store.$patch({
      projects: fakeProjects,
    });
  });

  it('Should render with projects', () => {
    const tableRows = wrapper.findAll('tbody tr');
    expect(tableRows).toHaveLength(fakeProjects.length);
    tableRows.forEach((row, index) => {
      const project = fakeProjects[index];
      const cell = row.findAll('td');

      expect(cell[0].text()).toBe(project.name);
      expect(cell[1].text()).toBe(project.tasks.length.toString());
    });
  });
  it('Should call addProject method when launching modal', () => {
    const inputModal = wrapper.findComponent({ name: 'InputModal' });
    const newsProjectName = 'New Project';

    inputModal.vm.$emit('value', newsProjectName);

    expect(store.addProject).toHaveBeenCalled();
    expect(store.addProject).toHaveBeenCalledWith(newsProjectName);
  });
});
