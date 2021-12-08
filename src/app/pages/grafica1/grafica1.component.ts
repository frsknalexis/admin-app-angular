import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styleUrls: ['./grafica1.component.css']
})
export class Grafica1Component {

  title1: string = 'Ventas';

  labels1: string[] = [ 'Pan', 'Refresco', 'Tacos' ];

  data1: number[] = [
    10, 15, 40
  ]
}
