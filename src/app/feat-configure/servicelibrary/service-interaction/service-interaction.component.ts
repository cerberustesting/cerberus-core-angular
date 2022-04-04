import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/shared/model/back/servicelibrary/servicelibrary.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/utils/notification.service';
import { NotificationStyle } from 'src/app/core/services/utils/notification.model';
import { SidecontentService, INTERACTION_MODE } from 'src/app/core/services/api/sidecontent.service';
import { ServiceLibraryService } from 'src/app/core/services/api/servicelibrary/servicelibrary.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomModalComponent, ModalType, CustomModalItemsType } from 'src/app/shared/custom-modal/custom-modal.component';
import { NotificationID } from 'src/app/shared/notifications/notifications.data';
import { Application } from 'src/app/shared/model/back/application/application.model';
import { SystemService } from 'src/app/core/services/api/system.service';
import { UserService } from 'src/app/core/services/api/user.service';
import { InvariantsService, InvariantName } from 'src/app/core/services/api/invariants.service';

@Component({
  selector: 'app-service-interaction',
  templateUrl: './service-interaction.component.html',
  styleUrls: ['./service-interaction.component.scss']
})
export class ServiceInteractionComponent implements OnInit {

  // mode to interact with the test case header (mandatory)
  private mode: INTERACTION_MODE;

  // service object (mandatory)
  private service: Service;

  // inital name of the service object when the component is created
  private initialServiceName: string;

  // form that is submitted to the API
  public serviceForm: FormGroup;

  // title for save button (different according to the mode)
  private saveButtonTitle: string;

  // service list used to compare with the service one (check existence)
  public services: Array<Service>;

  // service list used for applications select
  public applications: Array<Application>;

  /** instance of the interaction mode fields enumeration */
  public InteractionMode: typeof INTERACTION_MODE = INTERACTION_MODE;

  // ???
  exit: (n: void) => void;

  constructor(
    private formBuilder: FormBuilder,
    private serviceLibraryService: ServiceLibraryService,    
    private systemService: SystemService,
    private notificationService: NotificationService,
    private sidecontentService: SidecontentService,
    private NgbModalService: NgbModal,
    private userService: UserService,
    private invariantsService: InvariantsService) {
    this.service = undefined;
  }

  ngOnInit() {

    let name : InvariantName;
    name = InvariantName.action;

    this.getEntitiesData();

    // set the correct title for the save button (depending on the mode)
    this.saveButtonTitle = this.sidecontentService.getsaveButtonTitle(this.mode);

    // service object sanitizing
    if (this.service && this.mode) {
      this.setFormValues();
    } else {
      console.error('error with component initialization, please open an issue in github : https://github.com/cerberustesting/cerberus-angular/issues/new?assignees=&labels=bug&template=bug_report.md');
      return;
    }

    // save the initial name of the service
    this.initialServiceName = this.service.service;
    
    switch (this.mode) {
      case INTERACTION_MODE.CREATE:
        this.prepareForCreateMode();
        break;
    
      default:
        break;
    }
  }
  getEntitiesData() {
    // refresh the service libraries list (done only once)   
    this.serviceLibraryService.getServices((services: Service[]) => { this.services = services; });

    // get other data
    this.systemService.getApplicationList(applications => {this.applications = applications;}, undefined, undefined);// TODO  this.userService.user.defaultSystem

    // get service types and methods invariants, only if doesn't exist yet
    if(!this.invariantsService.serviceTypeList){
      this.invariantsService.getServiceTypeList();
    }
    if(!this.invariantsService.serviceMethodList){
      this.invariantsService.getServiceMethodList();
    }
  }
  prepareForCreateMode() {

        /*

    feedAppServiceModal(service, "editSoapLibraryModal", "ADD");
    listennerForInputTypeFile('#editSoapLibraryModal')
    pasteListennerForClipboardPicture('#editSoapLibraryModal');
    $('#service').val("");*/
    
  }

  showServiceRequest():boolean {
    if (this.isGETMethod() && this.isFTPType()) {
      return false;
    }
    return true;
  }

  showMethod(methodValue : string):boolean {
    if (this.isFTPType() && methodValue != "GET" && methodValue != "POST") {
      return false;
    }
    if (this.isKAFKAType() && methodValue != "SEARCH" && methodValue != "PRODUCE") {
      return false;
    }
    return true;
  }

  isGETMethod():boolean {
    return this.serviceForm.get('method').value === "GET";
  }

  isSOAPType():boolean {
    return this.serviceForm.get('type').value === "SOAP";
  }

  isFTPType():boolean {
    return this.serviceForm.get('type').value === "FTP";
  }

  isKAFKAType():boolean {
    return this.serviceForm.get('type').value === "KAFKA";
  }

  isRESTType():boolean {
    return this.serviceForm.get('type').value === "REST"
  }

  /**
   * set the form values
  */
  setFormValues(): void {

    // default values on create mode
    if (this.mode === INTERACTION_MODE.CREATE) {
      this.service.type = "REST";
      this.service.method = "GET";
      this.service.isFollowRedir = true;
    }

    this.serviceForm = this.formBuilder.group({
      service: this.service.service,
      application: this.service.application,
      type: this.service.type,
      method: this.service.method,
      servicePath: this.service.servicePath,
      description: this.service.description,
      operation: this.service.operation,
      kafkaTopic: this.service.kafkaTopic,
      kafkaFilterPath: this.service.kafkaFilterPath,
      kafkaFilterValue: this.service.kafkaFilterValue,
      kafkaKey: this.service.kafkaKey,
      isFollowRedir: this.service.isFollowRedir,
      group: this.service.group,
      attachmentURL: this.service.attachementurl,
      contentList: this.service.contentList,
      headerList: this.service.headerList,
      srvRequest: this.service.srvRequest
    });
  }

  /**
   * send the form value to the API
   * @param values form values
   */
  onSubmit(values: any): void {

    // if no service name is set
    if (!values.service || values.service === '') {
      this.notificationService.createANotification('Please specify the Service Name', NotificationStyle.Warning);
      return;
    } 

    // trigger the correct API endpoint
    if (this.mode === INTERACTION_MODE.CREATE) {
      this.serviceLibraryService.createService(values, (response: any) => {
        this.notificationService.cerberusAPINotification(response.messageType, response.message, NotificationID.serviceInteraction);
        this.closeSideContent();
      });
    } else if (this.mode === INTERACTION_MODE.EDIT) {
      this.serviceLibraryService.updateService(this.initialServiceName, values, (response: any) => {
        this.notificationService.cerberusAPINotification(response.messageType, response.message, NotificationID.serviceInteraction);
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
  getServiceDifferences(): string[] {
    const differentFields = new Array<string>();
    if (this.service.service !== this.serviceForm.get('service').value) { differentFields.push('service'); }
    if (this.service.type !== this.serviceForm.get('type').value) { differentFields.push('type'); }
    if (this.service.description !== this.serviceForm.get('description').value) { differentFields.push('description'); }
    return differentFields;
    // TODO
  }

  /**
   * function mandatory since this component is displayed in the side content
   * return true if this component can be removed without warning, false otherwise
   * @param newComponent new component to replace the service one with
   * @param parameters parameters attached with the compononent change request
   */
  sideContentInterruption(newComponent: any, parameters: {}): boolean {
    if (this.getServiceDifferences().length === 0) {
      return true;
    } else {
      // open a confirmation modal
      const modalRef = this.NgbModalService.open(CustomModalComponent);
      modalRef.componentInstance.title = 'Are you sure ?';
      modalRef.componentInstance.subtitle = 'You\'re about to lost your changes in the side content';
      modalRef.componentInstance.itemsList = this.getServiceDifferences();
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
   * return true if the service name is already used by another folder
   * @param service name to check
   */
  serviceNameExists(servicename: string): boolean {
    if (this.services.find(service => service.service === servicename) && servicename !== this.service.service) {
      return true;
    } else {
      return false;
    }
  }
}
