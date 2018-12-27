import { Component, OnInit, Input } from '@angular/core';
import { ITestCase, IStep, IAction } from 'src/app/model/testcase.model';
import { IInvariant } from 'src/app/model/invariants.model';
import { InvariantsService } from 'src/app/services/crud/invariants.service';

export class CrossReference {
  reference: string;
  value1: string;
  value2: string;
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
  private inv_action: Array<IInvariant>;
  // Cross Reference array to display the correct input fields according to the selected condition
  // IMPROVMENT : include these values in private invariants gp1 & gp2 to get rid of this array
  private crossReference_ConditionValue: Array<CrossReference> = [
    { reference: "always", value1: null, value2: null },
    { reference: "ifPropertyExist", value1: "Property Name", value2: null },
    { reference: "ifElementPresent", value1: "Element", value2: null },
    { reference: "ifElementNotPresent", value1: "Element", value2: null },
    { reference: "ifTextInElement", value1: "Element", value2: "Text" },
    { reference: "ifTextNotInElement", value1: "Element", value2: "Text" },
    { reference: "ifNumericEqual", value1: "Number 1", value2: "Number 2" },
    { reference: "ifNumericDifferent", value1: "Number 1", value2: "Number 2" },
    { reference: "ifNumericGreater", value1: "Number 1", value2: "Number 2" },
    { reference: "ifNumericGreaterOrEqual", value1: "Number 1", value2: "Number 2" },
    { reference: "ifNumericMinor", value1: "Number 1", value2: "Number 2" },
    { reference: "ifNumericMinorOrEqual", value1: "Number 1", value2: "Number 2" },
    { reference: "ifStringEqual", value1: "String 1", value2: "String 2" },
    { reference: "ifStringDifferent", value1: "String 1", value2: "String 2" },
    { reference: "ifStringGreater", value1: "String 1", value2: "String 2" },
    { reference: "ifStringMinor", value1: "String 1", value2: "String 2" },
    { reference: "ifStringContains", value1: "String", value2: "Contains" },
    { reference: "never", value1: null, value2: null }
  ];
  private crossReference_ActionValue: Array<CrossReference> = [
    { reference: "Unknown", value1: null, value2: null },
    { reference: "click", value1: "Element path", value2: null },
    { reference: "mouseLeftButtonPress", value1: "Element path", value2: null },
    { reference: "mouseLeftButtonRelease", value1: "Element path", value2: null },
    { reference: "doubleClick", value1: "Element path", value2: null },
    { reference: "rightClick", value1: "Element path", value2: null },
    { reference: "mouseOver", value1: "Element path", value2: null },
    { reference: "focusToIframe", value1: "Iframe path", value2: null },
    { reference: "focusDefaultIframe", value1: null, value2: null },
    { reference: "switchToWindow", value1: "Window title or URL", value2: null },
    { reference: "manageDialog", value1: "Ok or Cancel", value2: null },
    { reference: "openUrlWithBase", value1: "URI", value2: null },
    { reference: "openUrlLogin", value1: null, value2: null },
    { reference: "openUrl", value1: "URL", value2: null },
    { reference: "executeJS", value1: "Script", value2: null },
    { reference: "executeCommand", value1: "Command", value2: "Arguments" },
    { reference: "openApp", value1: "Path", value2: "Activity" },
    { reference: "closeApp", value1: "Path", value2: null },
    { reference: "dragAndDrop", value1: "Element Path", value2: "Destination Path" },
    { reference: "select", value1: "Element", value2: "option" },
    { reference: "keypress", value1: "Element", value2: "Key" },
    { reference: "type", value1: "Element", value2: "Text" },
    { reference: "hideKeyboard", value1: null, value2: null },
    { reference: "swipe", value1: "Action", value2: "Direction" },
    { reference: "scrollTo", value1: "Element", value2: "Text" },
    { reference: "installApp", value1: "Path", value2: null },
    { reference: "removeApp", value1: "Package", value2: null },
    { reference: "wait", value1: "Duration", value2: null },
    { reference: "waitVanish", value1: "Element", value2: null },
    { reference: "callService", value1: "Service", value2: null },
    { reference: "executeSqlUpdate", value1: "DB", value2: "Script" },
    { reference: "executeSqlStoredProcedure", value1: "DB", value2: "Procedure" },
    { reference: "calculateProperty", value1: "Property", value2: "Override with" },
    { reference: "doNothing", value1: null, value2: null },
    { reference: "mouseOverAndWait", value1: null, value2: null },
    { reference: "removeDifference", value1: null, value2: null }
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
    this.InvariantService.observableActionsList.subscribe(response => { this.inv_action = response; });
    this.debug();
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

  setForceExeStatus(action: IAction) {
    if (action.forceExeStatus == 'PE') {
      action.forceExeStatus = '';
    } else {
      action.forceExeStatus = 'PE';
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
    return this.crossReference_ConditionValue.filter(cr => cr.reference === condition).length > 0;
  }

  findConditionCrossReference(condition: string): CrossReference {
    return this.crossReference_ConditionValue.find(cr => cr.reference === condition);
  }

  hasActionCrossReference(action: string): boolean {
    return this.crossReference_ActionValue.filter(cr => cr.reference === action).length > 0;
  }
  findActionCrossReference(action: string): CrossReference {
    return this.crossReference_ActionValue.find(cr => cr.reference === action);
  }

  saveActiveStep() {
    console.log(this.testcase.stepList);
  }

  debug() {
    console.log(this.testcase);
  }

}
