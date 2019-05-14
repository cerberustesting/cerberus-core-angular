import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignRoutingModule } from './design-routing.module';
import { TestcaselistComponent } from "./testcaselist/testcaselist.component";
import { FilterComponent } from "./testcaselist/filters/filter/filter.component";
import { FiltersComponent } from "./testcaselist/filters/filters.component";
// import { DatatableComponent } from "../shared/datatable/datatable.component";
import { FilterPipeModule } from "ngx-filter-pipe";
// import { NgSelectModule} from "@ng-select/ng-select";
import { SharedModule } from "../shared/shared.module";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
      TestcaselistComponent,
      FilterComponent,
      FiltersComponent,
    //  DatatableComponent,
  ],
  imports: [
    CommonModule,
    DesignRoutingModule,
    FilterPipeModule,
    SharedModule,
//    NgSelectModule,
    FormsModule
  ],
  exports: [SharedModule]
})
export class DesignModule { }
