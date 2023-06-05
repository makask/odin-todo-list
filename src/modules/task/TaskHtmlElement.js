import { check } from 'prettier';
import LocalStorage from '../../LocalStorage';
import TaskRenderer from './TaskRenderer';
import DateFormatter from '../DateFormatter';

export default class TaskHtmlElement {
  static createTaskElement(id, title, taskDetails, dueDate) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task-item');
    taskElement.setAttribute('id', `${id}`);

    // Create Checkbox
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('id', `${id}`);

    // Toggle completed on off
    checkBox.addEventListener('click', (event) => {
      LocalStorage.updateCompleted(event.target.id, checkBox.checked);
      TaskRenderer.renderWorkingFolder();
    });

    // Create title
    const taskTitleDiv = document.createElement('div');
    taskTitleDiv.classList.add('task-title-div');

    const task = document.createElement('p');
    task.textContent = `${title}`;
    task.classList.add(`task-${id}-content`);
    task.classList.add('task');

    const taskUpdateInput = document.createElement('input');
    taskUpdateInput.setAttribute('id', `${id}`);
    taskUpdateInput.setAttribute('type', 'text');
    taskUpdateInput.classList.add(`task-${id}-form`);
    taskUpdateInput.classList.add('task-item-input');
    taskUpdateInput.classList.add('hidden');

    taskTitleDiv.append(task, taskUpdateInput);

    // Open task form input
    task.addEventListener('click', () => {
      const taskForm = document.querySelector(`.task-${id}-form`);
      const taskContent = document.querySelector(`.task-${id}-content`);
      taskForm.classList.remove('hidden');
      taskForm.classList.add('visible');
      taskForm.value = LocalStorage.getTask(id);
      taskContent.classList.add('hidden');
    });

    taskUpdateInput.addEventListener('keydown', (event) => {
      // Update task
      if (event.key === 'Enter') {
        if (taskUpdateInput.value.length < 1) {
          alert('Task must not be empty!');
          return;
        }
        LocalStorage.updateTask(id, taskUpdateInput.value);
        taskUpdateInput.classList.remove('visible');
        taskUpdateInput.classList.add('hidden');
        task.classList.remove('hidden');
        task.classList.add('visible');
        TaskRenderer.renderWorkingFolder();
      }
      if (event.key === 'Escape') {
        taskUpdateInput.classList.remove('visible');
        taskUpdateInput.classList.add('hidden');
        task.classList.remove('hidden');
        task.classList.add('visible');
      }
    });

    // Create details
    const taskDetailsDiv = document.createElement('div');
    taskDetailsDiv.classList.add('task-details-div');

    const detailsLabel = document.createElement('p');
    detailsLabel.setAttribute('id', `${id}`);
    detailsLabel.classList.add('task-details-label');
    detailsLabel.textContent = 'Details:';

    const details = document.createElement('p');
    details.textContent = `${taskDetails}`;

    const detailsInput = document.createElement('input');
    detailsInput.setAttribute('id', `${id}`);
    detailsInput.setAttribute('type', 'text');
    detailsInput.classList.add(`details-${id}-form`);
    detailsInput.classList.add('task-details-input');
    detailsInput.classList.add('hidden');

    taskDetailsDiv.append(detailsLabel, details, detailsInput);

    // Open details input
    detailsLabel.addEventListener('click', () => {
      detailsInput.classList.remove('hidden');
      detailsInput.classList.add('visible');
      detailsInput.value = LocalStorage.getDetails(id);
      details.classList.add('hidden');
    });

    detailsInput.addEventListener('keydown', (event) => {
      // Update task details
      if (event.key === 'Enter') {
        LocalStorage.updateDetails(id, detailsInput.value);
        detailsInput.classList.remove('visible');
        detailsInput.classList.add('hidden');
        details.classList.remove('hidden');
        details.classList.add('visible');
        TaskRenderer.renderWorkingFolder();
      }

      if (event.key === 'Escape') {
        detailsInput.classList.remove('visible');
        detailsInput.classList.add('hidden');
        details.classList.remove('hidden');
        details.classList.add('visible');
      }
    });

    document.body.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        taskUpdateInput.classList.remove('visible');
        taskUpdateInput.classList.add('hidden');
        task.classList.remove('hidden');
        task.classList.add('visible');
        detailsInput.classList.remove('visible');
        detailsInput.classList.add('hidden');
        details.classList.remove('hidden');
        details.classList.add('visible');
      }
    });

    // Create date
    const dateDiv = document.createElement('div');
    dateDiv.classList.add('task-date-div');

    const datePicker = document.createElement('input');
    datePicker.setAttribute('id', `${id}`);
    datePicker.classList.add('date-picker');
    datePicker.setAttribute('type', 'date');

    const date = document.createElement('p');
    date.classList.add('task-date');
    if (dueDate === '') {
      date.textContent = 'Date not set';
    } else {
      date.textContent = DateFormatter.formatDate(`${dueDate}`);
    }

    dateDiv.append(datePicker, date);

    // Update task due date
    datePicker.addEventListener('input', (event) => {
      LocalStorage.updateDueDate(id, event.target.value);
      TaskRenderer.renderWorkingFolder();
    });

    // Create buttons
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('buttons-div');
    // Low priority button
    const lowBtn = document.createElement('button');
    lowBtn.setAttribute('id', `${id}`);
    lowBtn.classList.add('task-button');
    lowBtn.classList.add('priority-low');
    lowBtn.textContent = 'Low';
    // Medium priority button
    const mediumBtn = document.createElement('button');
    mediumBtn.setAttribute('id', `${id}`);
    mediumBtn.classList.add('task-button');
    mediumBtn.classList.add('priority-medium');
    mediumBtn.textContent = 'Medium';
    //High priority button
    const highBtn = document.createElement('button');
    highBtn.setAttribute('id', `${id}`);
    highBtn.classList.add('task-button');
    highBtn.classList.add('priority-high');
    highBtn.textContent = 'High';
    //Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('id', `${id}`);
    deleteBtn.classList.add('task-button');
    deleteBtn.classList.add('button-delete-task');
    deleteBtn.textContent = 'X';

    buttonsDiv.append(lowBtn, mediumBtn, highBtn, deleteBtn);

    lowBtn.addEventListener('click', (event) => {
      LocalStorage.updatePriority(event.target.id, 'low');
      TaskRenderer.renderWorkingFolder();
    });

    mediumBtn.addEventListener('click', (event) => {
      LocalStorage.updatePriority(event.target.id, 'medium');
      TaskRenderer.renderWorkingFolder();
    });

    highBtn.addEventListener('click', (event) => {
      LocalStorage.updatePriority(event.target.id, 'high');
      TaskRenderer.renderWorkingFolder();
    });

    deleteBtn.addEventListener('click', () => {
      LocalStorage.deleteTask(id);
      TaskRenderer.renderWorkingFolder();
    });

    taskElement.append(
      checkBox,
      taskTitleDiv,
      taskDetailsDiv,
      dateDiv,
      buttonsDiv
    );

    return taskElement;
  }
}
