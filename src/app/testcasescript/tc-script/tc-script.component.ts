import { Component, OnInit, Input } from '@angular/core';
import { ITestCase, IStep, IAction } from 'src/app/model/testcase.model';
import { IInvariant } from 'src/app/model/invariants.model';
import { InvariantsService } from 'src/app/services/crud/invariants.service';
import { CrossReference } from 'src/app/model/crossreference.model';

@Component({
  selector: 'app-tc-script',
  templateUrl: './tc-script.component.html',
  styleUrls: ['./tc-script.component.scss']
})
export class TcScriptComponent implements OnInit {

  @Input('testcase') testcase: ITestCase;
  active_step: IStep;

  constructor(private InvariantService: InvariantsService) { }

  ngOnChanges() {
    //@ts-ignore
    if (this.testcase.stepList.length == 0) {
      this.active_step = null;
    } else { this.active_step = this.testcase.stepList[0]; }
  }

  ngOnInit() { }

  setActiveStep(step: IStep) {
    this.active_step = step;
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
    // focus on the new step
    this.active_step = newStep;
  }

  saveActiveStep() {
    console.log(this.testcase.stepList);
  }

  debug() {
    console.log(this.testcase);
  }

}
