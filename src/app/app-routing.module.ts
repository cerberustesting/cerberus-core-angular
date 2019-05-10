import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { DashboardComponent } from './layout/pages/dashboard/dashboard.component';
import { TestcasescriptComponent } from './layout/pages/testcasescript/testcasescript.component';
import { LabelsComponent } from './layout/pages/labels/labels.component';
import { PagenotfoundComponent } from './layout/shared/pagenotfound/pagenotfound.component';
import { ReportbytagComponent } from './layout/pages/reportbytag/reportbytag.component';
import {TestcaselistComponent} from './layout/pages/testcaselist/testcaselist.component';

const routes: Route[] = [
  // HOME ROUTING
  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'testcaseslist', component: TestcaselistComponent },
  { path: 'testcasescript', component: TestcasescriptComponent },
  { path: 'labels', component: LabelsComponent },
  { path: 'pagenotfound', component: PagenotfoundComponent },
  { path: 'report', component: ReportbytagComponent },
  { path: '**', redirectTo: '/pagenotfound' },
  {
    path: 'design',
    loadChildren: './design/design.module#DesignModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
