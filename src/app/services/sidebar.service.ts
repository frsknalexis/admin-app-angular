import { Injectable } from '@angular/core';
import { MenuResponse } from "../interfaces/menu-response.interface";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: MenuResponse[] = [];

  constructor() { }

  loadMenu() {
    // @ts-ignore
    this.menu = JSON.parse(localStorage.getItem('menu')) || [];
  }
}
