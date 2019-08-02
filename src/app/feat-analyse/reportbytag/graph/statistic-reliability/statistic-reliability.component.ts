import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';

@Component({
  selector: 'app-statistic-reliability',
  templateUrl: './statistic-reliability.component.html',
  styleUrls: ['./statistic-reliability.component.scss']
})
export class StatisticReliabilityComponent implements OnInit {

  chart = {
    options : {
      responsive: true
    },
    legend: false,
    datasets: [
      { data: [9,8,7,4,5,6,3,2,1], label: 'lineLabel', type: 'line' },
      { data: [9,6,3,8,5,2,7,4,1], label: 'barLabel'}
    ],
    labels: ['1','2','3','4','5','6','7','8','9']
  };
  expand: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
