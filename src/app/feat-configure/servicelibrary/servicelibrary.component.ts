import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { Column } from 'src/app/shared/model/front/column.model';
import { ServiceLibraryColumnsData } from 'src/app/feat-configure/servicelibrary/servicelibrary.columnsdata';
import { Service } from 'src/app/shared/model/back/servicelibrary/servicelibrary.model';
import { Subject } from 'rxjs';
import { DatatablePageComponent } from 'src/app/shared/datatable-page/datatable-page.component';
import { HeaderTitleService } from 'src/app/core/services/utils/header-title.service';
import { SidecontentService, INTERACTION_MODE } from 'src/app/core/services/api/sidecontent.service';
import { ServiceInteractionComponent } from './service-interaction/service-interaction.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomModalComponent, ModalType } from 'src/app/shared/custom-modal/custom-modal.component';
import { ServiceLibraryService } from 'src/app/core/services/api/servicelibrary/servicelibrary.service';
import { NotificationService } from 'src/app/core/services/utils/notification.service';
import { NotificationID } from 'src/app/shared/notifications/notifications.data';
import { UserService } from 'src/app/core/services/api/user.service';

@Component({
  selector: 'app-servicelibrary',
  templateUrl: './servicelibrary.component.html',
  styleUrls: ['./servicelibrary.component.scss']
})
export class ServiceLibraryComponent implements OnInit {

  /** list of columns (defined on a another file: `servicelibrary.columnsdata.ts`) */
  public columns: Array<Column> = ServiceLibraryColumnsData;

  /** default sort direction and property */
  public defaultPageSort = [{ dir: 'asc', prop: 'service' }];

  public selectedRows: Array<Service> = [];

  /** API endpoint to fetch the table information */
  public servlet: string;

  /** the observable to refresh the table */
  public refreshResultsEvent: Subject<void> = new Subject<void>();

  /** the observable to refresh the table */
  public userSystems: Array<string>;
  
  /**  permissions to delete */
  public hasPermissions: boolean;

  /** child datatable component */
  @ViewChild(DatatablePageComponent, { static: false }) private datatablepageComponent: DatatablePageComponent;

  constructor(
    private headerTitleService: HeaderTitleService,
    private sideContentService: SidecontentService,
    private modalService: NgbModal,
    private serviceLibraryService: ServiceLibraryService,
    private notificationService: NotificationService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.servlet = '/ReadAppService';
    this.headerTitleService.setTitle('Service Library', 'serviceLibrary');

    // get the user systems when available
    this.userService.observableUser.subscribe(rep => {
      if(rep && rep.defaultSystem){        
        this.userSystems = rep.defaultSystem;
      }
    });
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
   createService(): void {
    
    this.sideContentService.addComponentToSideBlock(ServiceInteractionComponent, {
      mode: INTERACTION_MODE.CREATE,
      service: new Service(),
      exit: () => {
        this.refreshResults();
      }
    });
    this.sideContentService.openSideBlock();
  
  }

  /**
   * open the side content in edition mode with the service object to edit
   * @param service object to edit
   */
  editService(service: Service): void {
    
    this.sideContentService.addComponentToSideBlock(ServiceInteractionComponent, {
      mode: INTERACTION_MODE.EDIT,
      service: service,
      exit: () => {
        this.refreshResults();
      }
    });
    this.sideContentService.openSideBlock();
    
  }

  /**
   * open a modal to confirm the deletion of a service
   * @param service object to delete
   */
  deleteService(service: Service): void {
    
    // create and open the modal object
    const modalRef = this.modalService.open(CustomModalComponent);
    modalRef.componentInstance.title = 'Delete Service';
    modalRef.componentInstance.subtitle = 'Are you sure you want to delete ' + service.service + '?';
    modalRef.componentInstance.modalType = ModalType.Confirm;
    modalRef.componentInstance.modalId = 'deleteService_modal';
    modalRef.componentInstance.confirmFunction = () => {
      this.serviceLibraryService.deleteService(
        service,
        (response) => {
          this.notificationService.cerberusAPINotification(response.messageType, response.message, NotificationID.serviceInteraction);
          this.refreshResults();
        }
      );
    };
  }
}
