import RenderTaskModal from '../task/RenderTaskModal';
import ProjectHtmlElement from './ProjectHtmlElement';
import LocalStorage from '../../LocalStorage';
import Task from '../task/Task';
import ProjectTaskRenderer from './ProjectTaskRenderer';

export default class AddProjectTaskModal {
  static open() {
    document.querySelector('.add-project-task').showModal();
  }

  static close() {
    RenderTaskModal.resetAddProjectTaskForm();
    document.querySelector('.add-project-task').close();
  }

  static initEventListeners() {
    // Save new project task
    document
      .querySelector('.submit-project-task-button')
      .addEventListener('click', () => {
        if (!document.querySelector('#project-task').value) {
          return;
        }
        const newTask = new Task(this.getProjectTaskFormData());
        LocalStorage.saveProjectTask(
          ProjectHtmlElement.getProjectId(),
          newTask
        );
        ProjectTaskRenderer.renderProjectTasks(
          ProjectHtmlElement.getProjectId()
        );
      });
    // Close new project task submit form
    document
      .querySelector('.close-project-task-modal-button')
      .addEventListener('click', (event) => {
        event.preventDefault();
        this.close();
      });
  }

  static getProjectTaskFormData() {
    return document.querySelector('#project-task').value;
  }
}
