import Task from './modules/task/Task';
import Project from './modules/project/Project';

export default class LocalStorage {
  static initEmptyTaskList() {
    const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }

  static initEmptyProjectList() {
    const projectList = JSON.parse(localStorage.getItem('projectList')) || [];
    localStorage.setItem('projectList', JSON.stringify(projectList));
  }

  static saveTask(task) {
    const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    taskList.push(task);
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }

  static deleteTask(id) {
    const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    taskList.splice(id, 1);
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }

  static updateCompleted(id, value) {
    const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    const newTask = new Task(taskList[id].task);
    newTask.setTask(taskList[id].task);
    newTask.setDetails(taskList[id].details);
    newTask.setDueDate(taskList[id].dueDate);
    newTask.setPriority(taskList[id].priority);
    newTask.setCompleted(value);
    taskList[id] = newTask;
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }

  static updateTask(id, taskValue) {
    const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    const newTask = new Task(taskList[id].task);
    newTask.setTask(taskValue);
    newTask.setDetails(taskList[id].details);
    newTask.setDueDate(taskList[id].dueDate);
    newTask.setPriority(taskList[id].priority);
    newTask.setCompleted(taskList[id].completed);
    taskList[id] = newTask;
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }

  static updateDetails(id, taskDetails) {
    const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    const newTask = new Task(taskList[id].task);
    newTask.setTask(taskList[id].task);
    newTask.setDetails(taskDetails);
    newTask.setDueDate(taskList[id].dueDate);
    newTask.setPriority(taskList[id].priority);
    newTask.setCompleted(taskList[id].completed);
    taskList[id] = newTask;
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }

  static updateDueDate(id, date) {
    const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    const newTask = new Task(taskList[id].task);
    newTask.setTask(taskList[id].task);
    newTask.setDetails(taskList[id].details);
    newTask.setDueDate(date);
    newTask.setPriority(taskList[id].priority);
    newTask.setCompleted(taskList[id].completed);
    taskList[id] = newTask;
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }

  static updatePriority(id, value) {
    const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    const newTask = new Task(taskList[id].task);
    newTask.setTask(taskList[id].task);
    newTask.setDetails(taskList[id].details);
    newTask.setDueDate(taskList[id].dueDate);
    newTask.setPriority(value);
    newTask.setCompleted(taskList[id].completed);
    taskList[id] = newTask;
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }

  static getTask(id) {
    const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    const task = taskList[id].task;
    return task;
  }

  static getDetails(id) {
    const taskList = JSON.parse(localStorage.getItem('taskList')) || [];
    const details = taskList[id].details;
    return details;
  }

  static getProjectName(id) {
    const projectList = JSON.parse(localStorage.getItem('projectList')) || [];
    const projectName = projectList[id].name;
    return projectName;
  }

  static saveProject(project) {
    const projectList = JSON.parse(localStorage.getItem('projectList')) || [];
    projectList.push(project);
    localStorage.setItem('projectList', JSON.stringify(projectList));
  }

  static deleteProject(id) {
    const projectList = JSON.parse(localStorage.getItem('projectList'));
    projectList.splice(id, 1);
    localStorage.setItem('projectList', JSON.stringify(projectList));
  }

  static saveProjectTask(projectId, task) {
    const projectList = JSON.parse(localStorage.getItem('projectList')) || [];
    const project = projectList[projectId];
    const newProject = new Project(project.name);
    newProject.setTaskList(project.taskList);
    newProject.addTask(task);
    projectList[projectId] = newProject;
    localStorage.setItem('projectList', JSON.stringify(projectList));
  }

  static updateProjectTaskCompleted(projectId, taskId, value) {
    const projectList = JSON.parse(localStorage.getItem('projectList')) || [];
    const project = projectList[projectId];
    const newProject = new Project(project.name);
    const taskList = project.taskList;

    const newTask = new Task(taskList[taskId].task);
    newTask.setTask(taskList[taskId].task);
    newTask.setDetails(taskList[taskId].details);
    newTask.setDueDate(taskList[taskId].dueDate);
    newTask.setPriority(taskList[taskId].priority);
    newTask.setCompleted(value);
    taskList[taskId] = newTask;

    newProject.setTaskList(taskList);
    projectList[projectId] = newProject;
    localStorage.setItem('projectList', JSON.stringify(projectList));
  }

  static updateProjectTask(projectId, taskId, value) {
    const projectList = JSON.parse(localStorage.getItem('projectList')) || [];
    const project = projectList[projectId];
    const newProject = new Project(project.name);
    const taskList = project.taskList;

    const newTask = new Task(taskList[taskId].task);
    newTask.setTask(value);
    newTask.setDetails(taskList[taskId].details);
    newTask.setDueDate(taskList[taskId].dueDate);
    newTask.setPriority(taskList[taskId].priority);
    newTask.setCompleted(taskList[taskId].completed);
    taskList[taskId] = newTask;

    newProject.setTaskList(taskList);
    projectList[projectId] = newProject;
    localStorage.setItem('projectList', JSON.stringify(projectList));
  }

  static updateProjectTaskDetails(projectId, taskId, value) {
    const projectList = JSON.parse(localStorage.getItem('projectList')) || [];
    const project = projectList[projectId];
    const newProject = new Project(project.name);
    const taskList = project.taskList;

    const newTask = new Task(taskList[taskId].task);
    newTask.setTask(taskList[taskId].task);
    newTask.setDetails(value);
    newTask.setDueDate(taskList[taskId].dueDate);
    newTask.setPriority(taskList[taskId].priority);
    newTask.setCompleted(taskList[taskId].completed);
    taskList[taskId] = newTask;

    newProject.setTaskList(taskList);
    projectList[projectId] = newProject;
    localStorage.setItem('projectList', JSON.stringify(projectList));
  }

  static updateProjectTaskdueDate(projectId, taskId, value) {
    const projectList = JSON.parse(localStorage.getItem('projectList')) || [];
    const project = projectList[projectId];
    const newProject = new Project(project.name);
    const taskList = project.taskList;

    const newTask = new Task(taskList[taskId].task);
    newTask.setTask(taskList[taskId].task);
    newTask.setDetails(taskList[taskId].details);
    newTask.setDueDate(value);
    newTask.setPriority(taskList[taskId].priority);
    newTask.setCompleted(taskList[taskId].completed);
    taskList[taskId] = newTask;

    newProject.setTaskList(taskList);
    projectList[projectId] = newProject;
    localStorage.setItem('projectList', JSON.stringify(projectList));
  }

  static updateProjectTaskPriority(projectId, taskId, value) {
    const projectList = JSON.parse(localStorage.getItem('projectList')) || [];
    const project = projectList[projectId];
    const newProject = new Project(project.name);
    const taskList = project.taskList;

    const newTask = new Task(taskList[taskId].task);
    newTask.setTask(taskList[taskId].task);
    newTask.setDetails(taskList[taskId].details);
    newTask.setDueDate(taskList[taskId].dueDate);
    newTask.setPriority(value);
    newTask.setCompleted(taskList[taskId].completed);
    taskList[taskId] = newTask;

    newProject.setTaskList(taskList);
    projectList[projectId] = newProject;
    localStorage.setItem('projectList', JSON.stringify(projectList));
  }

  static getProjectTask(projectId, taskId) {
    const projectList = JSON.parse(localStorage.getItem('projectList')) || [];
    const project = projectList[projectId];
    const taskList = project.taskList;
    const task = taskList[taskId];
    return task.task;
  }

  static getProjectTaskDetails(projectId, taskId) {
    const projectList = JSON.parse(localStorage.getItem('projectList')) || [];
    const project = projectList[projectId];
    const taskList = project.taskList;
    const task = taskList[taskId];
    return task.details;
  }

  static deleteProjectTask(projectId, taskId) {
    const projectList = JSON.parse(localStorage.getItem('projectList')) || [];
    const taskList = projectList[projectId].taskList;
    taskList.splice(taskId, 1);
    localStorage.setItem('projectList', JSON.stringify(projectList));
  }
}
