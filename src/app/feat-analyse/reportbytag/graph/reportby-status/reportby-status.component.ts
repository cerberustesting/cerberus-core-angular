import { Component, OnInit, Input } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartType, ChartOptions } from 'chart.js';
import { ITag } from 'src/app/shared/model/reporting.model';
import { ReportingService } from 'src/app/core/services/api/reporting.service';
declare var jQuery: any;

@Component({
  selector: 'app-reportby-status',
  templateUrl: './reportby-status.component.html',
  styleUrls: ['./reportby-status.component.scss']
})
export class ReportbystatusComponent implements OnInit {

  @Input() selectedTag: ITag;

  expand: boolean;
  private statusList = this.reportingService.status;

  // *** Chart informations ***
  // name of each arc (for popover and legend)
  private labels: Label[];
  // arc colors
  private colors: any;
  // data of each arc
  private data: number[];
  // all status with data > 0
  private activeState: Array<any>;
  private options: ChartOptions = {
    // chart options
    elements: {
      arc: {
        // dissable borders
        borderWidth: 0
      }
    }
  };

  constructor(private reportingService: ReportingService) { }

  ngOnInit() {
    // get all chart informations and parse them
    this.reportingService.observableReportStatus.subscribe(data => {
      this.activeState = data.status.filter(e => e.data > 0);
      this.labels = this.activeState.map(e => e.label);
      this.data = this.activeState.map(e => e.data);
      this.colors = [{ backgroundColor: this.activeState.map(e => e.color) }];
    });
    this.expand = true;
  }

  /** round
   * * round value
   * * use in html (can't use directly Math.round)
   * @param value value to round
   */
  round(value: number): number {
    return Math.round(value);
  }

}
