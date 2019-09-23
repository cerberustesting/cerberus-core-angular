import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ReportingService } from 'src/app/core/services/crud/reporting.service';

@Component({
  selector: 'app-reportby-testfolder',
  templateUrl: './reportby-testfolder.component.html',
  styleUrls: ['./reportby-testfolder.component.scss']
})
export class ReportbyTestfolderComponent implements OnInit {

  chart: { // chart informations
    datasets: ChartDataSets[], // values for each test folder and status
    label: Label[], // label of tests folders
    options: ChartOptions,
    legend: boolean, // display legend ?
  };
  expand: boolean; // the block content is display are collapse

  constructor(private reportingService: ReportingService) { }

  ngOnInit() {
    // get chart informations from reportingService
    this.reportingService.observableReportTestFolder.subscribe(data => this.chart = data);
    this.expand = true;
  }

}
