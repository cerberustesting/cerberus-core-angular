import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnalyseRoutingModule } from './analyse-routing.module';
import { ReportbystatusComponent } from "./reportbytag/graph/reportby-status/reportby-status.component";
import { ReportbytagComponent } from "./reportbytag/reportbytag.component";
import { SharedModule } from "../shared/shared.module";
import { BugreportComponent } from "./reportbytag/bugreport/bugreport.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ExecutionsperweekComponent } from "./dashboard/graph/executionsperweek/executionsperweek.component";
import { ChartsModule } from 'ng2-charts';
import { ReportbyTestfolderComponent } from './reportbytag/graph/reportby-testfolder/reportby-testfolder.component';
import { ReportbyLabelComponent } from './reportbytag/graph/reportby-label/reportby-label.component';
import { ReportbyOtherComponent } from './reportbytag/graph/reportby-other/reportby-other.component';
import { ReportlistComponent } from './reportbytag/reportlist/reportlist.component';
import { TagDetailComponent } from './reportbytag/tag-detail/tag-detail.component';
import { TagSelectionComponent } from './reportbytag/tag-selection/tag-selection.component';

@NgModule({
  declarations: [
      ReportbystatusComponent,
      ReportbytagComponent,
      BugreportComponent,
      DashboardComponent,
      ExecutionsperweekComponent,
      ReportbyTestfolderComponent,
      ReportbyLabelComponent,
      ReportbyOtherComponent,
      ReportlistComponent,
      TagDetailComponent,
      TagSelectionComponent
  ],
  imports: [
    CommonModule,
    AnalyseRoutingModule,
    SharedModule,
    ChartsModule
  ],
  exports: [SharedModule]
})
export class AnalyseModule { }
