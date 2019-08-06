import { Component, OnInit } from '@angular/core';
import { ReportingService } from 'src/app/core/services/crud/reporting.service';

@Component({
  selector: 'app-tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.scss']
})
export class TagDetailComponent implements OnInit {
  collapse = false;

  tagDetail = {};

  constructor(private reportingService: ReportingService) { }

  ngOnInit() {
    this.reportingService.observableTagDetail.subscribe(tagDetail => {
      this.tagDetail = tagDetail;
    })
  }

}
