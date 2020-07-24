import { Component, OnInit, ViewChild } from '@angular/core';
import { Column } from 'src/app/shared/model/front/column.model';
import { TestFoldersColumnsData } from 'src/app/feat-design/testfolders/testfolders.columnsdata';
import { TestFolder } from 'src/app/shared/model/back/testfolder/test.model';
import { Subject } from 'rxjs';
import { DatatablePageComponent } from 'src/app/shared/datatable-page/datatable-page.component';
import { HeaderTitleService } from 'src/app/core/services/utils/header-title.service';
import { SidecontentService, INTERACTION_MODE } from 'src/app/core/services/api/sidecontent.service';
import { TestfolderInteractionComponent } from './testfolder-interaction/testfolder-interaction.component';

@Component({
  selector: 'app-testfolders',
  templateUrl: './testfolders.component.html',
  styleUrls: ['./testfolders.component.scss']
})
export class TestfoldersComponent implements OnInit {

  /** list of columns (defined on a another file: `testcaselist.columnsdata.ts`) */
  public columns: Array<Column> = TestFoldersColumnsData;

  /** default sort direction and property */
  public defaultPageSort = [{ dir: 'asc', prop: 'test' }];

  public selectedRows: Array<TestFolder> = [];

  /** API endpoint to fetch the table information */
  public servlet: string;

  /** the observable to refresh the table */
  public refreshResultsEvent: Subject<void> = new Subject<void>();

  /** child datatable component */
  @ViewChild(DatatablePageComponent, { static: false }) private datatablepageComponent: DatatablePageComponent;

  constructor(
    private headerTitleService: HeaderTitleService,
    private sideContentService: SidecontentService
  ) { }

  ngOnInit() {
    this.servlet = '/ReadTest';
    this.headerTitleService.setTitle('Testcase List', 'tcList');
  }

  /**
  * refresh datatable results
  */
  refreshResults(): void {
    this.refreshResultsEvent.next();
  }

  /**
  * open the side content in creation mode
  */
  createTestFolder(): void {
    this.sideContentService.addComponentToSideBlock(TestfolderInteractionComponent, {
      mode: INTERACTION_MODE.CREATE,
      testfolder: new TestFolder(),
      exit: () => {
        this.refreshResults();
      }
    });
    this.sideContentService.openSideBlock();
  }

  /**
   * open the side content in edition mode with the test folder object to edit
   * @param testfolder object to edit
   */
  editTestFolder(testfolder: TestFolder): void {
    this.sideContentService.addComponentToSideBlock(TestfolderInteractionComponent, {
      mode: INTERACTION_MODE.EDIT,
      testfolder: testfolder,
      exit: () => {
        this.refreshResults();
      }
    });
    this.sideContentService.openSideBlock();
  }

  // TODO
  deleteTestFolder(testfolder: TestFolder): void {
    console.log('TODO..');
  }
}
