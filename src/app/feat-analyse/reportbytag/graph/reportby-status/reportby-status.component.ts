import { Component, OnInit, Input } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartType, ChartOptions } from 'chart.js';
import { ITag } from 'src/app/shared/model/reporting.model';
import { ReportingService } from 'src/app/core/services/crud/reporting.service';
declare var jQuery: any;

@Component({
  selector: 'app-reportby-status',
  templateUrl: './reportby-status.component.html',
  styleUrls: ['./reportby-status.component.scss']
})
export class ReportbystatusComponent implements OnInit {

  @Input() selectedTag: ITag;

  loadJS: Promise<any>;
  private graphID: string = "graph_reportbystatus";
  expand: boolean = true;

  constructor(private reportingService: ReportingService) {

  }

  labels: Label[];
  colors: any;
  data: number[];
  activeState: Array<any>;

  ngOnInit() {
    this.reportingService.observableReportStatus.subscribe(data => {
      this.activeState = data.status.filter(e => e.data > 0);
      this.labels = this.activeState.map(e => e.label);
      this.data = this.activeState.map(e => e.data);
      this.colors = [ { backgroundColor: this.activeState.map(e => e.color) } ];
    });

  }

  round(value) {
    return Math.round(value);
  }

}
