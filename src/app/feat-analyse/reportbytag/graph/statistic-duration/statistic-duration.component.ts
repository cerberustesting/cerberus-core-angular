import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistic-duration',
  templateUrl: './statistic-duration.component.html',
  styleUrls: ['./statistic-duration.component.scss']
})
export class StatisticDurationComponent implements OnInit {
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
