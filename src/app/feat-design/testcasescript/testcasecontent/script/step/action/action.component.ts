import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TestCase } from 'src/app/shared/model/back/testcase/testcase.model';
import { CrossreferenceService, ICrossReference } from 'src/app/core/services/utils/crossreference.service';
import { TestcaseService } from 'src/app/core/services/api/testcase/testcase.service';
import { SettingsService } from '../../../settings/settings.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { DraganddropService } from '../../../draganddrop.service';
import { Control } from 'src/app/shared/model/back/testcase/control.model';
import { Action } from 'src/app/shared/model/back/testcase/action.model';
import { Step } from 'src/app/shared/model/back/testcase/step.model';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  /** action object */
  @Input('action') action: Action;

  /** read only mode from parent */
  @Input('readonly') readonly: boolean;

  /** boolean to handle the display of controls */
  @Input('showContent') showControlList: boolean;

  /** id from the parent step */
  @Input('parentStep') parentStep: Step;

  /** full test case object */
  @Input('testcase') testcase: TestCase;

  // the component doens't have access to the Action list
  // so it will call the addAction method from Step component
  @Output() actionAdded = new EventEmitter<number>();

  /** boolean to handle the action/control add buttons */
  private showActionAddButtons: boolean;

  /** boolean to handle the display of the action if it's focused in settings comp */
  private isFocused: boolean;

  /** HTML ID for this drag and drop area */
  public DragAndAdropAreaId: string;

  /** array of HTML IDs for all drag and drop areas */
  public DragAndDropControlIDList: Array<string>;

  // cross reference arrays to display the correct input fields according to the selected condition
  private crossReference_ActionValue: Array<ICrossReference> = this.CrossReferenceService.crossReference_ActionValue;
  private crossReference_ConditionValue: Array<ICrossReference> = this.CrossReferenceService.crossReference_ConditionValue;

  constructor(
    private CrossReferenceService: CrossreferenceService,
    private testcaseService: TestcaseService,
    private settingsService: SettingsService,
    private DragAndDropService: DraganddropService
  ) { }

  ngOnInit() {
    // by default, the add action/control buttons aren't showed
    this.showActionAddButtons = false;

    // generate a new unique id for this drag and drop area
    this.DragAndAdropAreaId = this.generateID();

    // get all the d&d area ids from the service
    this.DragAndDropService.observableControlsIdList.subscribe(r => { this.DragAndDropControlIDList = r; });

    // if there is no controls in this action
    if (this.action.controls.length === 0) { this.showControlList = false; } else { this.showControlList = true; }

    this.settingsService.observableAction.subscribe(r => {
      if (this.action === r) {
        this.isFocused = true;
      } else {
        this.isFocused = false;
      }
    });
  }

  /**
  * send the position for the new action to add to the parent component
  * @param index desired position of the action (sort)
  */
  addAction(index: number): void {
    this.actionAdded.emit(index);
  }

  /** add a new control in the action
  * @param index position of the desired control
  */
  addControl(index: number): void {
    // create the new control object (with default values)
    const newControl = new Control(this.testcase.test, this.testcase.testCase, index, this.parentStep.stepId, this.action.actionId);
    // insert the control at the correct index
    this.action.controls.splice(index, 0, newControl);
    // reorder the sort attributes
    this.testcaseService.refreshControlSort(this.action.controls);
    // force the control list to be displayed when adding a control
    this.showControlList = true;
  }

  /**
  * sends the action to the setting comp to display its information
  */
  focusOnAction(): void {
    // send the action to the settings service and thus, to the settings component
    this.settingsService.editActionSettings(this.action, this.readonly, this.parentStep.sort);
  }

  /**
  * on the drop of a control somewhere in the controls list
  * @event the event
  */
  dropControl(event: CdkDragDrop<Control[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.testcaseService.refreshControlSort(this.action.controls);
    // show the controls when dragging to an action without control
    if (this.showControlList === false) { this.showControlList = true; }
  }

  /**
  * generate a unique id (according to the service list) and adds it to the list
  */
  generateID(): string {
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

  /**
  * fired when the control is entered during a drag and drop action
  */
  controlEntered(): void {
    // make sure to show the controls when dragging a control from another list in the action
    if (this.showControlList === false) {
      this.showControlList = true;
    }
  }

  getDescriptionWidthClass(): string {
    if (!this.readonly) {
      if (this.showActionAddButtons) {
        return 'desc-collapsed-width';
      } else {
        return 'desc-full-width';
      }
    }
    return 'desc-full-width';
  }

}
