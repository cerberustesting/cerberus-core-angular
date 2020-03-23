import { Component, OnInit, Input } from '@angular/core';
import { Label } from 'src/app/shared/model/back/testcase/label.model';

export class LabelNode {
  nodes: Array<LabelNode>;
  selectable: boolean;
  id: number;
  label: Label;
  state: {
    selected: boolean;
  };
}

@Component({
  selector: 'app-label-node',
  templateUrl: './label-node.component.html',
  styleUrls: ['./label-node.component.scss']
})
export class LabelNodeComponent implements OnInit {

  /** label node from the test case hierarchy */
  @Input('node') node: LabelNode;
  /** list of currently selected labels for the test case */
  @Input('labelslist') selectedLabelsList: Array<any>;

  /** boolean that handle the display of the children nodes */
  public showChildren: boolean;

  constructor() { }

  ngOnInit() {
    this.showChildren = true;
  }

  /** hide/show the children labels */
  toggleChildren(): void {
    if (this.node.nodes) {
      this.showChildren = !this.showChildren;
    }
  }

  /** return true if the label is selected for the testcase */
  isTheNodeSelected(labelname: string): boolean {
    const res = this.selectedLabelsList.find(label => label.label === labelname);
    if (res !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  /** add the label to the testcase selection */
  toggleLabel(label: Label): void {
    this.selectedLabelsList.push(label);
  }

}
