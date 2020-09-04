import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
declare function ElementFadeIn(elementId, delay);

/**
 * type of modal (used for the view)
 */
export enum ModalType {
  Confirm = 'confirm',
  Error = 'error'
}

/**
 * type of items in the list of items for this modal
 */
export enum CustomModalItemsType {
  Step = 'step',
  TestCaseDifferences = 'tcdiff'
}

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.scss']
})
export class CustomModalComponent implements OnInit {

  /** HTML id to identify the modal */
  @Input() modalId: string;

  /** first heading of the modal */
  @Input() title: string;

  /** subtitle of the text  */
  @Input() subtitle: string;

  /** additionnal subtitle of the text  */
  @Input() subtitle2: string;

  /** list of items to display */
  @Input() itemsList: any[];

  /** type of the items in the itemsList variable */
  @Input() itemsType: CustomModalItemsType;

  /** type of the modal that results in different template */
  @Input() modalType: ModalType;

  /** in confirm modal type, callback function when the user confirm his choice */
  @Input() confirmFunction: (n: void) => void;

  /** instance of the Items Type enumeration */
  public ItemsType: typeof CustomModalItemsType = CustomModalItemsType;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    // three layers of animations
    ElementFadeIn('icon', 1);
    ElementFadeIn('content', 500);
    ElementFadeIn('actions', 1000);
  }

  /**
   * confirm the action to be done
   */
  confirm(): void {
    this.confirmFunction();
    this.activeModal.close('confirm');
  }

  /**
   * close the modal with 'cancel' reason
   */
  close(): void {
    if (this.modalType === ModalType.Confirm) {
      this.activeModal.close('cancel');
    } else if (this.modalType === ModalType.Error) {
      this.activeModal.close('confirm');
    }
  }

}
