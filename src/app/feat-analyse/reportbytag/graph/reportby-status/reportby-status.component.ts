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
  private statusList = this.reportingService.status;

  constructor(private reportingService: ReportingService) {

  }

  private labels: Label[];
  private colors: any;
  private data: number[];
  private activeState: Array<any>;
  private options: ChartOptions = {
    elements: {
      arc: {
        borderWidth: 0
      }
    }
  }

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
