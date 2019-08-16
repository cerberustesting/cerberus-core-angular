import { Component, OnInit, NgModule, Input } from '@angular/core';
import {RunComponent} from '../../../run/run.component';
import {SidecontentService} from '../../../../core/services/crud/sidecontent.service';


@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  @Input() selectedRows: Array<any>;


  constructor(
      private sideContentService: SidecontentService
  ) { }

  ngOnInit() {
  }

  runTestCases(selectedRows) {
    this.sideContentService.addComponentToSideBlock(RunComponent, {testCases: selectedRows});
    this.sideContentService.openSideBlock();
  }
}
