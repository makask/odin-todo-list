import AddTaskModal from './task/AddTaskModal';
import LocalStorage from '../LocalStorage';
import RenderTaskModal from './task/RenderTaskModal';
import TaskRenderer from './task/TaskRenderer';
import AddProjectForm from './project/AddProjectForm';
import ProjectRenderer from './project/ProjectRenderer';
import Folder from './Folder';
import ProjectHtmlElement from './project/ProjectHtmlElement';
import AddProjectTaskModal from './project/AddProjectTaskModal';
import ProjectTaskRenderer from './project/ProjectTaskRenderer';

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
      Folder.setHomeBtnActive();
    });
    // Show todays tasks
    const todaysTasksBtn = document.querySelector('.today');
    todaysTasksBtn.addEventListener('click', () => {
      // Render todays project tasks
      if (
        Folder.getFolder() !== 'Today' &&
        Folder.getFolder() !== 'Home' &&
        Folder.getFolder() !== 'Week'
      ) {
        let projectName = LocalStorage.getProjectName(
          ProjectHtmlElement.getProjectId()
        );
        if (
          projectName === Folder.getFolder() ||
          Folder.getFolder() === `${projectName} -> Week`
        ) {
          Folder.setFolder(`${projectName} -> Today`);
          Folder.setTodayBtnActive();
          ProjectTaskRenderer.renderTodaysProjectTasks(
            ProjectHtmlElement.getProjectId()
          );
        }
        return;
      }
      // Render todays tasks
      Folder.setFolder('Today');
      ProjectRenderer.disableAddProjectTaskBtn();
      TaskRenderer.renderTodaysTasks();
      Folder.setTodayBtnActive();
    });
    // Show weeks tasks
    const weeksTasksBtn = document.querySelector('.week');
    weeksTasksBtn.addEventListener('click', () => {
      // Render project weekly tasks
      // Render todays project tasks
      if (
        Folder.getFolder() !== 'Today' &&
        Folder.getFolder() !== 'Home' &&
        Folder.getFolder() !== 'Week'
      ) {
        let projectName = LocalStorage.getProjectName(
          ProjectHtmlElement.getProjectId()
        );
        if (
          projectName === Folder.getFolder() ||
          Folder.getFolder() === `${projectName} -> Today`
        ) {
          Folder.setFolder(`${projectName} -> Week`);
          Folder.setWeekBtnActive();
          ProjectTaskRenderer.renderWeeksProjectTasks(
            ProjectHtmlElement.getProjectId()
          );
        }
        return;
      }
      // Render weeks tasks
      Folder.setFolder('Week');
      ProjectRenderer.disableAddProjectTaskBtn();
      TaskRenderer.renderWeeksTasks();
      Folder.setWeekBtnActive();
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
