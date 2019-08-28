import { Component, OnInit } from '@angular/core';
import { ReportingService } from 'src/app/core/services/crud/reporting.service';
import { HttpClient } from '@angular/common/http';
import { ITag } from 'src/app/shared/model/reporting.model';
import { ActivatedRoute, Router } from '@angular/router';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';
import { IInvariant } from 'src/app/shared/model/invariants.model';
import { HeaderTitleService } from 'src/app/core/services/crud/header-title.service';
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
  private selectedTagData = null;
  
  // variables
  private countriesList: Array<IInvariant> = new Array();
  private selected_countriesList: Array<string> = new Array();
  private tceStatusList: Array<IInvariant> = new Array();
  private selected_tceStatusList: Array<string> = new Array();
  private filtersShowed: boolean;
  private showCountriesFilterOptions: boolean;
  private showTceStatusFilterOptions: boolean;
  private reportView: boolean = true;
  private chartsOther: Array<any>;
  private displayStatisticsDurationExecution: boolean;
  private displayStatisticsReliability: boolean;
  private displayLabelReport: boolean;
  private displayTestFolderReport: boolean;
  // DIRTY : need to create custom CSS class for earch TCE Status

  constructor(private http: HttpClient,
    private ReportingService: ReportingService,
    private activatedRoute: ActivatedRoute,
    private InvariantsService: InvariantsService,
    private router: Router, 
    private headerTitleService: HeaderTitleService) { 
      headerTitleService.setTitle("Report Execution");
    }

  ngOnInit() {
    this.ReportingService.observableReportOther.subscribe(response => {
      this.chartsOther = response;
    });
    this.ReportingService.observableReportStatisticsDurationExecution.subscribe(response => {
      this.displayStatisticsDurationExecution = response.display;
    });
    this.ReportingService.observableReportStatisticsReliability.subscribe(response => {
      this.displayStatisticsReliability = response.display;
    });
    this.ReportingService.observableLabelDisplay.subscribe(response => {
      this.displayLabelReport = response;
    });
    this.ReportingService.observableDisplayTestFolderReport.subscribe(response => {
      this.displayTestFolderReport = response;
    })
    this.InvariantsService.getCountriesList();
    this.InvariantsService.getTceStatus();
    this.filtersShowed = false;
  }

  /** tagSelection
   * * load informations of selected tag
   * @param value new tag selected
   */
  tagSelection(tag: ITag): void { 
    this.selectedTag = tag;
    this.ReportingService.getTestCaseExecutionByTag(this.selectedTag.tag);
  }

  /** toggleReportView
   * * set active tab (Report/Analyse)
   * @param view 
   */
  toggleReportView(view: boolean): void {
    this.reportView = view;
  }
}
