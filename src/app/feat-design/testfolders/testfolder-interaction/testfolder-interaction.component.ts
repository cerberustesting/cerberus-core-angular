import { Component, OnInit } from '@angular/core';
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

  // mode to interact with the test case header (mandatory)
  private mode: INTERACTION_MODE;

  // test folder object (mandatory)
  private testfolder: TestFolder;

  // inital name of the test folder object when the component is created
  private initialTestFolderName: string;

  // form that is submitted to to the API
  public testFolderForm: FormGroup;

  // title for save button (different according to the mode)
  private saveButtonTitle: string;

  // tests folder list used to compare with the test folder one (check existence)
  public testfolders: Array<TestFolder>;

  /** instance of the interaction mode fields enumeration */
  public InteractionMode: typeof INTERACTION_MODE = INTERACTION_MODE;

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

    // test folder object sanitizing
    if (this.testfolder && this.mode) {
      this.setFormValues();
    } else {
      console.error('error with compononent initialization, please open an issue in github : https://github.com/cerberustesting/cerberus-angular/issues/new?assignees=&labels=bug&template=bug_report.md');
    }

    // save the initial name of the test folder
    this.initialTestFolderName = this.testfolder.test;
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
    if (!values.test || values.test === '') {
      this.notificationService.createANotification('Please specify the Test Folder Name', NotificationStyle.Warning);
      return;
    }

    // trigger the correct API endpoint
    if (this.mode === INTERACTION_MODE.CREATE) {
      this.testService.createTestFolder(values, (response: any) => {
        this.notificationService.cerberusAPINotification(response.messageType, response.message);
        this.closeSideContent();
      });
    } else if (this.mode === INTERACTION_MODE.EDIT) {
      this.testService.updateTestFolder(this.initialTestFolderName, values, (response: any) => {
        this.notificationService.cerberusAPINotification(response.messageType, response.message);
        this.closeSideContent();
      });
    }
  }

  /**
   * close the sidecontent through the service
   */
  closeSideContent(): void {
    this.sidecontentService.closeSideBlock();
    this.exit();
  }

  /**
   * return the list of fields that have been changed during the edition
   */
  getTestFolderDifferences(): string[] {
    const differentFields = new Array<string>();
    if (this.testfolder.test !== this.testFolderForm.get('test').value) { differentFields.push('test'); }
    if (this.testfolder.active !== this.testFolderForm.get('active').value) { differentFields.push('active'); }
    if (this.testfolder.description !== this.testFolderForm.get('description').value) { differentFields.push('description'); }
    return differentFields;
  }

  /**
   * function mandatory since this component is displayed in the side content
   * return true if this component can be removed without warning, false otherwise
   * @param newComponent new component to replace the test folder one with
   * @param parameters parameters attached with the compononent change request
   */
  sideContentInterruption(newComponent: any, parameters: {}): boolean {
    if (this.getTestFolderDifferences().length === 0) {
      return true;
    } else {
      // open a confirmation modal
      const modalRef = this.NgbModalService.open(CustomModalComponent);
      modalRef.componentInstance.title = 'Are you sure ?';
      modalRef.componentInstance.subtitle = 'You\'re about to lost your changes in the side content';
      modalRef.componentInstance.itemsList = this.getTestFolderDifferences();
      modalRef.componentInstance.modalType = ModalType.Confirm;
      modalRef.componentInstance.itemsType = CustomModalItemsType.TestCaseDifferences;
      modalRef.componentInstance.confirmFunction = function () {
        // open the new component to open
        this.sideContentService.addComponentToSideBlock(newComponent, parameters, true);
      };
      return false;
    }
  }

  /**
   * return true if the test folder name is already used by another folder
   * @param testfoldername name to check
   */
  testFolderNameExists(testfoldername: string): boolean {
    if (this.testfolders.find(testfolder => testfolder.test === testfoldername) && testfoldername !== this.testfolder.test) {
      return true;
    } else {
      return false;
    }
  }
}
