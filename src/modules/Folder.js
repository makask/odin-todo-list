export default class Folder {
  folder;
  static setFolder(value) {
    document.querySelector('.title-folder').textContent = value;
    this.folder = value;
  }

  static getFolder() {
    return this.folder;
  }
}
