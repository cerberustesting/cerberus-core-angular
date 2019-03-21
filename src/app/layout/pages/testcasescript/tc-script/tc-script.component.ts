import { Component, OnInit, Input } from '@angular/core';
import { ITestCase, IStep, Step } from 'src/app/model/testcase.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TestService } from 'src/app/services/crud/test.service';
import { IProperty } from 'src/app/model/property.model';

@Component({
  selector: 'app-tc-script',
  templateUrl: './tc-script.component.html',
  styleUrls: ['./tc-script.component.scss']
})
export class TcScriptComponent implements OnInit {

  @Input('testcase') testcase: ITestCase;

  private tabs: string[] = ['Script', 'Properties'];
  private selectedTab: string;

  private stepListBlockId: string;

  private propertiesList: Array<IProperty>;
  private activeProperty: IProperty;

  constructor(private TestService: TestService) {
    this.stepListBlockId = "stepList";
  }

  ngOnInit() {
    // show Script tab by default = tabs[0]
    this.selectedTab = this.tabs[1];
    this.TestService.getProperties(this.testcase.info.test, this.testcase.info.testCase);
    this.TestService.observableTestCaseProperties.subscribe(r => { this.propertiesList = r; this.activeProperty = this.propertiesList[0]; });
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

}
