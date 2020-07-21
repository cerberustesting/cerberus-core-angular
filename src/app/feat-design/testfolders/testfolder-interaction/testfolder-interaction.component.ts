import { Component, OnInit } from '@angular/core';
import { InvariantsService } from 'src/app/core/services/api/invariants.service';
import { SystemService } from 'src/app/core/services/api/system.service';
import { TestcaseService } from 'src/app/core/services/api/testcase/testcase.service';
import { TestFolder } from 'src/app/shared/model/back/testfolder/test.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/utils/notification.service';
import { NotificationStyle } from 'src/app/core/services/utils/notification.model';
import { SidecontentService, INTERACTION_MODE } from 'src/app/core/services/api/sidecontent.service';
import { TestService } from 'src/app/core/services/api/test/test.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomModalComponent, ModalType, CustomModalItemsType } from 'src/app/shared/custom-modal/custom-modal.component';

@Component({
  selector: 'app-testfolder-interaction',
  templateUrl: './testfolder-interaction.component.html',
  styleUrls: ['./testfolder-interaction.component.scss']
})
export class TestfolderInteractionComponent implements OnInit {

  // mode to interact with the test case header
  private mode: INTERACTION_MODE;

  // testcase header object (can be refreshed by test and test folder variables)
  private testfolder: TestFolder;

  // inital name of the test folder object when the component is created
  private initialTestFolderName: string;

  // form that is submitted to to the API
  public testFolderForm: FormGroup;

  // title for save button (different according to the mode)
  private saveButtonTitle: string;

  // tests folder list used for Test & Test case folder section
  private testfolders: Array<TestFolder>;

  // ???
  exit: (n: void) => void;

  constructor(
    private formBuilder: FormBuilder,
    private testService: TestService,
    private notificationService: NotificationService,
    private sidecontentService: SidecontentService,
    private NgbModalService: NgbModal) {
    this.testfolder = undefined;
  }

  ngOnInit() {
    // refresh the test folders list (done only once)
    this.testService.getTestFolders((testfolders: TestFolder[]) => { this.testfolders = testfolders; });

    // set the correct title for the save button (depending on the mode)
    this.saveButtonTitle = this.sidecontentService.getsaveButtonTitle(this.mode);

    // save the initial name of the test folder
    this.initialTestFolderName = this.testfolder.test;

    // creation mode
    if (this.mode === INTERACTION_MODE.CREATE) {

      // set a new the test folder
      this.testfolder = new TestFolder();

    } else if (this.mode === INTERACTION_MODE.EDIT) {

      this.setFormValues();

    } else {
      console.error('test folder and test case not found, please open an issue in github : https://github.com/cerberustesting/cerberus-angular/issues/new?assignees=&labels=bug&template=bug_report.md');
    }
  }

  /** transform boolean to 'Y' or 'N' string  */
  toCerberusString(raw: boolean): string {
    if (raw === true) {
      return 'Y';
    } else {
      return 'N';
    }
  }

  /**
   * set the form values with the testcaseheader one
  */
  setFormValues(): void {
    this.testFolderForm = this.formBuilder.group({
      test: this.testfolder.test,
      description: this.testfolder.description,
      active: this.testfolder.active,
      userCreated: this.testfolder.usrCreated,
      dateCreated: this.testfolder.dateCreated,
      userModified: this.testfolder.usrModif,
      dateModified: this.testfolder.dateModif
    });
  }

  /**
   * send the form value to the API
   * @param values form values
   */
  onSubmit(values: any): void {

    // if no test folder name id is set
    if (!values.test) {
      this.notificationService.createANotification('Please specify the Test Folder Name', NotificationStyle.Warning);
      return;
    }

    // trigger the correct API endpoint
    if (this.mode === INTERACTION_MODE.CREATE) {
      // this.testService.createTestCase(queryString).subscribe(rep => this.refreshTable());
    } else {
      this.testService.updateTestFolder(this.initialTestFolderName, values, (response: any) => {
        console.log(response);
      });

    }
  }

  // ??
  refreshTable(): void {
    this.sidecontentService.closeSideBlock();
    this.exit();
  }

  // cancel the current interaction and close the side content
  closeSideContent(): void {
    this.sidecontentService.closeSideBlock();
  }

  /**
   * return the list of fields that have been changed during the edition
   */
  getTestCaseDifferences(): string[] {
    const differentFields = new Array<string>();
    if (this.testfolder.test !== this.testFolderForm.get('test').value) { differentFields.push('test'); }
    return differentFields;
  }

  /**
   * function mandatory since this component is displayed in the side content
   * return true if this component can be removed without warning, false otherwise
   */
  sideContentInterruption(newComponent: any, parameters: {}): boolean {
    if (this.getTestCaseDifferences().length === 0) {
      return true;
    } else {
      // open a confirmation modal
      const modalRef = this.NgbModalService.open(CustomModalComponent);
      modalRef.componentInstance.title = 'Are you sure ?';
      modalRef.componentInstance.subtitle = 'You\'re about to lost your changes in the side content';
      modalRef.componentInstance.itemsList = this.getTestCaseDifferences();
      modalRef.componentInstance.modalType = ModalType.Confirm;
      modalRef.componentInstance.itemsType = CustomModalItemsType.TestCaseDifferences;
      modalRef.componentInstance.confirmFunction = function () {
        // open the new component to open
        this.sideContentService.addComponentToSideBlock(newComponent, parameters, true);
      };
      return false;
    }
  }
}
