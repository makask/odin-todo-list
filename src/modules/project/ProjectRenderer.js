import TaskRenderer from '../task/TaskRenderer';
import ProjectHtmlElement from './ProjectHtmlElement';

export default class ProjectRenderer {
  static renderProjectNames() {
    let projectList = [];
    let projectContainer = document.querySelector('.project-items');
    TaskRenderer.removeAllChildNodes(projectContainer);
    projectList = JSON.parse(localStorage.getItem('projectList'));
    for (let i = 0; i < projectList.length; i++) {
      projectContainer.appendChild(
        ProjectHtmlElement.createProjectElement(i, projectList[i].name)
      );
    }
  }

  static renderAddProjectTaskBtn() {
    document.querySelector('.add-new-project-task').classList.remove('hidden');
  }

  static disableAddProjectTaskBtn() {
    document.querySelector('.add-new-project-task').classList.add('hidden');
  }
}
