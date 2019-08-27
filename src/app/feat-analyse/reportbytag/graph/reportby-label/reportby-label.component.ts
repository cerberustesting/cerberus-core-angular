import { Component, OnInit } from '@angular/core';
import { ReportingService } from 'src/app/core/services/crud/reporting.service';

@Component({
  selector: 'app-reportby-label',
  templateUrl: './reportby-label.component.html',
  styleUrls: ['./reportby-label.component.scss']
})
export class ReportbyLabelComponent implements OnInit {

  private labelTree: Array<any> = [];
  private expand: boolean = true;

  constructor(private reportingService: ReportingService) { }

  ngOnInit() {
    this.reportingService.observableReportLabel.subscribe(response => {
      this.labelTree = response;
    });
  }

}
