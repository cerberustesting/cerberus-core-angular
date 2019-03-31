import { Component, OnInit, Input } from '@angular/core';
import { ITestCase, IStep, Step } from 'src/app/model/testcase.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TestService } from 'src/app/services/crud/test.service';
import { IProperty } from 'src/app/model/property.model';
import { IInvariant } from 'src/app/model/invariants.model';
import { InvariantsService } from 'src/app/services/crud/invariants.service';

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

  private propertiesList: Array<IProperty>;
  private activePropertyName: string;
  private activeProperty: Array<IProperty>;

  constructor(private TestService: TestService, private InvariantsService: InvariantsService) {
    this.stepListBlockId = "stepList";
  }

  ngOnInit() {
    this.TestService.getProperties(this.testcase.info.test, this.testcase.info.testCase);
    this.TestService.observableTestCaseProperties.subscribe(r => {
      if (r) {
        this.propertiesList = r;
        this.setActiveProperty(this.propertiesList[0].property);
      }
    });
    this.selectedTab = this.tabs[1];
  }

  addAStep() {
    var newStep = new Step(this.testcase.info.testCase, this.testcase.info.test, this.testcase.stepList.length + 1);
    this.testcase.stepList.push(newStep);
    // useless to refresh the step sort here since we can only add at the end.
    // if later modification (e.g. adding a step after any step), please consider
    // - using splice() instead of push
    // - call TestService.refreshStepSort(this.testcase.stepList)
  }

  dropStep(event: CdkDragDrop<IStep[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    this.TestService.refreshStepSort(this.testcase.stepList);
  }

  debug() {
    console.log(this.testcase);
  }

  saveTestCase() {
    // send the testcase to the data service
    this.TestService.saveTestCase(this.testcase);
  }

  setActiveProperty(propName: string) {
    this.activePropertyName = propName;
    this.activeProperty = this.TestService.filterPropertyByName(this.propertiesList, propName);
  }

  getUniquePropertiesNameList(propList: Array<IProperty>): Array<string> {
    return this.TestService.getUniquePropertiesNameList(propList);
  }

}
