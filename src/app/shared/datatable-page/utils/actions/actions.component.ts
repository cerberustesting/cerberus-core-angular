import { Component, OnInit, NgModule, Input } from '@angular/core';


@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  @Input() selectedRows: number;


  constructor() { }

  ngOnInit() {
  }

}
