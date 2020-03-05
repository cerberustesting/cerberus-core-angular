import { Component, OnInit, Input } from '@angular/core';
import { SystemService } from 'src/app/core/services/api/system.service';
import { LabelNode } from './label-node/label-node.component';
import { Label } from 'src/app/shared/model/back/label.model';

export class LabelHierarchy {
  stickers: Array<LabelNode>;
  requirements: Array<LabelNode>;
  batteries: Array<LabelNode>;
}

// label object that is sent to UpdateTestCase servlet
export class SelectedLabel {
  labelId: number;
  toDelete: boolean;

  constructor(id: number, todelete: boolean) {
    this.labelId = id;
    this.toDelete = todelete;
  }
}

@Component({
  selector: 'app-labels-tab',
  templateUrl: './labels-tab.component.html',
  styleUrls: ['./labels-tab.component.scss']
})
export class LabelsTabComponent implements OnInit {

  // test and testcase used to get the available labels list
  @Input('test') test: string;
  @Input('testcase') testcase: string;

  // selected labels list
  @Input('selectedlabels') selectedLabelsList: Array<Label>;

  // system of the test case
  @Input('system') system: string;

  // label hierarchy (selected & available to selection)
  public labelsList: any;
  public labelType: string;

  constructor(
    private systemService: SystemService) {
    this.labelsList = undefined;
  }

  ngOnInit() {
    this.systemService.getLabelsHierarchyFromSystem(this.system, this.test, this.testcase);
    this.systemService.observableLabelsHierarchyList.subscribe(r => {
      this.labelsList = r;
    });
    // default tab
    this.labelType = 'stickers';
  }

  // TODO : maybe refresh the labels hierarchy at every component

}
