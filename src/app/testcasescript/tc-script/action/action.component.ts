import { Component, OnInit, Input } from '@angular/core';
import { CrossReference } from 'src/app/model/crossreference.model';
import { InvariantsService } from 'src/app/services/crud/invariants.service';
import { IAction } from 'src/app/model/testcase.model';
import { IInvariant } from 'src/app/model/invariants.model';
import { CrossreferenceService } from 'src/app/services/utils/crossreference.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  @Input('action') action: IAction;
  showedActionHeader: boolean;
  // Cross Reference array to display the correct input fields according to the selected condition
  private crossReference_ActionValue: Array<CrossReference> = this.CrossReferenceService.crossReference_ActionValue;
  private crossReference_ConditionValue: Array<CrossReference> = this.CrossReferenceService.crossReference_ConditionValue;
  // private invariants
  private inv_action: Array<IInvariant>;
  private inv_condition_oper: Array<IInvariant>;

  constructor(
    private InvariantService: InvariantsService,
    private CrossReferenceService: CrossreferenceService
  ) { }

  ngOnInit() {
    this.showedActionHeader = false;
    this.InvariantService.observableActionsList.subscribe(response => { this.inv_action = response; });
    this.InvariantService.observableConditionOperList.subscribe(response => { this.inv_condition_oper = response; });
  }

  hasActionCrossReference(action: string): boolean { return this.CrossReferenceService.hasActionCrossReference(action); }
  findActionCrossReference(action: string): CrossReference { return this.CrossReferenceService.findActionCrossReference(action); }
  hasConditionCrossReference(condition: string): boolean { return this.CrossReferenceService.hasConditionCrossReference(condition); }
  findConditionCrossReference(condition: string): CrossReference { return this.CrossReferenceService.findConditionCrossReference(condition); }

}
