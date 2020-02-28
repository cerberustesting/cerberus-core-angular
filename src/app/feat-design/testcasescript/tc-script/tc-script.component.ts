import { Component, OnInit, Input } from '@angular/core';
import { ITestCase } from 'src/app/shared/model/testcase.model';
import { TestcaseService } from 'src/app/core/services/api/testcase/testcase.service';
import { IInvariant } from 'src/app/shared/model/invariants.model';
import { InvariantsService } from 'src/app/core/services/api/invariants.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-tc-script',
  templateUrl: './tc-script.component.html',
  styleUrls: ['./tc-script.component.scss']
})
export class TcScriptComponent implements OnInit {

  // full testcase object with step content
  @Input('testcase') testcase: ITestCase;

  // list of countries
  private inv_countriesList: Array<IInvariant>;

  // event received from parent to trigger the saveScript function
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
    this.saveScriptEvent.subscribe(() => this.saveTestCase());
  }

  // send the new script to the API for saving
  saveTestCase() {
    // send the testcase to the data service
    // this.testService.saveTestCase(this.testcase);
    console.log('SAVE SCRIPT');
    // TODO : complete the testservice function
  }
}
