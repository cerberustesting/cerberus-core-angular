import { Component, OnInit } from '@angular/core';
import { SingleDataSet, Label } from 'ng2-charts';
import { ChartType, ChartOptions } from 'chart.js';
import { ReportingService } from 'src/app/core/services/crud/reporting.service';

@Component({
  selector: 'app-reportby-other',
  templateUrl: './reportby-other.component.html',
  styleUrls: ['./reportby-other.component.scss']
})
export class ReportbyOtherComponent implements OnInit {
  charts = [];
  expand: boolean = true;

  constructor(private reportingService: ReportingService) { }

  ngOnInit() {
    this.reportingService.observableReportOther.subscribe(response => {
      console.log("response other :", response);
      this.charts = response});
    // this.chart = {
    //   data: [300, 500, 100, 40, 120],
    //   legend: false,
    //   labels: ['Download Sales', 'In-Store Sales', 'Mail Sales', 'Telesales', 'Corporate Sales'],
    //   options: {
    //     title: {
    //       display: true,
    //       text: 'lorem ipsum'
    //     }
    //   }
    // }
  }

}
