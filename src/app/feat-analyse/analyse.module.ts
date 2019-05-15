import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyseRoutingModule } from './analyse-routing.module';
import { ReportbystatusComponent } from "./reportbytag/graph/reportbystatus/reportbystatus.component";
import { ReportbytagComponent } from "./reportbytag/reportbytag.component";
import { SharedModule } from "../shared/shared.module";
import { BugreportComponent } from "./reportbytag/bugreport/bugreport.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ExecutionsperweekComponent } from "./dashboard/graph/executionsperweek/executionsperweek.component";

@NgModule({
  declarations: [
      ReportbystatusComponent,
      ReportbytagComponent,
      BugreportComponent,
      DashboardComponent,
      ExecutionsperweekComponent,
  ],
  imports: [
    CommonModule,
    AnalyseRoutingModule,
    SharedModule
  ],
  exports: [SharedModule]
})
export class AnalyseModule { }
