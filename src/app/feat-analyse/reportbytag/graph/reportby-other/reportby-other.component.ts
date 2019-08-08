import { Component, OnInit, Input } from '@angular/core';
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
  @Input() chart: any;

  constructor(private reportingService: ReportingService) { }

  ngOnInit() {
    this.reportingService.observableReportOther.subscribe(response => {
      this.charts = response
    });
  }

}
