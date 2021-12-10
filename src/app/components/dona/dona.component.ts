import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartType } from "chart.js";

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css']
})
export class DonaComponent implements OnInit {

  @Input() title: string = '';

  // Doughnut
  @Input('labels') public doughnutChartLabels: string[] = [ 'Label1', 'Label2', 'Label3' ];

  @Input() public data: number[] = [ 350, 450, 100 ];

  public doughnutChartData: ChartData<'doughnut'> = {
    datasets: [
      { data: this.data,
        backgroundColor: ['#6857E6', '#009FEE', '#F02059'] }
    ]
  };

  public doughnutChartType: ChartType = 'doughnut';

  ngOnInit() {
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        { data: this.data,
          backgroundColor: ['#6857E6', '#009FEE', '#F02059'] }
      ]
    };
  }
}
