import { Component, OnInit } from '@angular/core';
import { ReportingService } from 'src/app/core/services/crud/reporting.service';

@Component({
  selector: 'app-statistic-duration',
  templateUrl: './statistic-duration.component.html',
  styleUrls: ['./statistic-duration.component.scss']
})
export class StatisticDurationComponent implements OnInit {

  // the chart informations
  chart: any;
  // the block content is display are collapse
  expand: boolean;

  constructor(private reportingService: ReportingService) { }

  ngOnInit() {
    this.reportingService.observableReportStatisticsDurationExecution.subscribe(response => {
      this.chart = response;
    });
    this.expand = true;
  }

}
