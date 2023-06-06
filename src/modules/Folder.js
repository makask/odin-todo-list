export default class Folder {
  folder;
  static setFolder(value) {
    document.querySelector('.title-folder').textContent = value;
    this.folder = value;
  }

  static getFolder() {
    return this.folder;
  }

  static setHomeBtnActive() {
    document.querySelector('.home').classList.add('button-active');
    document.querySelector('.today').classList.remove('button-active');
    document.querySelector('.week').classList.remove('button-active');
  }

  static setTodayBtnActive() {
    document.querySelector('.today').classList.add('button-active');
    document.querySelector('.home').classList.remove('button-active');
    document.querySelector('.week').classList.remove('button-active');
  }

  static setWeekBtnActive() {
    document.querySelector('.week').classList.add('button-active');
    document.querySelector('.home').classList.remove('button-active');
    document.querySelector('.today').classList.remove('button-active');
  }

  static removeActive() {
    document.querySelector('.home').classList.remove('button-active');
    document.querySelector('.today').classList.remove('button-active');
    document.querySelector('.week').classList.remove('button-active');
  }
}
