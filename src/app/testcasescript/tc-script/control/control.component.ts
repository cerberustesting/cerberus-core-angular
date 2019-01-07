import { Component, OnInit, Input } from '@angular/core';
import { IControl, ITestCase, IAction, Control } from 'src/app/model/testcase.model';
import { CrossReference } from 'src/app/model/crossreference.model';
import { CrossreferenceService } from 'src/app/services/utils/crossreference.service';
import { IInvariant } from 'src/app/model/invariants.model';
import { InvariantsService } from 'src/app/services/crud/invariants.service';
import { TestService } from 'src/app/services/crud/test.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  @Input('control') control: IControl;
  showedControlHeader: boolean;
  showedControlFooter: boolean;
  testcase: ITestCase;
  // Cross Reference array to display the correct input fields according to the selected condition
  private crossReference_ActionValue: Array<CrossReference> = this.CrossReferenceService.crossReference_ActionValue;
  private crossReference_ConditionValue: Array<CrossReference> = this.CrossReferenceService.crossReference_ConditionValue;
  // private invariants
  private inv_condition_oper: Array<IInvariant>;
  private inv_control: Array<IInvariant>;

  constructor(
    private InvariantService: InvariantsService,
    private CrossReferenceService: CrossreferenceService,
    private TestService: TestService
  ) { }

  ngOnInit() {
    this.showedControlHeader = false;
    this.showedControlFooter = false;
    this.control.toDelete = false;
    this.InvariantService.observableConditionOperList.subscribe(response => { this.inv_condition_oper = response; });
    this.InvariantService.observableControlsList.subscribe(response => { this.inv_control = response; });
    this.TestService.observableTestCase.subscribe(response => { this.testcase = response; });
  }

  flagForDeletion(control: IControl) { this.control.toDelete = !this.control.toDelete; this.debug(); }

  addControl() {
    // WORK IN PROGRESS
    console.log(this.testcase.stepList[this.control.step - 1].actionList[(this.control.sequence) - 1].controlList.length);
    /*
    var newControl = new Control(
      this.testcase.info.test,
      this.testcase.info.testCase,
      this.control.step,
      this.testcase.stepList[this.control.step].actionList[(this.control.sequence/10)].controlList.length,
      this.testcase.stepList[this.control.step].actionList[(this.control.sequence/10)].controlList.length + 1,
      this.control.sequence
    )
    console.log(newControl);
    */
  }

  hasConditionCrossReference(condition: string): boolean { return this.CrossReferenceService.hasConditionCrossReference(condition); }
  findConditionCrossReference(condition: string): CrossReference { return this.CrossReferenceService.findConditionCrossReference(condition); }
  hasControlCrossReference(control: string): boolean { return this.CrossReferenceService.hasControlCrossReference(control); }
  findControlCrossReference(control: string): CrossReference { return this.CrossReferenceService.findControlCrossReference(control); }

  mouseEnter() { this.showedControlFooter = true; }
  mouseLeave() { this.showedControlFooter = false; }

  debug() { console.log(this.control); }
}
