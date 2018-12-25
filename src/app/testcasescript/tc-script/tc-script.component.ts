import { Component, OnInit, Input } from '@angular/core';
import { ITestCase, IStep } from 'src/app/model/testcase.model';
import { IInvariant } from 'src/app/model/invariants.model';
import { InvariantsService } from 'src/app/services/crud/invariants.service';

export class CrossReferenceConditionValue {
  condition: string;
  conditionVal1: string;
  conditionVal2: string;
}

@Component({
  selector: 'app-tc-script',
  templateUrl: './tc-script.component.html',
  styleUrls: ['./tc-script.component.scss']
})
export class TcScriptComponent implements OnInit {

  @Input('testcase') testcase: ITestCase;
  active_step: IStep;
  activeStepHeader: boolean;
  // private invariants
  private inv_condition_oper: Array<IInvariant>;
  private inv_step_loop: Array<IInvariant>;
  // Cross Reference array to display the correct input fields according to the selected condition
  // IMPROVMENT : include these values in private invariants gp1 & gp2 to get rid of this array
  private crossReference_ConditionValue: Array<CrossReferenceConditionValue> = [
    { condition: "always", conditionVal1: null, conditionVal2: null },
    { condition: "ifPropertyExist", conditionVal1: "Property Name", conditionVal2: null },
    { condition: "ifElementPresent", conditionVal1: "Element", conditionVal2: null },
    { condition: "ifElementNotPresent", conditionVal1: "Element", conditionVal2: null },
    { condition: "ifTextInElement", conditionVal1: "Element", conditionVal2: "Text" },
    { condition: "ifTextNotInElement", conditionVal1: "Element", conditionVal2: "Text" },
    { condition: "ifNumericEqual", conditionVal1: "Number 1", conditionVal2: "Number 2" },
    { condition: "ifNumericDifferent", conditionVal1: "Number 1", conditionVal2: "Number 2" },
    { condition: "ifNumericGreater", conditionVal1: "Number 1", conditionVal2: "Number 2" },
    { condition: "ifNumericGreaterOrEqual", conditionVal1: "Number 1", conditionVal2: "Number 2" },
    { condition: "ifNumericMinor", conditionVal1: "Number 1", conditionVal2: "Number 2" },
    { condition: "ifNumericMinorOrEqual", conditionVal1: "Number 1", conditionVal2: "Number 2" },
    { condition: "ifStringEqual", conditionVal1: "String 1", conditionVal2: "String 2" },
    { condition: "ifStringDifferent", conditionVal1: "String 1", conditionVal2: "String 2" },
    { condition: "ifStringGreater", conditionVal1: "String 1", conditionVal2: "String 2" },
    { condition: "ifStringMinor", conditionVal1: "String 1", conditionVal2: "String 2" },
    { condition: "ifStringContains", conditionVal1: "String", conditionVal2: "Contains" },
    { condition: "never", conditionVal1: null, conditionVal2: null }
  ];

  constructor(private InvariantService: InvariantsService) { }

  ngOnChanges() {
    //@ts-ignore
    if (this.testcase.stepList.length == 0) {
      this.active_step = null;
    } else { this.active_step = this.testcase.stepList[0]; }
  }

  ngOnInit() {
    this.activeStepHeader = false;
    this.InvariantService.observableConditionOperList.subscribe(response => { this.inv_condition_oper = response; });
    this.InvariantService.observableStepLoopList.subscribe(response => { this.inv_step_loop = response; });
  }

  toggleStepHeader() {
    this.activeStepHeader = !this.activeStepHeader;
  }

  setActiveStep(step: IStep) {
    this.active_step = step;
  }

  setForceExe(step: IStep) {
    if (step.forceExe == 'Y') {
      step.forceExe = 'N';
    } else {
      step.forceExe = 'Y';
    }
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

  hasConditionCrossReference(condition: string): boolean {
    return this.crossReference_ConditionValue.filter(cr => cr.condition === condition).length > 0;
  }

  findConditionCrossReference(condition: string): CrossReferenceConditionValue {
    return this.crossReference_ConditionValue.find(cr => cr.condition === condition);
  }

  saveActiveStep() {
    console.log(this.testcase.stepList);
  }

}
