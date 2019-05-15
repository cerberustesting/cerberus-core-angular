import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NgSelectModule } from "@ng-select/ng-select";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { DatatableComponent } from "./datatable/datatable.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [DatatableComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgSelectModule,
    NgxDatatableModule,
    FormsModule
  ],
  exports: [NgSelectModule, DatatableComponent, FormsModule]
})
export class SharedModule { }
