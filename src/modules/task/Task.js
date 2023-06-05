export default class Task {
  constructor(task) {
    this.task = task;
    this.details = '';
    this.dueDate = '';
    this.priority = '';
    this.completed = false;
  }

  setTask(task) {
    this.task = task;
  }

  setDetails(details) {
    this.details = details;
  }

  setDueDate(dueDate) {
    this.dueDate = dueDate;
  }

  setPriority(priority) {
    this.priority = priority;
  }

  setCompleted(value) {
    this.completed = value;
  }
}
