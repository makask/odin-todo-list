import TaskRenderer from '../task/TaskRenderer';
import ProjectTaskHtmlElement from './ProjectTaskHtmlElement';
import DateFormatter from '../DateFormatter';
import Folder from '../Folder';
import LocalStorage from '../../LocalStorage';

export default class ProjectTaskRenderer {
  static renderProjectTasks(projectId) {
    let projectList = JSON.parse(localStorage.getItem('projectList'));
    let taskList = [];
    taskList = projectList[projectId].taskList;
    let tasksElement = document.querySelector('.tasks');
    TaskRenderer.removeAllChildNodes(tasksElement);

    for (let i = 0; i < taskList.length; i++) {
      tasksElement.appendChild(
        ProjectTaskHtmlElement.createProjectTaskElement(
          i,
          taskList[i].task,
          taskList[i].details,
          taskList[i].dueDate
        )
      );
    }

    this.updateProjectTaskCheckBoxes(taskList);
    this.updateProjectTaskPriority(taskList);
  }

  static updateProjectTaskCheckBoxes(taskList) {
    let taskItems = document.querySelectorAll('.project-task-item');
    let checkBox = document.querySelectorAll('input[type=checkbox]');

    for (let i = 0; i < taskItems.length; i++) {
      if (taskList[taskItems[i].id].completed === true) {
        taskItems[i].classList.add('line-through');
        checkBox[i].checked = true;
      } else {
        taskItems[i].classList.remove('line-through');
        checkBox[i].checked = false;
      }
    }
  }

  static updateProjectTaskPriority(taskList) {
    let taskItems = document.querySelectorAll('.project-task-item');

    for (let i = 0; i < taskItems.length; i++) {
      if (taskList[taskItems[i].id].priority === 'low') {
        taskItems[i].classList.add('priority-low-bg');
        taskItems[i].classList.remove('priority-medium-bg');
        taskItems[i].classList.remove('priority-high-bg');
      } else if (taskList[taskItems[i].id].priority === 'medium') {
        taskItems[i].classList.add('priority-medium-bg');
        taskItems[i].classList.remove('priority-low-bg');
        taskItems[i].classList.remove('priority-high-bg');
      } else if (taskList[taskItems[i].id].priority === 'high') {
        taskItems[i].classList.add('priority-high-bg');
        taskItems[i].classList.remove('priority-low-bg');
        taskItems[i].classList.remove('priority-medium-bg');
      }
    }
  }

  static renderTodaysProjectTasks(projectId) {
    let projectList = JSON.parse(localStorage.getItem('projectList'));
    let taskList = [];
    taskList = projectList[projectId].taskList;
    let tasksElement = document.querySelector('.tasks');
    TaskRenderer.removeAllChildNodes(tasksElement);

    for (let i = 0; i < taskList.length; i++) {
      if (DateFormatter.isDayToday(taskList[i].dueDate)) {
        tasksElement.appendChild(
          ProjectTaskHtmlElement.createProjectTaskElement(
            i,
            taskList[i].task,
            taskList[i].details,
            taskList[i].dueDate
          )
        );
      }
    }

    this.updateProjectTaskCheckBoxes(taskList);
    this.updateProjectTaskPriority(taskList);
  }

  static renderWeeksProjectTasks(projectId) {
    let projectList = JSON.parse(localStorage.getItem('projectList'));
    let taskList = [];
    taskList = projectList[projectId].taskList;
    let tasksElement = document.querySelector('.tasks');
    TaskRenderer.removeAllChildNodes(tasksElement);

    for (let i = 0; i < taskList.length; i++) {
      if (DateFormatter.isDayWeekDay(taskList[i].dueDate)) {
        tasksElement.appendChild(
          ProjectTaskHtmlElement.createProjectTaskElement(
            i,
            taskList[i].task,
            taskList[i].details,
            taskList[i].dueDate
          )
        );
      }
    }

    this.updateProjectTaskCheckBoxes(taskList);
    this.updateProjectTaskPriority(taskList);
  }

  static renderWorkingFolder(projectId) {
    let projectName = LocalStorage.getProjectName(projectId);
    if (Folder.getFolder() === projectName) {
      this.renderProjectTasks(projectId);
    }

    if (Folder.getFolder() === `${projectName} -> Today`) {
      this.renderTodaysProjectTasks(projectId);
    }

    if (Folder.getFolder() === `${projectName} -> Week`) {
      this.renderWeeksProjectTasks(projectId);
    }
  }
}
