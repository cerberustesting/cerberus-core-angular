import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { TestService } from 'src/app/services/crud/test.service';
import { ITestCaseHeader } from 'src/app/shared/model/testcase.model';
import { ITest } from 'src/app/shared/model/test.model';
import { IInvariant } from 'src/app/shared/model/invariants.model';
import { InvariantsService } from 'src/app/services/crud/invariants.service';
import { ILabel } from 'src/app/shared/model/label.model';
import { SystemService } from 'src/app/services/crud/system.service';
import { IBuildRevisionInvariant } from 'src/app/shared/model/buildrevisioninvariant.model';
import { IApplication } from 'src/app/shared/model/application.model';
import { IProject } from 'src/app/shared/model/project.model';
// JS Functions
declare function blockAPI(mode, id): void;

@Component({
  selector: 'app-tc-header',
  templateUrl: './tc-header.component.html',
  styleUrls: ['./tc-header.component.scss']
})
export class TcHeaderComponent implements OnInit {

  @Input('test') selectedTest: string;
  @Input('testcase') selectedTestCase: string;

  @Input('testcaseheader') testcaseheader: ITestCaseHeader;
  private testcaseheader_countryList: any;
  private testcaseheader_countryList_custom: Array<string> = new Array<string>();
  private testcaseheader_labelsList: Array<ILabel>;
  private originalTest: string;
  private originalTestCase: string;

  private block_id: string = "testcaseheader_block";

  private testsList: Array<ITest> = new Array<ITest>();
  private testcasesList: Array<ITestCaseHeader> = new Array<ITestCaseHeader>();

  tabs: string[] = ['Definition', 'Execution', 'Label', 'Origin', 'Bug Report', 'Tracability'];
  selectedTab: string;

  labels_tabs: string[] = ['Stickers', 'Requirements', 'Batteries'];
  selectedLabelsTab: string;

  // labels
  private labelsList: Array<ILabel>;
  private stickersList: Array<ILabel>;
  private requirementsList: Array<ILabel>;
  private batteriesList: Array<ILabel>;
  // projects
  private projectsList: Array<IProject>;
  // applications List
  private applicationsList: Array<IApplication>;
  private application: IApplication;
  // build revision invariants
  private sprints: Array<IBuildRevisionInvariant>;
  private isThereAnySprintDefined: boolean;
  private revs: Array<IBuildRevisionInvariant>;
  private isThereAnyRevDefined: boolean;
  // public invariants
  private inv_tcstatus: Array<IInvariant>;
  private inv_priorities: Array<IInvariant>;
  private inv_countries: Array<IInvariant>;
  private inv_originsList: Array<IInvariant>;
  // private invariants
  private inv_group: Array<IInvariant>;
  private inv_condition_oper: Array<IInvariant>;

  constructor(
    private TestService: TestService,
    private InvariantService: InvariantsService,
    private SystemService: SystemService
  ) { }

  ngOnChanges() {
    if (this.testcaseheader) {
      // DIRTY
      this.testcaseheader_countryList_custom = new Array<string>();
      for (var country in this.testcaseheader.countryList) {
        this.testcaseheader_countryList_custom.push(country);
      }
      this.originalTest = this.testcaseheader.test;
      this.originalTestCase = this.testcaseheader.testCase;
    }
  }

  ngOnInit() {
    if (this.TestService.refreshTC) {
      blockAPI('state_loading', this.block_id);
      var loadingAnimationTime = setInterval(() => {
        this.TestService.refreshTC = false;
        blockAPI('state_normal', this.block_id);
        clearInterval(loadingAnimationTime);
      }, 1000);
    } else {
      blockAPI('content_hide', this.block_id);
    }
    this.TestService.observableTestsList.subscribe(response => { this.testsList = response; });
    this.TestService.observableTestCasesList.subscribe(response => { this.testcasesList = response; });
    this.TestService.observableTestCaseLabels.subscribe(response => { this.testcaseheader_labelsList = response; });
    this.TestService.observableProjectsList.subscribe(response => { this.projectsList = response; });
    this.InvariantService.observableCountriesList.subscribe(response => { this.inv_countries = response; });
    this.InvariantService.observableTcStatus.subscribe(response => { this.inv_tcstatus = response; });
    this.InvariantService.observableGroupsList.subscribe(response => { this.inv_group = response; });
    this.InvariantService.observablePriorities.subscribe(response => { this.inv_priorities = response; });
    this.InvariantService.observableOriginsList.subscribe(response => { this.inv_originsList = response; })
    this.InvariantService.observableConditionOperList.subscribe(response => { this.inv_condition_oper = response; });
    this.SystemService.observableApplicationList.subscribe(response => { this.applicationsList = response; });
    this.SystemService.observableApplication.subscribe(response => { this.application = response; });
    this.SystemService.observableLabelsList.subscribe(response => {
      this.labelsList = response;
      if (this.labelsList) {
        this.stickersList = this.SystemService.filterLabels(this.labelsList, 'STICKER');
        this.requirementsList = this.SystemService.filterLabels(this.labelsList, 'REQUIREMENT');
        this.batteriesList = this.SystemService.filterLabels(this.labelsList, 'BATTERY');
      }
    });
    this.SystemService.observableSprints.subscribe(response => {
      if (response) {
        this.sprints = response;
        if (response.length > 0) { this.isThereAnySprintDefined = true; }
        else { this.isThereAnySprintDefined = false; }
      }
    });
    this.SystemService.observableRevs.subscribe(response => {
      if (response) {
        this.revs = response;
        if (response.length > 0) { this.isThereAnyRevDefined = true; }
        else { this.isThereAnyRevDefined = false; }
      }
    });
    // set the default openened tab
    this.selectedTab = this.tabs[0];
    this.selectedLabelsTab = this.labels_tabs[0];
  }

  refreshTestCase() {
    this.TestService.getTestsList();
    this.TestService.getTestCase(this.selectedTest, this.selectedTestCase);
    this.SystemService.getLabelsFromSystem(this.testcaseheader.system);
    this.SystemService.getRevFromSystem(this.testcaseheader.system);
    this.SystemService.getSprintsFromSystem(this.testcaseheader.system);
    this.SystemService.getApplication(this.testcaseheader.application);
    this.TestService.getProjectsList();
    this.InvariantService.getCountriesList();
    this.InvariantService.getTcStatus();
    this.InvariantService.getOriginsList();
    this.InvariantService.getPriorities();
    this.InvariantService.getGroupList();
    this.InvariantService.getOriginsList();
    this.InvariantService.getStepConditionOperList();
    this.SystemService.getApplicationList();
    this.TestService.refreshTC = true;
  }

  // DIRTY : the model should be an array of string, not a JSON object with {"FR": FR}
  updateCheckedCountries(country) {
    var index = this.testcaseheader_countryList_custom.indexOf(country.value);
    if (index >= 0) {
      // remove it
      this.testcaseheader_countryList_custom.splice(index, 1);
    } else {
      // add it
      this.testcaseheader_countryList_custom.push(country);
    }
  }

  addLabelToTestCase(label: ILabel) {
    if (!this.isLabelPresentinTestCase(label.id)) {
      this.testcaseheader_labelsList.push(label);
    }
  }

  removeLabelFromTestCase(labelid: number) {
    if (this.isLabelPresentinTestCase(labelid)) {
      var label = this.testcaseheader_labelsList.find(x => x.id === labelid);
      var index = this.testcaseheader_labelsList.indexOf(label);
      this.testcaseheader_labelsList.splice(index, 1);
    }
  }

  isLabelPresentinTestCase(labelid: number) {
    return this.testcaseheader_labelsList.some(x => x.id == labelid);
  }

  redirectToBugID(): void {
    if (this.testcaseheader.bugID != null) { window.open(this.application.bugTrackerNewUrl, "_blank"); }
  }

  saveTestCaseHeader() {
    this.testcaseheader_countryList = {};
    for (var index in this.testcaseheader_countryList_custom) {
      var country = this.testcaseheader_countryList_custom[index];
      Object.assign(this.testcaseheader_countryList, { [country]: country });
    }
    this.testcaseheader.countryList = this.testcaseheader_countryList;
    this.TestService.saveTestCaseHeader(this.testcaseheader, this.originalTest, this.originalTestCase);
  }

  debug() { }

}
