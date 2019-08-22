import { Component, OnInit } from '@angular/core';
import { TestService } from '../../core/services/crud/test.service';
import { ITestCaseHeader } from '../../shared/model/testcase.model';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';
import { Column } from 'src/app/shared/model/column.model';
import { LabelfilteringPipe } from 'src/app/shared/pipes/labelfiltering.pipe';
import { Filter } from 'src/app/shared/model/filter.model';
import { SystemService } from 'src/app/core/services/crud/system.service';
import { FilterService } from 'src/app/core/services/crud/filter.service';
import { TestCasesColumnsData } from './testcaselist.columnsdata';
import { HeaderTitleService } from 'src/app/core/services/crud/header-title.service';
import { Subject } from 'rxjs';
import { SidecontentService } from 'src/app/core/services/crud/sidecontent.service';
import { NotificationService } from 'src/app/core/services/utils/notification.service';
import { NotificationStyle } from 'src/app/core/services/utils/notification.model';
import { TestcaseInteractionComponent, TESTCASE_INTERACTION_MODE } from './testcase-interaction/testcase-interaction.component';

@Component({
  selector: 'app-testcaselist',
  templateUrl: './testcaselist.component.html',
  styleUrls: ['./testcaselist.component.scss']
})
export class TestcaselistComponent implements OnInit {


  columns: Array<Column> = TestCasesColumnsData; // column list
  
  
  page = {
    size: 0, //maximum element per page
    number: 1, //number of current page
    sort: [{dir: "asc", prop : "testCase"}], //sort item
    totalCount: 0 //total count of element in database
  };
  selectedRows: Array<any> = [];
  servlet :string = '/ReadTestCase'

  userPreferences: string;
  
  constructor(
    private headerTitleService: HeaderTitleService,
    private sideContentService: SidecontentService,
    private NotificationService: NotificationService) { 
    this.headerTitleService.setTitle("Testcase List");
  }

  ngOnInit() {
  }
  
  editTestCaseHeader(testcase) {
    this.sideContentService.addComponentToSideBlock(TestcaseInteractionComponent, {
      testCase: testcase,
      mode: TESTCASE_INTERACTION_MODE.EDIT,
      // exit: () => {
      //   this.NotificationService.createANotification('The datalib has been successfully edited', NotificationStyle.Success);
      // }
    });
    this.sideContentService.openSideBlock();
  }

  

}
