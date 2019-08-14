import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { DatatableComponent } from "./datatable-page/datatable/datatable.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TrueindexPipe } from "./pipes/trueindex.pipe";
import { UniqueproplistPipe } from "./pipes/uniqueproplist.pipe";
import { LabelfilteringPipe } from "./pipes/labelfiltering.pipe";
import { AlertsComponent } from "./alerts/alerts.component";
import { NgbPopoverModule } from "@ng-bootstrap/ng-bootstrap";
import { LabelComponent } from './label/label.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ActionsComponent } from './datatable-page/utils/actions/actions.component';
import { DatatablePageComponent } from './datatable-page/datatable-page.component';
import { FilterlikeComponent } from './datatable-page/utils/filterlike/filterlike.component';
import { FiltersComponent } from "./datatable-page/filters/filters.component";
import { FilterComponent } from "./datatable-page/utils/filter/filter.component";
import { DatalibTclistComponent } from './datatable-page/utils/datalib-tclist/datalib-tclist.component';
import { RunComponent } from './run/run.component';
import { DatalibEditComponent } from './datatable-page/utils/datalib-edit/datalib-edit.component';
import { CustomModalComponent } from './custom-modal/custom-modal.component';

@NgModule({
  declarations: [
    DatatableComponent,
    TrueindexPipe,
    UniqueproplistPipe,
    LabelfilteringPipe,
    AlertsComponent,
    LabelComponent,
    ActionsComponent,
    DatatablePageComponent,
    FilterlikeComponent,
    FiltersComponent,
    FilterComponent,
    DatalibTclistComponent,
    RunComponent,
    DatalibEditComponent,
    CustomModalComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    NgxDatatableModule,
    FormsModule,
    NgbModule,    
    ReactiveFormsModule

  ],
  entryComponents: [
    DatalibTclistComponent,
    DatalibEditComponent,
    CustomModalComponent
  ],
  exports: [
    NgSelectModule,
    DatatableComponent,
    FormsModule,
    TrueindexPipe,
    UniqueproplistPipe,
    LabelfilteringPipe,
    AlertsComponent,
    NgbPopoverModule,
    ActionsComponent,
    FiltersComponent,
    DatatablePageComponent
  ],
  providers : [
    TrueindexPipe,
    LabelfilteringPipe
  ]
})
export class SharedModule { }
