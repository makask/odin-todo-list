import LocalStorage from '../../LocalStorage';
import DateFormatter from '../DateFormatter';
import ProjectHtmlElement from './ProjectHtmlElement';
import ProjectTaskRenderer from './ProjectTaskRenderer';

export default class ProjectTaskHtmlElement {
  static createProjectTaskElement(id, title, taskDetails, dueDate) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('project-task-item');
    taskElement.setAttribute('id', `${id}`);

    // Create Checkbox
    const checkBox = document.createElement('input');
    checkBox.setAttribute('type', 'checkbox');
    checkBox.setAttribute('id', `${id}`);

    // Toggle completed on off
    checkBox.addEventListener('click', (event) => {
      LocalStorage.updateProjectTaskCompleted(
        ProjectHtmlElement.getProjectId(),
        event.target.id,
        checkBox.checked
      );
      //ProjectTaskRenderer.renderProjectTasks(ProjectHtmlElement.getProjectId());
      ProjectTaskRenderer.renderWorkingFolder(
        ProjectHtmlElement.getProjectId()
      );
    });

    // Create title
    const taskTitleDiv = document.createElement('div');
    taskTitleDiv.classList.add('project-task-title-div');

    const task = document.createElement('p');
    task.textContent = `${title}`;
    task.classList.add(`project-task-${id}-content`);
    task.classList.add('project-task');

    const taskUpdateInput = document.createElement('input');
    taskUpdateInput.setAttribute('id', `${id}`);
    taskUpdateInput.setAttribute('type', 'text');
    taskUpdateInput.classList.add(`project-task-${id}-form`);
    taskUpdateInput.classList.add('project-task-item-input');
    taskUpdateInput.classList.add('hidden');

    taskTitleDiv.append(task, taskUpdateInput);

    // Open task form input
    task.addEventListener('click', () => {
      const taskForm = document.querySelector(`.project-task-${id}-form`);
      const taskContent = document.querySelector(`.project-task-${id}-content`);
      taskForm.classList.remove('hidden');
      taskForm.classList.add('visible');
      taskForm.value = LocalStorage.getProjectTask(
        ProjectHtmlElement.getProjectId(),
        id
      );
      taskContent.classList.add('hidden');
    });

    taskUpdateInput.addEventListener('keydown', (event) => {
      // Update task
      if (event.key === 'Enter') {
        if (taskUpdateInput.value.length < 1) {
          alert('Task must not be empty!');
          return;
        }
        LocalStorage.updateProjectTask(
          ProjectHtmlElement.getProjectId(),
          id,
          taskUpdateInput.value
        );
        //LocalStorage.updateTask(id, taskUpdateInput.value);
        taskUpdateInput.classList.remove('visible');
        taskUpdateInput.classList.add('hidden');
        task.classList.remove('hidden');
        task.classList.add('visible');
        ProjectTaskRenderer.renderWorkingFolder(
          ProjectHtmlElement.getProjectId()
        );
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
    taskDetailsDiv.classList.add('project-task-details-div');

    const detailsLabel = document.createElement('p');
    detailsLabel.setAttribute('id', `${id}`);
    detailsLabel.classList.add('project-task-details-label');
    detailsLabel.textContent = 'Details:';

    const details = document.createElement('p');
    details.textContent = `${taskDetails}`;

    const detailsInput = document.createElement('input');
    detailsInput.setAttribute('id', `${id}`);
    detailsInput.setAttribute('type', 'text');
    detailsInput.classList.add(`project-details-${id}-form`);
    detailsInput.classList.add('project-task-details-input');
    detailsInput.classList.add('hidden');

    taskDetailsDiv.append(detailsLabel, details, detailsInput);

    // Open details input
    detailsLabel.addEventListener('click', () => {
      detailsInput.classList.remove('hidden');
      detailsInput.classList.add('visible');
      detailsInput.value = LocalStorage.getProjectTaskDetails(
        ProjectHtmlElement.getProjectId(),
        id
      );
      details.classList.add('hidden');
    });

    detailsInput.addEventListener('keydown', (event) => {
      // Update task details
      if (event.key === 'Enter') {
        LocalStorage.updateProjectTaskDetails(
          ProjectHtmlElement.getProjectId(),
          id,
          detailsInput.value
        );
        detailsInput.classList.remove('visible');
        detailsInput.classList.add('hidden');
        details.classList.remove('hidden');
        details.classList.add('visible');
        ProjectTaskRenderer.renderWorkingFolder(
          ProjectHtmlElement.getProjectId()
        );
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
    dateDiv.classList.add('project-task-date-div');

    const datePicker = document.createElement('input');
    datePicker.setAttribute('id', `${id}`);
    datePicker.classList.add('project-date-picker');
    datePicker.setAttribute('type', 'date');

    const date = document.createElement('p');
    date.classList.add('project-task-date');
    if (dueDate === '') {
      date.textContent = 'Date not set';
    } else {
      date.textContent = DateFormatter.formatDate(`${dueDate}`);
    }

    dateDiv.append(datePicker, date);

    // Update task due date
    datePicker.addEventListener('input', (event) => {
      LocalStorage.updateProjectTaskdueDate(
        ProjectHtmlElement.getProjectId(),
        id,
        event.target.value
      );
      ProjectTaskRenderer.renderWorkingFolder(
        ProjectHtmlElement.getProjectId()
      );
    });

    // Create buttons
    const buttonsDiv = document.createElement('div');
    buttonsDiv.classList.add('project-buttons-div');
    // Low priority button
    const lowBtn = document.createElement('button');
    lowBtn.setAttribute('id', `${id}`);
    lowBtn.classList.add('project-task-button');
    lowBtn.classList.add('project-priority-low');
    lowBtn.textContent = 'Low';
    // Medium priority button
    const mediumBtn = document.createElement('button');
    mediumBtn.setAttribute('id', `${id}`);
    mediumBtn.classList.add('project-task-button');
    mediumBtn.classList.add('project-priority-medium');
    mediumBtn.textContent = 'Medium';
    //High priority button
    const highBtn = document.createElement('button');
    highBtn.setAttribute('id', `${id}`);
    highBtn.classList.add('project-task-button');
    highBtn.classList.add('project-priority-high');
    highBtn.textContent = 'High';
    //Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('id', `${id}`);
    deleteBtn.classList.add('project-task-button');
    deleteBtn.classList.add('project-button-delete-task');
    deleteBtn.textContent = 'X';

    buttonsDiv.append(lowBtn, mediumBtn, highBtn, deleteBtn);

    lowBtn.addEventListener('click', (event) => {
      LocalStorage.updateProjectTaskPriority(
        ProjectHtmlElement.getProjectId(),
        id,
        'low'
      );
      ProjectTaskRenderer.renderWorkingFolder(
        ProjectHtmlElement.getProjectId()
      );
    });

    mediumBtn.addEventListener('click', (event) => {
      LocalStorage.updateProjectTaskPriority(
        ProjectHtmlElement.getProjectId(),
        id,
        'medium'
      );
      ProjectTaskRenderer.renderWorkingFolder(
        ProjectHtmlElement.getProjectId()
      );
    });

    highBtn.addEventListener('click', (event) => {
      LocalStorage.updateProjectTaskPriority(
        ProjectHtmlElement.getProjectId(),
        id,
        'high'
      );
      ProjectTaskRenderer.renderWorkingFolder(
        ProjectHtmlElement.getProjectId()
      );
    });

    deleteBtn.addEventListener('click', () => {
      LocalStorage.deleteProjectTask(ProjectHtmlElement.getProjectId(), id);
      ProjectTaskRenderer.renderWorkingFolder(
        ProjectHtmlElement.getProjectId()
      );
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
