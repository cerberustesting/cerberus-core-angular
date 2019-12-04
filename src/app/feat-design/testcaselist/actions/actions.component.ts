import { Component, Input } from '@angular/core';
import { RunComponent } from '../../../shared/run/run.component';
import { SidecontentService } from '../../../core/services/crud/sidecontent.service';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {

  // the array with all the selected rows
  // the object type depends on the table (ex: test case)
  @Input() selectedRows: Array<any>;

  constructor(
    private sideContentService: SidecontentService
  ) { }

  // return the selected rows to the view
  // returns undefined if the array is empty
  getSelection(): Array<any> {
    if (this.selectedRows) {
      if (this.selectedRows.length > 0) {
        return this.selectedRows;
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  }

  debug() {
    console.log(this.selectedRows);
  }

  runTestCases(selectedRows) {
    this.sideContentService.addComponentToSideBlock(RunComponent, { testCases: selectedRows });
    this.sideContentService.openSideBlock();
  }
}
