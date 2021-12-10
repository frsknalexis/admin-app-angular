import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() {
    const url = localStorage.getItem('theme') || './assets/css/colors/default-dark.css';

    if (this.linkTheme != null) {
      this.linkTheme.setAttribute('href', url);
    }
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${ theme }.css`;

    if (this.linkTheme != null) {
      this.linkTheme.setAttribute('href', url);
    }

    localStorage.setItem('theme', url);

    this.checkCurrentTheme();
  }

  checkCurrentTheme() {
    const links: NodeListOf<Element> = document.querySelectorAll('.selector');

    links.forEach((element: Element) => {
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`;
      const currentTheme = this.linkTheme != null ? this.linkTheme.getAttribute('href') : null;

      if (btnThemeUrl === currentTheme) {
        element.classList.add('working');
      }
    });
  }
}
