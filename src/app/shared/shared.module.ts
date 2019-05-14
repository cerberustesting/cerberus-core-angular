import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NgSelectModule } from "@ng-select/ng-select";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {DatatableComponent} from "./datatable/datatable.component";

@NgModule({
  declarations: [DatatableComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgSelectModule,
    NgxDatatableModule,
  ],
  exports: [NgSelectModule, DatatableComponent]
})
export class SharedModule { }
