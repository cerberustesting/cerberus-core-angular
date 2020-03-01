import { Component, OnInit, Input } from '@angular/core';
import { ILabel } from 'src/app/shared/model/label.model';

export class LabelNode {
  nodes: Array<LabelNode>;
  selectable: boolean;
  id: number;
  label: ILabel;
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

  @Input('node') node: LabelNode;
  @Input('labelslist') selectedLabelsList: Array<any>;

  public showChildren: boolean;

  constructor() { }

  ngOnInit() {
    this.showChildren = true;
  }

  toggleChildren() {
    if (this.node.nodes) {
      this.showChildren = !this.showChildren;
    }
  }

  isTheNodeSelected(labelname: string) {
    return this.selectedLabelsList.find(label => label.label.label === labelname);
  }

  toggleLabel(labelname: string) {
    this.selectedLabelsList.push(labelname);
  }

}
