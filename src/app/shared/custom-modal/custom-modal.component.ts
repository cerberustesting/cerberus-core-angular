import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
declare function ElementFadeIn(elementId, delay);

export enum ModalType {
  Confirm = 'confirm',
  Error = 'error'
}

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.scss']
})
export class CustomModalComponent implements OnInit {

  /** first heading of the modal */
  @Input() title: string;

  /** subtitle of the text  */
  @Input() subtitle: string;

  /** additionnal subtitle of the text  */
  @Input() subtitle2: string;

  /** list of items to display */
  @Input() itemsList: any[];

  /** type of the modal that results in different template */
  @Input() modalType: ModalType;

  /** in confirm modal type, callback function when the user confirm his choice */
  @Input() confirmFunction: (n: void) => void;

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
  confirm() {
    this.confirmFunction();
    this.activeModal.close('confirm');
  }

  /**
   * close the modal with 'cancel' reason
   */
  close() {
    if (this.modalType === ModalType.Confirm) {
      this.activeModal.close('cancel');
    } else if (this.modalType === ModalType.Error) {
      this.activeModal.close('confirm');
    }
  }

}
