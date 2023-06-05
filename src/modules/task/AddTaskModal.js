import Task from './Task';
import LocalStorage from '../../LocalStorage';
import RenderTaskModal from './RenderTaskModal';
import TaskRenderer from './TaskRenderer';

export default class AddTaskModal {
  //Show Add New Task Modal
  static open() {
    const showNewTaskModal = document.querySelector('.add-task');
    showNewTaskModal.showModal();
  }

  //Close new task modal
  static close() {
    const newTaskModal = document.querySelector('.add-task');
    RenderTaskModal.resetForm();
    newTaskModal.close();
  }

  //Init add new task form button event listeners
  static initEvenentListeners() {
    const submitTask = document.querySelector('.submit-task-button');
    //Save new task
    submitTask.addEventListener('click', () => {
      if (!document.querySelector('#task').value) {
        return;
      }
      LocalStorage.saveTask(this.getFormData());
      TaskRenderer.renderWorkingFolder();
    });
    const closeModal = document.querySelector('.close-task-modal-button');
    //Cancel new task submit form
    closeModal.addEventListener('click', (event) => {
      event.preventDefault();
      this.close();
    });
  }

  static getFormData() {
    const newTask = new Task(document.querySelector('#task').value);
    return newTask;
  }
}
