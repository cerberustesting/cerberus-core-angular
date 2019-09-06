import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ReportingService } from 'src/app/core/services/crud/reporting.service';
import { ITag } from 'src/app/shared/model/reporting.model';
import { ActivatedRoute, Router } from '@angular/router';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';
import { IInvariant } from 'src/app/shared/model/invariants.model';

@Component({
  selector: 'app-tag-selection',
  templateUrl: './tag-selection.component.html',
  styleUrls: ['./tag-selection.component.scss']
})
export class TagSelectionComponent implements OnInit {
  @Output() tagSelection = new EventEmitter<ITag>();
  private tagsList: Array<ITag> = new Array();
  private tagsBuffer: Array<ITag> = new Array();
  private bufferSize = 50;
  private selectedTag: ITag = null;
  private countriesList: Array<IInvariant> = new Array();
  
  private filtersShowed: boolean;
  private showCountriesFilterOptions: boolean;
  private showTceStatusFilterOptions: boolean;
  private selected_countriesList: Array<string> = new Array();
  private tceStatusList: Array<IInvariant> = new Array();
  private selected_tceStatusList: Array<string> = new Array();
  private numberOfItemsFromEndBeforeFetchingMore = 10;
  private loading = false;

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

  constructor(private ReportingService: ReportingService,
    private activatedRoute: ActivatedRoute,
    private InvariantsService: InvariantsService,
    private router: Router) { }

  ngOnInit() {
    this.ReportingService.getTagList();
    this.ReportingService.observableTagsList.subscribe(response => {
      if (response) {
        this.tagsList = response;
        this.tagsBuffer = this.tagsList.slice(0, this.bufferSize);
        // parse query strings from URL
        if (this.activatedRoute.snapshot.paramMap.has('tag')) {
          let tagFromURL = decodeURIComponent(this.activatedRoute.snapshot.paramMap.get('tag'));
          if (tagFromURL) {
            if (this.ReportingService.tagExists(tagFromURL)) {
              this.selectedTag = this.ReportingService.findTag(tagFromURL);
              this.selectedTagChange();       
            }
          }
        }
        // this.activatedRoute.queryParams.subscribe(params => {
        //   var tagFromURL = params['tag'];
          
        //   if (tagFromURL) {
        //     if (this.ReportingService.tagExists(tagFromURL)) {
        //       this.selectedTag = this.ReportingService.findTag(tagFromURL);
        //       this.selectedTagChange();       
        //     }
        //   }
        // });
      }
      
    });
    this.InvariantsService.getCountriesList();
    this.InvariantsService.getTceStatus();
    this.InvariantsService.observableCountriesList.subscribe(response => {
      this.countriesList = response;
      for (var index in this.countriesList) {
        this.selected_countriesList[index] = this.countriesList[index].value;
      }
    });
    this.InvariantsService.observableTceStatusList.subscribe(response => {
      this.tceStatusList = response;
      for (var index in this.tceStatusList) {
        this.selected_tceStatusList[index] = this.tceStatusList[index].value;
      }
    });
    this.filtersShowed = false;
  }

  /** onScrollToEnd
   * * call by ng-select on scrolling to the last tag
   */
  onScrollToEnd(): void {
    this.fetchMore();
  }

  /** selectedTagChange
   * * load emit selected tag and chnge url queryParams
   */
  selectedTagChange(): void {       
    if (this.selectedTag) { 
      this.tagSelection.emit(this.selectedTag);
      this.router.navigate(['/analyse/report', this.selectedTag.tag]);       
    }
    else { this.router.navigate([]); }
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
    }, 1)
  }

  clearTag() {
    this.selectedTag = null;
    this.filtersShowed = false;
    this.selectedTagChange();
  }

  findStatusClass(status: string) {
    return this.TceStatus_Class.find(tces => tces.status === status).class;
  }

  // countries global selection functions
  isCountrySelected(country: string): boolean {
    return this.selected_countriesList.filter(c => c === country).length > 0;
  }
  selectAllCountries() {
    for (var index in this.countriesList) {
      this.selected_countriesList[index] = this.countriesList[index].value;
    }
  }
  UnselectAllCountries() {
    this.selected_countriesList = [];
  }
  updateCountriesList($event, country: string) {
    if (!$event.target.checked) {
      // unchek : the country is removed
      var index = this.selected_countriesList.indexOf(country);
      this.selected_countriesList.splice(index, 1);
    } else {
      // check : the country is added
      // if it is not already in the array
      if (this.selected_countriesList.indexOf(country) == -1) {
        this.selected_countriesList.push(country);
      }
    }
  }

  // status global selection functions
  isTCEStatusSelected(tcestatus: string): boolean {
    return this.selected_tceStatusList.filter(s => s === tcestatus).length > 0;
  }
  selectAllTCEStatus() {
    for (var index in this.tceStatusList) {
      this.selected_tceStatusList[index] = this.tceStatusList[index].value;
    }
  }
  UnselectAllTCEStatus() {
    this.selected_tceStatusList = [];
  }
  updateTCEStatusList($event, status: string) {
    if (!$event.target.checked) {
      // unchek : the status is removed
      var index = this.selected_tceStatusList.indexOf(status);
      this.selected_tceStatusList.splice(index, 1);
    } else {
      // check : the status is added
      // if it is not already in the array
      if (this.selected_tceStatusList.indexOf(status) == -1) {
        this.selected_tceStatusList.push(status);
      }
    }
  }

  mouseEnterCountriesFilter() { this.showCountriesFilterOptions = true; }
  mouseLeaveCountriesFilter() { this.showCountriesFilterOptions = false; }
  mouseEnterTceStatusFilter() { this.showTceStatusFilterOptions = true; }
  mouseLeaveTceStatusFilter() { this.showTceStatusFilterOptions = false; }

}
