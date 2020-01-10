import { Component, OnInit, Input } from '@angular/core';
import { ITestCase } from 'src/app/shared/model/testcase.model';
import { TestService } from 'src/app/core/services/crud/test.service';
import { Property } from 'src/app/shared/model/property.model';
import { IInvariant } from 'src/app/shared/model/invariants.model';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';
// import { PropertyComponent } from 'src/app/layout/pages/testcasescript/tc-script/property/property.component'

@Component({
  selector: 'app-tc-script',
  templateUrl: './tc-script.component.html',
  styleUrls: ['./tc-script.component.scss']
})
export class TcScriptComponent implements OnInit {

  @Input('testcase') testcase: ITestCase;
  private inv_countriesList: Array<IInvariant>;

  private tabs: string[] = ['Script', 'Properties'];
  private selectedTab: string;

  private stepListBlockId: string;

  private oldVersion = false; // TODO : to remove and keep a version

  // @ViewChild(ChildComponent) child;

  constructor(
    private testService: TestService,
    private invariantsService: InvariantsService
  ) { }

  ngOnInit() {
    this.selectedTab = this.tabs[0];
  }

  saveTestCase() {
    // send the testcase to the data service
    this.testService.saveTestCase(this.testcase);
  }

  debug() { }

}
