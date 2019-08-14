import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-warning-modal',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.scss']
})
export class WarningModalComponent implements OnInit {

  @Input() title:string;
  @Input() text: string;
  @Input() fct: (n: void)=>void;

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }
  do() {
    this.fct();
    this.activeModal.close('Continue click');
  }

}
