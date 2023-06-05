import TaskHtmlElement from './TaskHtmlElement';
import DateFormatter from '../DateFormatter';
import Folder from '../Folder';

export default class TaskRenderer {
  static renderTaskList() {
    let taskList = [];
    let tasksElement = document.querySelector('.tasks');
    this.removeAllChildNodes(tasksElement);
    taskList = JSON.parse(localStorage.getItem('taskList'));

    for (let i = 0; i < taskList.length; i++) {
      tasksElement.appendChild(
        TaskHtmlElement.createTaskElement(
          i,
          taskList[i].task,
          taskList[i].details,
          taskList[i].dueDate
        )
      );
    }
    this.updateTaskCheckBoxes(taskList);
    this.updatePriority(taskList);
  }

  static updateTaskCheckBoxes(taskList) {
    let taskItems = document.querySelectorAll('.task-item');
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

  static updatePriority(taskList) {
    let taskItems = document.querySelectorAll('.task-item');
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

  static renderTodaysTasks() {
    let taskList = [];
    let tasksElement = document.querySelector('.tasks');
    this.removeAllChildNodes(tasksElement);
    taskList = JSON.parse(localStorage.getItem('taskList'));

    for (let i = 0; i < taskList.length; i++) {
      if (DateFormatter.isDayToday(taskList[i].dueDate)) {
        tasksElement.appendChild(
          TaskHtmlElement.createTaskElement(
            i,
            taskList[i].task,
            taskList[i].details,
            taskList[i].dueDate
          )
        );
      }
    }

    this.updateTaskCheckBoxes(taskList);
    this.updatePriority(taskList);
  }

  static renderWeeksTasks() {
    let taskList = [];
    let tasksElement = document.querySelector('.tasks');
    this.removeAllChildNodes(tasksElement);
    taskList = JSON.parse(localStorage.getItem('taskList'));

    for (let i = 0; i < taskList.length; i++) {
      if (DateFormatter.isDayWeekDay(taskList[i].dueDate)) {
        tasksElement.appendChild(
          TaskHtmlElement.createTaskElement(
            i,
            taskList[i].task,
            taskList[i].details,
            taskList[i].dueDate
          )
        );
      }
    }
    this.updateTaskCheckBoxes(taskList);
    this.updatePriority(taskList);
  }

  static renderWorkingFolder() {
    if (Folder.getFolder() === 'Home') {
      this.renderTaskList();
    }

    if (Folder.getFolder() === 'Today') {
      this.renderTodaysTasks();
    }

    if (Folder.getFolder() === 'Week') {
      this.renderWeeksTasks();
    }
  }

  static removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
}
