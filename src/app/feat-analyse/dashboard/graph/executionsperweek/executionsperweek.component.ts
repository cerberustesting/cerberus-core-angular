import { Component, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-executionsperweek',
  templateUrl: './executionsperweek.component.html',
  styleUrls: ['./executionsperweek.component.scss']
})
export class ExecutionsperweekComponent implements OnInit {

  loadJS: Promise<any>;
  private graphID: string = "graph_executionperweek";

  constructor() {
    this.loadJS = new Promise((resolve) => {
      this.initChartJSLines();
      resolve(true);
    });
  }

  public initChartJSLines() {
    jQuery(() => {
      let chartLines;
      // Get Chart Containers
      let chartLinesCon = jQuery('#'+this.graphID);
      // Set Chart and Chart Data variables
      let chartLinesBarsRadarData;
      // Lines/Bar/Radar Chart Data
      chartLinesBarsRadarData = {
        labels: ['07/12','08/12','09/12','10/12','11/12','14/12','15/12','16/12','17/12','18/12','21/12','22/12','23/12','24/12','28/12','29/12','30/12','31/12', '02/01', '03/01', 'TODAY'],
        datasets: [
          {
            label: 'Number of Executions',
            fill: false,
            backgroundColor: 'rgba(6, 101, 208, .75)',
            borderColor: 'rgba(6, 101, 208, 1)',
            pointBackgroundColor: 'rgba(6, 101, 208, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(6, 101, 208, 1)',
            data: [135, 96, 100, 78, 120, 68, 43,135, 96, 100, 78, 120, 68, 43, 135, 96, 100, 78, 120, 68, 43 ]
          }
        ]
      };
      // Init Charts
      if (chartLinesCon.length) {
        //@ts-ignore
        chartLines = new Chart(chartLinesCon, { type: 'line', data: chartLinesBarsRadarData });
      }
    });
  }

  ngOnInit() {
  }

}