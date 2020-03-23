import { Component, OnInit, Input } from '@angular/core';
import { TestCase } from 'src/app/shared/model/back/testcase.model';
import { TestcaseService } from 'src/app/core/services/api/testcase/testcase.service';
import { TestCasePropertiesV2 } from 'src/app/shared/model/back/property.model';

@Component({
  selector: 'app-testcasecontent',
  templateUrl: './testcasecontent.component.html',
  styleUrls: ['./testcasecontent.component.scss']
})
export class TcScriptComponent implements OnInit {

  /** full testcase object with step content */
  @Input('testcase') testcase: TestCase;

  /** list of tabs */
  private tabs: string[] = ['Script', 'Properties'];

  /** currently active tab */
  private selectedTab: string;

  constructor(
    private testcaseService: TestcaseService
  ) { }

  ngOnInit() {
    this.selectedTab = this.tabs[0];
    this.createPropertiesV2();
    // save the current step attribute : corresponds to the initial index
    this.testcaseService.SaveCurrentStepIndex(this.testcase.steps);
  }

  /**
   * temporaty function that build the properties V2 field
   */
  createPropertiesV2() {
    this.testcase.propertiesV2 = new TestCasePropertiesV2();
    this.testcase.propertiesV2.testCaseProperties = this.testcaseService.groupPropertiesByName(this.testcase.properties.testCaseProperties);
    this.testcase.propertiesV2.inheritedProperties = this.testcaseService.groupPropertiesByName(this.testcase.properties.inheritedProperties);
  }
}
