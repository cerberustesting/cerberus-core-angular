import { Component, OnInit } from '@angular/core';
import { ReportingService } from 'src/app/core/services/api/reporting.service';
import { TagDetail } from 'src/app/shared/model/tag.model';

@Component({
  selector: 'app-tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.scss']
})
export class TagDetailComponent implements OnInit {
  collapse = false;

  tagDetail: TagDetail = new TagDetail();

  constructor(private reportingService: ReportingService) { }

  ngOnInit() {
    this.reportingService.observableTagDetail.subscribe(tagDetail => {
      this.tagDetail = tagDetail;
    });
  }

}
