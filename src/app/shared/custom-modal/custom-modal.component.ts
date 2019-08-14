import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.scss']
})
export class CustomModalComponent implements OnInit {

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
