import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';
import { Action, ITestCase, Control } from 'src/app/shared/model/testcase.model';
import { IInvariant } from 'src/app/shared/model/invariants.model';
import { CrossreferenceService, ICrossReference } from 'src/app/core/services/utils/crossreference.service';
import { TestService } from 'src/app/core/services/crud/test.service';
import { SettingsService } from '../settings/settings.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DraganddropService } from '../draganddrop.service';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  @Input('action') action: Action;
  @Input('readonly') readonly: boolean;
  @Input('showContent') showControlList: boolean;
  @Input('parentStepIndex') parentStepIndex: number;
  @Input('actionIndex') actionIndex: number;

  // the component doens't have access to the Action list
  // so it will call the addAction method from Step component
  @Output() actionAdded = new EventEmitter<number>();

  private isDragging: boolean;
  private showActionAddButtons: boolean;
  private isFocused: boolean;
  private testcase: ITestCase;
  DragAndAdropAreaId: string;
  DragAndDropControlIDList: Array<string>;
  // Cross Reference array to display the correct input fields according to the selected condition
  private crossReference_ActionValue: Array<ICrossReference> = this.CrossReferenceService.crossReference_ActionValue;
  private crossReference_ConditionValue: Array<ICrossReference> = this.CrossReferenceService.crossReference_ConditionValue;
  // private invariants
  private inv_action: Array<IInvariant>;
  private inv_condition_oper: Array<IInvariant>;

  constructor(
    private InvariantService: InvariantsService,
    private CrossReferenceService: CrossreferenceService,
    private testService: TestService,
    private settingsService: SettingsService,
    private DragAndDropService: DraganddropService
  ) { }

  ngOnInit() {
    this.showActionAddButtons = false;
    this.isDragging = false;
    this.DragAndAdropAreaId = this.generateID();
    this.DragAndDropService.observableControlsIdList.subscribe(r => { this.DragAndDropControlIDList = r; });
    // @ts-ignore
    if (this.action.controlList.length === 0) { this.showControlList = false; } else { this.showControlList = true; }
    this.InvariantService.observableActionsList.subscribe(response => { this.inv_action = response; });
    this.InvariantService.observableConditionOperList.subscribe(response => { this.inv_condition_oper = response; });
    this.testService.observableTestCase.subscribe(response => { this.testcase = response; });
    this.settingsService.observableAction.subscribe(r => {
      if (this.action === r) {
        this.isFocused = true;
      } else {
        this.isFocused = false;
      }
    });
  }

  addAction(destinationIndex: number) {
    // send the desired position for the new Action to the Step component
    this.actionAdded.emit(destinationIndex);
  }

  addControl(destinationIndex: number): void {
    const newControl = new Control(this.testcase.info.test, this.testcase.info.testCase, destinationIndex);
    this.action.controlList.splice(destinationIndex, 0, newControl);
    this.testService.refreshControlSort(this.action.controlList);
    // force the control list to be displayed when adding a control
    this.showControlList = true;
  }

  focusOnAction(): void {
    // send the action to the settings service and thus, to the settings component
    this.settingsService.editActionSettings(this.action, this.readonly, this.parentStepIndex);
  }

  dropControl(event: CdkDragDrop<Control[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.testService.refreshControlSort(this.action.controlList);
    // show the control List when dragging to an action without control
    if (this.showControlList === false) { this.showControlList = true; }
  }

  generateID() {
    const id = 'control-droplist-' + this.DragAndDropService.getControlsListID();
    this.DragAndDropService.addIDToControlList(id);
    return id;
  }

  hasActionCrossReference(action: string): boolean { return this.CrossReferenceService.hasCrossReference(action, this.CrossReferenceService.crossReference_ActionValue); }
  findActionCrossReference(action: string): ICrossReference { return this.CrossReferenceService.findCrossReference(action, this.CrossReferenceService.crossReference_ActionValue); }
  hasConditionCrossReference(condition: string): boolean { return this.CrossReferenceService.hasCrossReference(condition, this.CrossReferenceService.crossReference_ConditionValue); }
  findConditionCrossReference(condition: string): ICrossReference { return this.CrossReferenceService.findCrossReference(condition, this.CrossReferenceService.crossReference_ConditionValue); }
  hasControlCrossReference(control: string): boolean { return this.CrossReferenceService.hasCrossReference(control, this.CrossReferenceService.crossReference_ControlValue); }
  findControlCrossReference(control: string): ICrossReference { return this.CrossReferenceService.findCrossReference(control, this.CrossReferenceService.crossReference_ControlValue); }

  controlEntered() {
    // make sure show the controls list when dragging a control from another list in the action
    if (this.showControlList === false) {
      this.showControlList = true;
      this.isDragging = true;
    }
  }

  controlExited() {
    this.isDragging = false;
  }

}
