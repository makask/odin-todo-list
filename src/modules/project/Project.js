export default class Project {
  constructor(name) {
    this.name = name;
    this.taskList = [];
  }
  setTaskList(taskList) {
    this.taskList = taskList;
  }
  addTask(task) {
    this.taskList.push(task);
  }
}
