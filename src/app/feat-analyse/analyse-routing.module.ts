import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportbytagComponent } from "./reportbytag/reportbytag.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

const analyseRoutes: Routes = [
  { path: 'report', component: ReportbytagComponent },
  { path: 'report/:tag', component: ReportbytagComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(analyseRoutes)],
  exports: [RouterModule]
})
export class AnalyseRoutingModule { }
