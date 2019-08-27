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

  chart: {
    datasets: ChartDataSets[],
    label: Label[],
    options : ChartOptions ,
    legend: boolean,
  }
  expand: boolean = true;

  constructor(private reportingService: ReportingService) { }

  ngOnInit() {
    this.reportingService.observableReportTestFolder.subscribe(data => this.chart = data);
  }

}
