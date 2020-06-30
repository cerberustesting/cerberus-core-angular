import { Component, OnInit, Input } from '@angular/core';
import { LabelHierarchyMode } from '../../../testcase-interaction/labels-tab/labels-tab.component';
import { Label } from 'src/app/shared/model/back/testcase/label.model';
import { SidecontentService } from 'src/app/core/services/api/sidecontent.service';

@Component({
  selector: 'app-massupdate-labels',
  templateUrl: './massupdate-labels.component.html',
  styleUrls: ['./massupdate-labels.component.scss']
})
export class MassupdateLabelsComponent implements OnInit {

  /** currently selected system */
  @Input() system: string;

  /** instance of the Mass Actions fields enumeration */
  public LabelHierarchyMode: typeof LabelHierarchyMode = LabelHierarchyMode;

  /** list of labels of selected labels, useless in this context, so keep it empty */
  public selectedLabelsList: Array<Label>;

  constructor(
    private sideContentService: SidecontentService
  ) {
    // set the selected labels to empty
    this.selectedLabelsList = new Array<Label>();
  }

  ngOnInit() { }

  /**
   * close the side block through the side content service
   */
  closeSideContent() {
    this.sideContentService.closeSideBlock();
  }

}
