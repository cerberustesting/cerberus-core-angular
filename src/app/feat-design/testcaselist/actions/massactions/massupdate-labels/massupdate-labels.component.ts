import { Component, OnInit, Input } from '@angular/core';
import { LabelHierarchyMode } from '../../../testcase-interaction/labels-tab/labels-tab.component';
import { Label } from 'src/app/shared/model/back/testcase/label.model';
import { SidecontentService } from 'src/app/core/services/api/sidecontent.service';
import { LabelService } from 'src/app/core/services/api/label/label.service';
import { TestCase } from 'src/app/shared/model/back/testcase/testcase.model';
import { NotificationService } from 'src/app/core/services/utils/notification.service';
import { NotificationStyle } from 'src/app/core/services/utils/notification.model';
import { CRUD } from 'src/app/shared/model/front/utils.model';

@Component({
  selector: 'app-massupdate-labels',
  templateUrl: './massupdate-labels.component.html',
  styleUrls: ['./massupdate-labels.component.scss']
})
export class MassupdateLabelsComponent implements OnInit {

  /** currently selected system */
  @Input() system: string;

  /** items currently selected in the table */
  @Input('selectedTestCases') selectedTestCases: TestCase[];

  /** instance of CRUD enumeration (to use in view) */
  public CRUD: typeof CRUD = CRUD;

  /** instance of the Mass Actions fields enumeration */
  public LabelHierarchyMode: typeof LabelHierarchyMode = LabelHierarchyMode;

  /** list of labels of selected labels, useless in this context, so keep it empty */
  public selectedLabelsList: Array<Label>;

  constructor(
    private sideContentService: SidecontentService,
    private labelService: LabelService,
    private notificationService: NotificationService
  ) {
    // set the selected labels to empty
    this.selectedLabelsList = new Array<Label>();
  }

  ngOnInit() { }

  /**
   * close the side block through the side content service
   */
  closeSideContent(): void {
    this.sideContentService.closeSideBlock();
  }

  /**
   * calls the service method to update labels massively
   * @param labels list of labels to update
   * @param method update or delete
   */
  massUpdateLabels(labels: Label[], method: CRUD): void {
    this.labelService.massUpdateTestCaseLabels(labels, this.selectedTestCases, method, (response) => {
      this.afterMassUpdateNotification(response);
    });
  }

  /**
   * create a notification according to the api response
   * @param response api response
   */
  afterMassUpdateNotification(response: any): void {
    if (response.messageType === 'WARNING') {
      this.notificationService.createANotification(response.message, NotificationStyle.Warning);
      this.sideContentService.closeSideBlock();
    } else if (response.messageType === 'OK') {
      this.notificationService.createANotification(response.message, NotificationStyle.Success);
      this.sideContentService.closeSideBlock();
    } else {
      this.notificationService.createANotification(response.message, NotificationStyle.Error);
      this.sideContentService.closeSideBlock();
    }
  }

}
