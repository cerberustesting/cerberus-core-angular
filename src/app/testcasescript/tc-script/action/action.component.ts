import { Component, OnInit, Input } from '@angular/core';
import { CrossReference } from 'src/app/model/crossreference.model';
import { InvariantsService } from 'src/app/services/crud/invariants.service';
import { IAction, ITestCase, Control } from 'src/app/model/testcase.model';
import { IInvariant } from 'src/app/model/invariants.model';
import { CrossreferenceService } from 'src/app/services/utils/crossreference.service';
import { TestService } from 'src/app/services/crud/test.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  @Input('action') action: IAction;
  showedActionHeader: boolean;
  showedActionFooter: boolean;
  testcase: ITestCase;
  // Cross Reference array to display the correct input fields according to the selected condition
  private crossReference_ActionValue: Array<CrossReference> = this.CrossReferenceService.crossReference_ActionValue;
  private crossReference_ConditionValue: Array<CrossReference> = this.CrossReferenceService.crossReference_ConditionValue;
  // private invariants
  private inv_action: Array<IInvariant>;
  private inv_condition_oper: Array<IInvariant>;

  constructor(
    private InvariantService: InvariantsService,
    private CrossReferenceService: CrossreferenceService,
    private TestService: TestService
  ) { }

  ngOnInit() {
    this.showedActionHeader = false;
    this.showedActionFooter = false;
    this.InvariantService.observableActionsList.subscribe(response => { this.inv_action = response; });
    this.InvariantService.observableConditionOperList.subscribe(response => { this.inv_condition_oper = response; });
    this.TestService.observableTestCase.subscribe(response => { this.testcase = response; });
  }

  addControl() {
    var newControl = new Control(
      this.testcase.info.test,
      this.testcase.info.testCase,
      this.action.step,
      this.action.controlList.length,
      this.action.controlList.length + 1,
      this.action.sequence
    )
    console.log(newControl);
  }

  hasActionCrossReference(action: string): boolean { return this.CrossReferenceService.hasActionCrossReference(action); }
  findActionCrossReference(action: string): CrossReference { return this.CrossReferenceService.findActionCrossReference(action); }
  hasConditionCrossReference(condition: string): boolean { return this.CrossReferenceService.hasConditionCrossReference(condition); }
  findConditionCrossReference(condition: string): CrossReference { return this.CrossReferenceService.findConditionCrossReference(condition); }

  mouseEnter() { this.showedActionFooter = true; }
  mouseLeave() { this.showedActionFooter = false; }
}
