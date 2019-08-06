import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { ReportingService } from 'src/app/core/services/crud/reporting.service';

@Component({
  selector: 'app-statistic-reliability',
  templateUrl: './statistic-reliability.component.html',
  styleUrls: ['./statistic-reliability.component.scss']
})
export class StatisticReliabilityComponent implements OnInit {

  chart: any;
  expand: boolean = true;

  constructor(private reportingService: ReportingService) { }

  ngOnInit() {
    this.reportingService.observableReportStatisticsReliability.subscribe(response => {
      this.chart = response;
    });
  }
  chartClicked(event) {
    console.log("click :", event);
    
  }

}
