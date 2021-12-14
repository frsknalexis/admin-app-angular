import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu: [
        {
          titulo: 'Main',
          url: '/'
        },
        {
          titulo: 'Progress Bar',
          url: 'progress'
        },
        {
          titulo: 'Graficas',
          url: 'grafica1'
        },
        {
          titulo: 'Promesas',
          url: 'promesas'
        }
      ]
    }
  ];

  constructor() { }
}
