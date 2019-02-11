import { Component, OnInit } from '@angular/core';
import { ReportingService } from 'src/app/services/crud/reporting.service';
import { HttpClient } from '@angular/common/http';
import { ITag } from 'src/app/model/reporting.model';
import { ActivatedRoute, Router } from '@angular/router';
import { InvariantsService } from 'src/app/services/crud/invariants.service';
import { IInvariant } from 'src/app/model/invariants.model';
declare function initChartJS();

@Component({
  selector: 'app-reportbytag',
  templateUrl: './reportbytag.component.html',
  styleUrls: ['./reportbytag.component.scss']
})
export class ReportbytagComponent implements OnInit {
  // ng-select configuration
  private tagsList: Array<ITag> = new Array();
  private tagsBuffer: Array<ITag> = new Array();
  private bufferSize = 50;
  private numberOfItemsFromEndBeforeFetchingMore = 10;
  private loading = false;
  private selectedTag: ITag = null;
  // variables
  private countriesList: Array<IInvariant> = new Array();
  private tceStatusList: Array<IInvariant> = new Array();
  // DIRTY : need to create custom CSS class for earch TCE Status
  private TceStatus_Class: Array<any> = new Array(
    {
      status: "OK",
      class: "success"
    },
    {
      status: "KO",
      class: "danger"
    },
    {
      status: "FA",
      class: "warning"
    },
    {
      status: "PE",
      class: "info"
    },
    {
      status: "NA",
      class: "warning"
    },
    {
      status: "CA",
      class: "light"
    }
  );

  constructor(private http: HttpClient,
    private ReportingService: ReportingService,
    private activatedRoute: ActivatedRoute,
    private InvariantsService: InvariantsService,
    private router: Router, ) { }

  ngOnInit() {
    this.ReportingService.getTagList();
    this.ReportingService.observableTagsList.subscribe(response => {
      if (response) {
        this.tagsList = response;
        this.tagsBuffer = this.tagsList.slice(0, this.bufferSize)
        // parse query strings from URL
        this.activatedRoute.queryParams.subscribe(params => {
          var tagFromURL = params['tag'];
          if (tagFromURL) {
            if (this.ReportingService.tagExists(tagFromURL)) {
              this.selectedTag = this.ReportingService.findTag(tagFromURL);
            }
          }
        });
      }
    });
    initChartJS();
    this.InvariantsService.getCountriesList();
    this.InvariantsService.getTceStatus();
    this.InvariantsService.observableCountriesList.subscribe(response => { this.countriesList = response; });
    this.InvariantsService.observableTceStatusList.subscribe(response => { this.tceStatusList = response; });
  }

  onScrollToEnd() {
    this.fetchMore();
  }

  selectedTagChange() {
    if (this.selectedTag) {
      this.router.navigate([], { queryParams: { tag: this.selectedTag.tag } });
    }
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

  findStatusClass(status: string) {
    return this.TceStatus_Class.find(tces => tces.status === status).class;
  }

}
