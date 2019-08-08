import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { DatatableComponent } from "./datatable-page/datatable/datatable.component";
import { FormsModule } from "@angular/forms";
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
    DatalibTclistComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    NgxDatatableModule,
    FormsModule,
    NgbModule

  ],
  entryComponents: [
    DatalibTclistComponent
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
