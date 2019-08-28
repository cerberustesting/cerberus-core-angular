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

  @Input() selectedTag: ITag; // the represented tag

  expand: boolean = true; // display the block body ?
  private statusList = this.reportingService.status; //status to display on left

  // *** Chart informations ***
  private labels: Label[]; // name of each arc (for popover and legend)
  private colors: any; // arc colors
  private data: number[]; // data of each arc
  private activeState: Array<any>; // all status with data > 0
  private options: ChartOptions = { // chart options
    elements: {
      arc: {
        borderWidth: 0 //dissable borders
      }
    }
  }

  constructor(private reportingService: ReportingService) {

  }

  

  ngOnInit() {
    // get all chart informations and parse them
    this.reportingService.observableReportStatus.subscribe(data => {
      this.activeState = data.status.filter(e => e.data > 0);
      this.labels = this.activeState.map(e => e.label);
      this.data = this.activeState.map(e => e.data);
      this.colors = [ { backgroundColor: this.activeState.map(e => e.color) } ];
    });

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
