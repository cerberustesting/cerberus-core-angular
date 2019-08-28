import { Component, OnInit, Input } from '@angular/core';
import { ReportingService } from 'src/app/core/services/crud/reporting.service';

@Component({
  selector: 'app-label-progress',
  templateUrl: './label-progress.component.html',
  styleUrls: ['./label-progress.component.scss']
})
export class LabelProgressComponent implements OnInit {
  @Input() label: any;

  private statusList = this.reportingService.status;

  constructor(private reportingService: ReportingService) { }

  ngOnInit() {
  }

  /** toggleChildren
   * * open are collapse selected parent label
   * @param label label to toggle
   */
  toggleChildren(label) {
    label.expand = !((label.expand)? true : false);
  }

}
