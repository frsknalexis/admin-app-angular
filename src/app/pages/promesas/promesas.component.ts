import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const promesa = new Promise((resolve, reject) => {
      if (false) {
        resolve('Hola Mundo');
      } else {
        reject('Algo salio mal');
      }
    });

    promesa.then((message) => {
      console.log(message);
    }).catch((error) => {
      console.log('Error en la promesa ', error);
    });

    console.log('Fin del Init');
  }
}
