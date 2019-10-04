import { Component, OnInit, Input } from '@angular/core';
import { SystemService } from 'src/app/core/services/crud/system.service';
import { LabelNode } from './label-node/label-node.component';

export class LabelHierarchy {
  stickers: Array<LabelNode>;
  requirements: Array<LabelNode>;
  batteries: Array<LabelNode>;
}

@Component({
  selector: 'app-labels-tab',
  templateUrl: './labels-tab.component.html',
  styleUrls: ['./labels-tab.component.scss']
})
export class LabelsTabComponent implements OnInit {

  // test and testcase
  @Input('test') test: string;
  @Input('testcase') testcase: string;
  @Input('system') system: string;

  // label hierarchy (selected & available to selection)
  public labelsList: any;
  public labelType: string;

  constructor(
    private systemService: SystemService) {
  }

  ngOnInit() {
    this.systemService.getLabelsHierarchyFromSystem(this.system, this.test, this.testcase);
    this.systemService.observableLabelsHierarchyList.subscribe(r => {
      this.labelsList = r;
      console.log(this.labelsList);
    });
    this.labelType = 'stickers';
  }

}
