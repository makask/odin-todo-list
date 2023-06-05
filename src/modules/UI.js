import AddTaskModal from './task/AddTaskModal';
import LocalStorage from '../LocalStorage';
import RenderTaskModal from './task/RenderTaskModal';
import TaskRenderer from './task/TaskRenderer';
import AddProjectForm from './project/AddProjectForm';
import ProjectRenderer from './project/ProjectRenderer';
import Folder from './Folder';
import ProjectHtmlElement from './project/ProjectHtmlElement';
import AddProjectTaskModal from './project/AddProjectTaskModal';

export default class UI {
  static loadHomePage() {
    LocalStorage.initEmptyTaskList();
    LocalStorage.initEmptyProjectList();
    TaskRenderer.renderTaskList();
    ProjectRenderer.renderProjectNames();
    this.initMainPageEventListeners();
    Folder.setFolder('Home');
  }

  static initMainPageEventListeners() {
    //Open add new task modal
    const addNewTask = document.querySelector('.add-new-task-button');
    addNewTask.addEventListener('click', (event) => {
      RenderTaskModal.resetForm();
      AddTaskModal.open();
    });
    AddTaskModal.initEvenentListeners();
    // Home button
    const homeBtn = document.querySelector('.home');
    homeBtn.addEventListener('click', () => {
      Folder.setFolder('Home');
      ProjectRenderer.disableAddProjectTaskBtn();
      TaskRenderer.renderTaskList();
    });
    // Show todays tasks
    const todaysTasksBtn = document.querySelector('.today');
    todaysTasksBtn.addEventListener('click', () => {
      Folder.setFolder('Today');
      ProjectRenderer.disableAddProjectTaskBtn();
      TaskRenderer.renderTodaysTasks();
    });
    // Show weeks tasks
    const weeksTasksBtn = document.querySelector('.week');
    weeksTasksBtn.addEventListener('click', () => {
      Folder.setFolder('Week');
      ProjectRenderer.disableAddProjectTaskBtn();
      TaskRenderer.renderWeeksTasks();
    });

    // Add new project form
    const addProjectBtn = document.querySelector('.add-project-btn');
    addProjectBtn.addEventListener('click', () => {
      AddProjectForm.open();
    });
    AddProjectForm.initEventListeners();

    // Add new project task button
    document
      .querySelector('.add-new-project-task')
      .addEventListener('click', () => {
        // Open project task input modal
        RenderTaskModal.resetAddProjectTaskForm();
        AddProjectTaskModal.open();
      });

    AddProjectTaskModal.initEventListeners();
  }
}
