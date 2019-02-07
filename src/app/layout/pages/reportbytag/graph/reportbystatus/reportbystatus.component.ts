import { Component, OnInit } from '@angular/core';
declare var jQuery: any;

@Component({
  selector: 'app-reportbystatus',
  templateUrl: './reportbystatus.component.html',
  styleUrls: ['./reportbystatus.component.scss']
})
export class ReportbystatusComponent implements OnInit {

  loadJS: Promise<any>;
  private graphID: string = "graph_reportbystatus";

  constructor() {
    this.loadJS = new Promise((resolve) => {
      this.initChartJSLines();
      resolve(true);
    });
  }

  public initChartJSLines() {
    jQuery(() => {
      // Get Chart Containers
      let chartPieCon = jQuery("#" + this.graphID);
      let chartPie;
      // Set Chart and Chart Data variables
      let chartPolarPieDonutData;
      // Lines/Bar/Radar Chart Data
      chartPolarPieDonutData = {
        labels: [
          'Earnings',
          'Sales',
          'Tickets'
        ],
        datasets: [{
          data: [
            65,
            15,
            20
          ],
          backgroundColor: [
            'rgba(141, 196, 81, 1)',
            'rgba(255, 177, 25, 1)',
            'rgba(224, 79, 26, 1)'
          ],
          hoverBackgroundColor: [
            'rgba(141, 196, 81, .5)',
            'rgba(255, 177, 25, .5)',
            'rgba(224, 79, 26, .5)'
          ]
        }]
      };
      // Init Charts
      if (chartPieCon.length) {
        //@ts-ignore
        chartPie = new Chart(chartPieCon, { type: 'pie', data: chartPolarPieDonutData, options: {
          legend: {
             display: false
          },
          tooltips: {
             enabled: true
          }
     } });
      }
    });
  }

  ngOnInit() {
  }

}
