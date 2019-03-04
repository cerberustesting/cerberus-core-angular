import { Component, OnInit, Input } from '@angular/core';
import { ITestCase, IStep, IAction } from 'src/app/model/testcase.model';
import { InvariantsService } from 'src/app/services/crud/invariants.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
declare function blockAPI(mode: string, block_id: string): void;

@Component({
  selector: 'app-tc-script',
  templateUrl: './tc-script.component.html',
  styleUrls: ['./tc-script.component.scss']
})
export class TcScriptComponent implements OnInit {

  @Input('testcase') testcase: ITestCase;

  constructor(private InvariantService: InvariantsService) { }

  ngOnChanges() {
  }

  ngOnInit() { 
  }

  setActiveStep(step: IStep) {
  }

  addAStep() {
    var newStep = <IStep>{
      isStepInUseByOtherTestCase: false,
      description: '',
      test: this.testcase.info.test,
      sort: this.testcase.stepList.length + 1,
      conditionOper: '',
      conditionVal2: '',
      conditionVal1: '',
      actionList: null,
      forceExe: 'N'
    };
    this.testcase.stepList.push(newStep);
  }

  receiveStep($event): void {
    console.log('step received: ', $event);
  }

  saveActiveStep() {
    console.log(this.testcase.stepList);
  }

  drop(event: CdkDragDrop<{title: string, poster: string}[]>) {
    moveItemInArray(this.testcase.stepList, event.previousIndex, event.currentIndex);
    // todo: update the array sequence
  }

  debug() {
    console.log(this.testcase);
  }

}
