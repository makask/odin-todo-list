import LocalStorage from '../../LocalStorage';
import RenderTaskModal from '../task/RenderTaskModal';
import Project from './Project';
import ProjectRenderer from './ProjectRenderer';

export default class AddProjectForm {
  static open() {
    document.querySelector('.add-project-form').classList.remove('hidden');
    document.querySelector('.project-header-div').classList.add('hidden');
  }

  static close() {
    document.querySelector('.add-project-form').classList.add('hidden');
    document.querySelector('.project-header-div').classList.remove('hidden');
  }

  static initEventListeners() {
    // Add new Project
    document
      .querySelector('.add-new-project-btn')
      .addEventListener('click', (event) => {
        event.preventDefault();
        if (!document.querySelector('.input-pr-name').value) {
          alert('Project name must not be empty!');
          return;
        }
        // Save new project task
        LocalStorage.saveProject(this.getFormData());
        ProjectRenderer.renderProjectNames();
        RenderTaskModal.resetAddProjectForm();
        this.close();
      });
    // Close Add New Project
    document
      .querySelector('.cancel-new-project-btn')
      .addEventListener('click', (event) => {
        event.preventDefault();
        RenderTaskModal.resetAddProjectForm();
        this.close();
      });

    document
      .querySelector('.input-pr-name')
      .addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          RenderTaskModal.resetAddProjectForm();
          this.close();
        }
      });
  }

  static getFormData() {
    const newProject = new Project(
      document.querySelector('.input-pr-name').value
    );
    return newProject;
  }
}
