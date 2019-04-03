import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CrossReference } from 'src/app/model/crossreference.model';
import { InvariantsService } from 'src/app/services/crud/invariants.service';
import { IAction, ITestCase, Control, IControl, Action } from 'src/app/model/testcase.model';
import { IInvariant } from 'src/app/model/invariants.model';
import { CrossreferenceService } from 'src/app/services/utils/crossreference.service';
import { TestService } from 'src/app/services/crud/test.service';
import { SettingsService } from '../settings/settings.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DraganddropService } from '../draganddrop.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  @Input('action') action: IAction;
  @Input('readonly') readonly: boolean;
  @Input('showContent') showControlList: boolean;
  @Input('parentStepIndex') parentStepIndex: number;
  @Input('actionIndex') actionIndex: number;

  // the component doens't have access to the Action list
  // so it will call the addAction method from Step component
  @Output() actionAdded = new EventEmitter<number>();

  private isDragging: boolean;
  private showActionAddButtons: boolean;
  private testcase: ITestCase;
  private DragAndAdropAreaId: string;
  private DragAndDropControlIDList: Array<string>;
  // Cross Reference array to display the correct input fields according to the selected condition
  private crossReference_ActionValue: Array<CrossReference> = this.CrossReferenceService.crossReference_ActionValue;
  private crossReference_ConditionValue: Array<CrossReference> = this.CrossReferenceService.crossReference_ConditionValue;
  // private invariants
  private inv_action: Array<IInvariant>;
  private inv_condition_oper: Array<IInvariant>;

  constructor(
    private InvariantService: InvariantsService,
    private CrossReferenceService: CrossreferenceService,
    private TestService: TestService,
    private SettingsService: SettingsService,
    private DragAndDropService: DraganddropService
  ) { }

  ngOnInit() {
    this.showActionAddButtons = false;
    this.isDragging = false;
    this.DragAndAdropAreaId = this.generateID();
    this.DragAndDropService.observableControlsIdList.subscribe(r => { this.DragAndDropControlIDList = r; });
    // @ts-ignore
    if (this.action.controlList.length == 0) { this.showControlList = false; } else { this.showControlList = true; }
    this.InvariantService.observableActionsList.subscribe(response => { this.inv_action = response; });
    this.InvariantService.observableConditionOperList.subscribe(response => { this.inv_condition_oper = response; });
    this.TestService.observableTestCase.subscribe(response => { this.testcase = response; });
  }

  addAction(destinationIndex: number) {
    // send the desired position for the new Action to the Step component
    this.actionAdded.emit(destinationIndex);
  }

  addControl(destinationIndex: number): void {
    var newControl = new Control(this.testcase.info.test, this.testcase.info.testCase, destinationIndex);
    this.action.controlList.splice(destinationIndex, 0, newControl);
    this.TestService.refreshControlSort(this.action.controlList);
    // force the control list to be displayed when adding a control
    this.showControlList = true;
  }

  focusOnAction(): void {
    // send the action to the settings service and thus, to the settings component
    this.SettingsService.editActionSettings(this.action, this.readonly, this.parentStepIndex);
  }

  dropControl(event: CdkDragDrop<IControl[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.TestService.refreshControlSort(this.action.controlList);
    // show the control List when dragging to an action without control
    if (this.showControlList == false) { this.showControlList = true }
  }

  generateID() {
    var id = 'control-droplist-' + this.DragAndDropService.getControlsListID();
    this.DragAndDropService.addIDToControlList(id);
    return id;
  }

  hasActionCrossReference(action: string): boolean { return this.CrossReferenceService.hasCrossReference(action, this.CrossReferenceService.crossReference_ActionValue); }
  findActionCrossReference(action: string): CrossReference { return this.CrossReferenceService.findCrossReference(action, this.CrossReferenceService.crossReference_ActionValue); }
  hasConditionCrossReference(condition: string): boolean { return this.CrossReferenceService.hasCrossReference(condition, this.CrossReferenceService.crossReference_ConditionValue); }
  findConditionCrossReference(condition: string): CrossReference { return this.CrossReferenceService.findCrossReference(condition, this.CrossReferenceService.crossReference_ConditionValue); }
  hasControlCrossReference(control: string): boolean { return this.CrossReferenceService.hasCrossReference(control, this.CrossReferenceService.crossReference_ControlValue); }
  findControlCrossReference(control: string): CrossReference { return this.CrossReferenceService.findCrossReference(control, this.CrossReferenceService.crossReference_ControlValue); }

  controlEntered() {
    // make sure show the controls list when dragging a control from another list in the action
    console.log("controlEntered in " + this.DragAndAdropAreaId);
    if (this.showControlList == false) {
      this.showControlList = true;
      this.isDragging = true;
    }
  }

  controlExited() {
    console.log("controlExited from " + this.DragAndAdropAreaId);
    this.isDragging = false;
    /*if (this.isDragging == true){
      this.showControlList = false;
    }*/
  }


}
