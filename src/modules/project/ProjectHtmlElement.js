import LocalStorage from '../../LocalStorage';
import ProjectRenderer from './ProjectRenderer';
import Folder from '../Folder';
import ProjectTaskRenderer from './ProjectTaskRenderer';
import TaskRenderer from '../task/TaskRenderer';

export default class ProjectHtmlElement {
  static projectId;

  static createProjectElement(id, title) {
    const projectElement = document.createElement('div');
    projectElement.classList.add('project-item');
    projectElement.setAttribute('id', `${id}`);

    // Create project name
    const projectName = document.createElement('p');
    projectName.classList.add('project-item-name');
    projectName.setAttribute('id', `${id}`);
    projectName.textContent = `${title}`;

    const projNameDiv = document.createElement('div');
    projNameDiv.classList.add('project-item-name-div');
    projNameDiv.appendChild(projectName);

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('project-item-del-btn');
    deleteBtn.setAttribute('id', `${id}`);
    deleteBtn.textContent = 'X';

    projectElement.append(projNameDiv, deleteBtn);
    // Select project
    projectName.addEventListener('click', (event) => {
      this.projectId = event.target.id;
      Folder.setFolder(LocalStorage.getProjectName(event.target.id));
      ProjectRenderer.renderAddProjectTaskBtn();
      // Render project tasks
      ProjectTaskRenderer.renderProjectTasks(this.projectId);
    });

    // Delete project
    deleteBtn.addEventListener('click', (event) => {
      LocalStorage.deleteProject(event.target.id);
      Folder.setFolder('');
      ProjectRenderer.disableAddProjectTaskBtn();
      ProjectRenderer.renderProjectNames();
      let tasksElement = document.querySelector('.tasks');
      TaskRenderer.removeAllChildNodes(tasksElement);
    });

    return projectElement;
  }

  static getProjectId() {
    return this.projectId;
  }
}
