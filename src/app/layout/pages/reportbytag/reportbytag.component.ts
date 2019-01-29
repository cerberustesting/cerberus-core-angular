import { Component, OnInit } from '@angular/core';
import { ReportingService } from 'src/app/services/crud/reporting.service';
import { HttpClient } from '@angular/common/http';
import { ITag } from 'src/app/model/reporting.model';

@Component({
  selector: 'app-reportbytag',
  templateUrl: './reportbytag.component.html',
  styleUrls: ['./reportbytag.component.scss']
})
export class ReportbytagComponent implements OnInit {
  private tagsList: Array<ITag> = new Array();
  private tagsBuffer: Array<ITag> = new Array();
  private bufferSize = 50;
  private numberOfItemsFromEndBeforeFetchingMore = 10;
  private loading = false;

  constructor(private http: HttpClient, private ReportingService: ReportingService) { }

  ngOnInit() {
    this.ReportingService.getTagList();
    this.ReportingService.observableTagsList.subscribe(response => {
      if (response) {
        this.tagsList = response;
        this.tagsBuffer = this.tagsList.slice(0, this.bufferSize)
      }
    });
  }

  onScrollToEnd() {
    this.fetchMore();
  }

  onScroll({ end }) {
    if (this.loading || this.tagsList.length === this.tagsBuffer.length) { return; }
    if (end + this.numberOfItemsFromEndBeforeFetchingMore >= this.tagsBuffer.length) { this.fetchMore(); }
  }

  private fetchMore() {
    const len = this.tagsBuffer.length;
    const more = this.tagsList.slice(len, this.bufferSize + len);
    this.loading = true;
    // using timeout here to simulate backend API delay
    setTimeout(() => {
      this.loading = false;
      this.tagsBuffer = this.tagsBuffer.concat(more);
    }, 200)
  }
}
