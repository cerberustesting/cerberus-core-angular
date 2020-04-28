import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportbytagComponent } from './reportbytag/reportbytag.component';
import { HomepageComponent } from './homepage/homepage.component';

const analyseRoutes: Routes = [
  { path: 'report', component: ReportbytagComponent },
  { path: 'report/:tag', component: ReportbytagComponent },
  { path: 'home', component: HomepageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(analyseRoutes)],
  exports: [RouterModule]
})
export class AnalyseRoutingModule { }
