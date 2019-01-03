import { Component, OnInit } from '@angular/core';

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
        // Get Chart Containers
        let chartLinesCon = jQuery('#graph_executionperweek');
        // Set Chart and Chart Data variables
        let chartLines;
        let chartLinesBarsRadarData, chartPolarPieDonutData;
        // Lines/Bar/Radar Chart Data
        chartLinesBarsRadarData = {
          labels: ['WEEK 1', 'WEEK 2', 'WEEK 3', 'WEEK 4'],
          datasets: [
            {
              label: 'Number of Executions',
              fill: true,
              backgroundColor: 'rgba(6, 101, 208, .75)',
              borderColor: 'rgba(6, 101, 208, 1)',
              pointBackgroundColor: 'rgba(6, 101, 208, 1)',
              pointBorderColor: '#fff',
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: 'rgba(6, 101, 208, 1)',
              data: [135, 96, 100, 78]
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
