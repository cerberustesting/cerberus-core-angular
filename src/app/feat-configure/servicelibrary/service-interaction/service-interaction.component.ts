import { Component, OnInit, HostListener } from '@angular/core';
import { Service } from 'src/app/shared/model/back/servicelibrary/servicelibrary.model';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
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

  // service list used for applications select
  public applications: Array<Application>;

  /** instance of the interaction mode fields enumeration */
  public InteractionMode: typeof INTERACTION_MODE = INTERACTION_MODE;

  private dragAreaClass: string;

  exit: (n: void) => void;

  constructor(
    private formBuilder: FormBuilder,
    private serviceLibraryService: ServiceLibraryService,    
    private systemService: SystemService,
    private notificationService: NotificationService,
    private sideContentService: SidecontentService,
    private NgbModalService: NgbModal,
    private userService: UserService,
    private invariantsService: InvariantsService) {
    this.service = undefined;
  }

  ngOnInit() {

    this.getEntitiesData();

    // set the correct title for the save button (depending on the mode)
    this.saveButtonTitle = this.sideContentService.getsaveButtonTitle(this.mode);

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

    this.dragAreaClass = "dragarea";
  }

  /**
   * get invariants and applications
  */
  getEntitiesData() {
    // get other data
    this.systemService.getApplicationList(applications => {this.applications = applications;}, undefined, undefined);// TODO  this.userService.user.defaultSystem

    // get service types and methods invariants, only if doesn't exist yet
    if(!this.invariantsService.serviceTypeList){
      this.invariantsService.getServiceTypeList();
    }
    if(!this.invariantsService.serviceMethodList){
      this.invariantsService.getServiceMethodList();
    }
    if(!this.invariantsService.serviceContentActList){
      this.invariantsService.getServiceContentActList();
    }
  }

  /**
   * handle file upload on FTP type
   * @param event form input upload event
   */
  onFileChange(event: any) {
    let files: FileList = event.target.files;
    this.saveFiles(files);
  }
  
  /**
   * HostListener events handle functions
   * @param event dragable area event
   */
  @HostListener("dragover", ["$event"]) onDragOver(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }

  @HostListener("dragenter", ["$event"]) onDragEnter(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }

  @HostListener("dragend", ["$event"]) onDragEnd(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }

  @HostListener("dragleave", ["$event"]) onDragLeave(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }
  
  @HostListener("drop", ["$event"]) onDrop(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      let files: FileList = event.dataTransfer.files;
      this.saveFiles(files);
    }
  }
  
  /**
   * handle file upload on FTP type
   * @param event form input upload event
   */
  saveFiles(files: FileList) {
    if (files.length == 1){
      this.serviceForm.get('file').setValue(files[0]);
      this.serviceForm.get('fileName').setValue(files[0].name);
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
      attachementurl: this.service.attachementurl,
      contentList: this.formBuilder.array(this.service.contentList),
      headerList: this.formBuilder.array(this.service.headerList),
      srvRequest: this.service.srvRequest,
      file: this.service.file,
      fileName: this.service.fileName
    });
  }

  get contentList() {
    return this.serviceForm.get('contentList') as FormArray;
  }

  get headerList() {
    return this.serviceForm.get('headerList') as FormArray;
  }
  /**
   * add row on content list
   */
  addContent(): void {
    this.contentList.push( 
      this.formBuilder.group({
        active: "Y",
        sort: 10,
        key: "",
        value: "",
        description: "",
        toDelete: false
      })
    );
  }
  /**
   * add row on header list
   */
  addHeader(): void {
    this.headerList.push( 
      this.formBuilder.group({
        active: "Y",
        sort: 10,
        key: "",
        value: "",
        description: "",
        toDelete: false
      })
    );
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
        if(!response){
          return;
        }
        this.notificationService.cerberusAPINotification(response.messageType, response.message, NotificationID.serviceInteraction);
        if(response.messageType === 'OK'){
          this.closeSideContent();
        }        
      });
    } else if (this.mode === INTERACTION_MODE.EDIT) {
      this.serviceLibraryService.updateService(this.initialServiceName, values, (response: any) => {
        if(!response){
          return;
        }
        this.notificationService.cerberusAPINotification(response.messageType, response.message, NotificationID.serviceInteraction);
        if(response.messageType === 'OK'){
          this.closeSideContent();
        }        
      });
    }
  }

  /**
   * close the sidecontent through the service
   */
  closeSideContent(): void {
    this.sideContentService.closeSideBlock();
    this.exit();
  }

  /**
   * function mandatory since this component is displayed in the side content
   * return true if this component can be removed without warning, false otherwise
   * @param newComponent new component to replace the service one with
   * @param parameters parameters attached with the compononent change request
   */
  sideContentInterruption(newComponent: any, parameters: {}): boolean {

    const sideContentService = this.sideContentService;
    // open a confirmation modal
    const modalRef = this.NgbModalService.open(CustomModalComponent);
    modalRef.componentInstance.title = 'Are you sure?';
    modalRef.componentInstance.subtitle = 'Your current side panel content will be replaced and unsaved changes will be lost. Do you want to proceed?';
    modalRef.componentInstance.modalType = ModalType.Confirm;
    modalRef.componentInstance.itemsType = CustomModalItemsType.Step;
    modalRef.componentInstance.confirmFunction = function () {
      sideContentService.addComponentToSideBlock(newComponent, parameters, true);
    };
     
    return false;        
  }
}
