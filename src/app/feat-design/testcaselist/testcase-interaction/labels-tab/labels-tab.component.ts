import { Component, OnInit, Input } from '@angular/core';
import { SystemService } from 'src/app/core/services/api/system.service';
import { LabelNode } from './label-node/label-node.component';
import { Label } from 'src/app/shared/model/back/testcase/label.model';

export class LabelHierarchy {
  stickers: Array<LabelNode>;
  requirements: Array<LabelNode>;
  batteries: Array<LabelNode>;
}

/**
 * type of usage of this component depending on the context
 */
export enum LabelHierarchyMode {
  MassUpdate = 'massupdate',
  TestCaseHeader = 'tcHeader'
}

/**
 * label object that is sent to UpdateTestCase servlet
 */
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

  /** type of usage for the label hierarchy (edit test case header or mass update) */
  @Input('mode') mode: LabelHierarchyMode;

  // test and testcase used to get the available labels list
  @Input('test') test: string;
  @Input('testcase') testcase: string;

  // selected labels list
  @Input('selectedlabels') selectedLabelsList: Array<Label>;

  // system of the test case
  @Input('system') system: string;

  // label hierarchy (selected & available to selection)
  public labelsList: any;

  // current label type selected (tabs)
  public labelType: string;

  /** instance of the Label Hierarchy Mode enumeration */
  public LabelHierarchyMode: typeof LabelHierarchyMode = LabelHierarchyMode;

  constructor(
    private systemService: SystemService) {
    this.labelsList = undefined;
  }

  ngOnInit() {
    if (this.mode === LabelHierarchyMode.TestCaseHeader) {
      this.systemService.getLabelsHierarchyFromSystem(this.system, (labels: any) => {
        this.labelsList = labels;
      }, this.test, this.testcase);
    } else if (this.mode === LabelHierarchyMode.MassUpdate) {
      this.systemService.getLabelsHierarchyFromSystem(this.system, (labels: any) => {
        this.labelsList = labels;
        console.log(this.labelsList);
      });
    }

    // default tab
    this.labelType = 'stickers';
  }

}
