import { Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { InvariantsService } from 'src/app/core/services/api/invariants.service';
import { SystemService } from 'src/app/core/services/api/system.service';
import { TestCase } from 'src/app/shared/model/back/testcase/testcase.model';
import { TestcaseService } from 'src/app/core/services/api/testcase/testcase.service';
import { MassActionField, MassActionType } from './massactions.model';
import { NotificationService } from 'src/app/core/services/utils/notification.service';
import { FilterService } from 'src/app/core/services/api/filter.service';
import { Application } from 'src/app/shared/model/back/application/application.model';

@Component({
  selector: 'app-massactions',
  templateUrl: './massactions.component.html',
  styleUrls: ['./massactions.component.scss']
})
export class MassactionsComponent implements OnInit, OnChanges, OnDestroy {

  /** name of the field to perform the mass action on */
  @Input('field') fieldName: MassActionField;

  /** items currently selected in the table */
  @Input('selection') selection: TestCase[];

  /** list of options (used if if the field type is requiring it) */
  private itemsList: Array<any>;

  /** type of field for the mass action */
  public fieldType: MassActionType;

  /** list of item (or text value) used as a new value for the mass action */
  public selectedItem: any;

  /** event to reset the current mass action field in the parent component */
  @Output() resetCurrentMassAction: EventEmitter<string> = new EventEmitter();

  /** instance of the Mass Actions types enumeration */
  public MassActionType: typeof MassActionType = MassActionType;

  constructor(
    private invariantService: InvariantsService,
    private systemService: SystemService,
    private filterService: FilterService,
    private testcaseService: TestcaseService,
    private notificationService: NotificationService
  ) { }

  /**
  * catch any changes
  */
  ngOnChanges() {
    this.refreshItemsList();
    // reset the mass action new value(s)
    this.selectedItem = undefined;
  }

  ngOnInit() {
    this.refreshItemsList();
    this.selectedItem = undefined;
  }

  ngOnDestroy() {
    this.fieldName = undefined;
  }

  /**
   * refresh the list of options (according to the type of field that is massively updated).
   * set the fieldType and feed the itemsList
   */
  refreshItemsList(): void {
    switch (this.fieldName) {
      case MassActionField.Status: {
        this.invariantService.observableTcStatus.subscribe(response => this.itemsList = response);
        this.fieldType = MassActionType.Invariants;
        break;
      }
      case MassActionField.Priority: {
        this.invariantService.observablePriorities.subscribe(response => this.itemsList = response);
        this.fieldType = MassActionType.Invariants;
        break;
      }
      case MassActionField.Application: {
        // fetch all the applications
        this.systemService.getApplicationList((applications: Application[]) => {
          this.itemsList = applications;
        }, undefined, undefined, true);
        this.fieldType = MassActionType.Applications;
        break;
      }
      case MassActionField.Executor: {
        this.fieldType = MassActionType.Text;
      }
    }
  }

  /**
   * send the current field name with the selection to the API
   */
  massUpdate(): void {
    this.testcaseService.testCaseMassUpdate(this.selection, this.fieldName, this.selectedItem, (rep) => {
      this.notificationService.cerberusAPINotification(rep.messageType, rep.message);
      this.filterService.refreshTableContent();
      // reset the field name to destroy the component
      this.resetCurrentMassAction.emit(this.fieldName);
    });
  }

}
