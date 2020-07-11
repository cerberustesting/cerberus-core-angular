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
  @Input('labelslist') selectedLabelsList: Array<Label>;

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
  isTheLabelSelected(labelname: string): boolean {
    const res = this.selectedLabelsList.find(label => label.label === labelname);
    if (res !== undefined) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * add or remove a label on the selected labels list
   * @param labelnode node in the hierarchy to toggle
   */
  toggleLabel(labelnode: LabelNode): void {
    // if the label is not already selected
    if (!this.isTheLabelSelected(labelnode.label.label)) {
      // add the label to the selected labels list
      // DIRTY: remap the object since the id isn't present at a label level...
      this.selectedLabelsList.push(this.formatLabel(labelnode.label, labelnode.id));
    } else {
      // remove the label from the selected labels list
      const index = this.selectedLabelsList.findIndex(label => label.label === labelnode.label.label);
      this.selectedLabelsList.splice(index, 1);
    }
  }

  /**
   * DIRTY : return a correct label (with it id)
   * @param label object from the hierarchy
   * @param id id to add (found in the upper level)
   */
  formatLabel(label: Label, id: number): Label {
    const newLabel: Label = label;
    newLabel.id = id;
    return newLabel;
  }

}
