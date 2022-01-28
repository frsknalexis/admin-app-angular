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
        },
        {
          titulo: 'Rxjs',
          url: 'rxjs'
        }
      ]
    },
    {
      titulo: 'Mantenimientos',
      icono: 'mdi mdi-folder-lock-open',
      submenu: [
        {
          titulo: 'Usuarios',
          url: 'users'
        },
        {
          titulo: 'Hospitales',
          url: 'hospitales'
        },
        {
          titulo: 'Medicos',
          url: 'medicos'
        }
      ]
    }
  ];

  constructor() { }
}
