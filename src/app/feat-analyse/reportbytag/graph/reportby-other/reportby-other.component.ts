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
  @Input() chart: any; //the chart informations to display

  expand: boolean = true; // the content is display/collapse

  constructor() { }

  ngOnInit() { }

}
