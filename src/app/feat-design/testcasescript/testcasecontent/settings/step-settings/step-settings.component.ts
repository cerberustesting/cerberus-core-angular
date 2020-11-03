import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Invariant } from 'src/app/shared/model/back/invariant/invariant.model';
import { InvariantsService } from 'src/app/core/services/api/invariants.service';
import { Step } from 'src/app/shared/model/back/testcase/step.model';
import { ICrossReference, CrossreferenceService } from 'src/app/core/services/utils/crossreference.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomModalComponent, ModalType } from 'src/app/shared/custom-modal/custom-modal.component';
import { TestcaseService } from 'src/app/core/services/api/testcase/testcase.service';
import { TestCase } from 'src/app/shared/model/back/testcase/testcase.model';

@Component({
  selector: 'app-step-settings',
  templateUrl: './step-settings.component.html',
  styleUrls: ['./step-settings.component.scss']
})
export class StepSettingsComponent implements OnInit, OnChanges {

  /** step object */
  @Input('step') step: Step;

  /** full testcase object */
  @Input('testcase') testcase: TestCase;

  /** list of condition operators (private invariants) */
  public conditionsOperators: Array<Invariant>;

  /** list of loop operators (private invariants) */
  public stepLoopOperators: Array<Invariant>;

  /** list of use step (relevant if step.inLibrary is true) */
  private listOfUseSteps: Array<Step> = [];

  constructor(
    private InvariantService: InvariantsService,
    private CrossReferenceService: CrossreferenceService,
    private testcaseService: TestcaseService,
    private modalService: NgbModal
  ) { }

  /**
   * catch any changes in the inputted step
   * @param changes simple changes
   */
  ngOnChanges(changes: SimpleChanges) {
    this.refreshStepContent();
  }

  ngOnInit() {
    // get the invariants
    this.InvariantService.observableConditionOperList.subscribe(response => { this.conditionsOperators = response; });
    this.InvariantService.observableStepLoopList.subscribe(response => { this.stepLoopOperators = response; });
  }

  /**
   * refresh data that needs to be refreshed when the content change
   * necessary since the component isn't destroyed if the user switch from step to step
   */
  refreshStepContent() {
    if (this.step.isLibraryStep === true) {
      this.testcaseService.getUseStepForALibraryStep(this.step.test, this.step.testcase, this.step.stepId, (stepList: Step[]) => {
        this.listOfUseSteps = stepList;
      });
    }
  }

  /**
   * open a confirmation modal for the user to confirm its choice
   */
  unlinkStep(): void {
    const modalRef = this.modalService.open(CustomModalComponent);
    modalRef.componentInstance.title = 'Unlink Step?';
    modalRef.componentInstance.subtitle = 'Do you want to unlink this step?';
    modalRef.componentInstance.subtitle2 = 'Your test case will be saved right away';
    modalRef.componentInstance.modalType = ModalType.Confirm;
    modalRef.componentInstance.confirmFunction = () => {
      this.step.isUsingLibraryStep = false;
      this.step.readonly = false;
      this.step.libraryStepTest = undefined;
      this.step.libraryStepTestcase = undefined;
      this.step.libraryStepStepId = undefined;
      this.testcaseService.saveTestCase(this.testcase, (response: any) => {
        console.log(response);
      });
    };
  }

  /**
   * remove the step from the library if it's not used by any other test case,
   * open an error modal if it does
   */
  removeStepFromLibrary(): void {
    if (this.listOfUseSteps.length > 0) {
      const modalRef = this.modalService.open(CustomModalComponent);
      modalRef.componentInstance.title = 'Nope';
      modalRef.componentInstance.subtitle = 'This step is used in other test case(s)';
      modalRef.componentInstance.itemsList = this.listOfUseSteps;
      modalRef.componentInstance.modalType = ModalType.Error;
    } else {
      this.step.isLibraryStep = false;
    }
  }

  /**
   * add the current step to the library
   */
  addToLibrary(): void {
    this.step.isUsingLibraryStep = false;
    this.step.isLibraryStep = true;
  }

  /**
  * return true if the condition has a cross reference object
  * @param condition condition operator to check
  */
  hasConditionCrossReference(condition: string): boolean {
    return this.CrossReferenceService.hasCrossReference(condition, this.CrossReferenceService.crossReference_ConditionValue);
  }

  /**
  * return the cross reference object for a condition
  * @param condition condition operator to filter on
  */
  findConditionCrossReference(condition: string): ICrossReference {
    return this.CrossReferenceService.findCrossReference(condition, this.CrossReferenceService.crossReference_ConditionValue);
  }

  /**
   * toggle the step forced execution attribute
   */
  toggleForceExecution() {
    this.step.isExecutionForced = !this.step.isExecutionForced;
  }
}
