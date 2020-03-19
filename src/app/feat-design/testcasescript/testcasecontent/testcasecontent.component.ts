import { Component, OnInit, Input } from '@angular/core';
import { TestCase } from 'src/app/shared/model/back/testcase.model';
import { TestcaseService } from 'src/app/core/services/api/testcase/testcase.service';
import { Invariant } from 'src/app/shared/model/invariants.model';
import { InvariantsService } from 'src/app/core/services/api/invariants.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-testcasecontent',
  templateUrl: './testcasecontent.component.html',
  styleUrls: ['./testcasecontent.component.scss']
})
export class TcScriptComponent implements OnInit {

  // full testcase object with step content
  @Input('testcase') testcase: TestCase;

  // list of countries
  private inv_countriesList: Array<Invariant>;

  // event received from parent to trigger the saveScript function
  // TODO : remove
  @Input() saveScriptEvent: Observable<void>;

  // list of tabs
  private tabs: string[] = ['Script', 'Properties'];
  // currently active tab
  private selectedTab: string;

  private oldVersion = false; // TODO : to remove and keep a version

  constructor(
    private testService: TestcaseService,
    private invariantsService: InvariantsService
  ) { }

  ngOnInit() {
    this.selectedTab = this.tabs[0];
  }

  // send the new script to the API for saving
  saveTestCase() {
    // send the testcase to the data service
    // this.testService.saveTestCase(this.testcase);
    console.log('SAVE SCRIPT');
    // TODO : complete the testservice function
  }
}
