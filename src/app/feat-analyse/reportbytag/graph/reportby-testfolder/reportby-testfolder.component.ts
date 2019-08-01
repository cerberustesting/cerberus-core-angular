import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-reportby-testfolder',
  templateUrl: './reportby-testfolder.component.html',
  styleUrls: ['./reportby-testfolder.component.scss']
})
export class ReportbyTestfolderComponent implements OnInit {

  chart: {
    datasets: ChartDataSets[],
    label: Label[],
    options : ChartOptions ,
    legend: boolean,
  }

  constructor() { }

  ngOnInit() {
    this.chart = {
      datasets: [
        { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
        { data: [10, 48, 40, 19, 86, 27, 90], label: 'Series B' }
      ],
      label: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
      options : {
        responsive: true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: { xAxes: [{stacked: true}], yAxes: [{stacked: true}] },
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'end',
          }
        }
      },
      legend: true

    }
  }

}
