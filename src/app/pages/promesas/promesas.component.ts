import { Component, OnInit } from '@angular/core';
import {log10} from "chart.js/helpers";

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuario()
      .then((usuarios) => {
        console.log(usuarios);
      });

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

  getUsuario() {
    return new Promise((resolve, reject) => {
      fetch('https://reqres.in/api/users')
        .then((response) => response.json())
        .then((body) => resolve(body.data));
    });
  }
}
