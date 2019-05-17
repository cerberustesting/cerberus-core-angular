import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { DatatableComponent } from "./datatable/datatable.component";
import { FormsModule } from "@angular/forms";
import { TrueindexPipe } from "./pipes/trueindex.pipe";
import { UniqueproplistPipe } from "./pipes/uniqueproplist.pipe";
import { LabelfilteringPipe } from "./pipes/labelfiltering.pipe";
import { AlertsComponent } from "./alerts/alerts.component";
import { NgbPopoverModule } from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    DatatableComponent,
    TrueindexPipe,
    UniqueproplistPipe,
    LabelfilteringPipe,
    AlertsComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    NgxDatatableModule,
    FormsModule,

  ],
  exports: [
    NgSelectModule,
    DatatableComponent,
    FormsModule,
    TrueindexPipe,
    UniqueproplistPipe,
    LabelfilteringPipe,
    AlertsComponent,
    NgbPopoverModule
  ],
  providers : [
    TrueindexPipe
  ]
})
export class SharedModule { }
