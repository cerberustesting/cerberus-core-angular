import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { DashboardComponent } from './layout/pages/dashboard/dashboard.component';
import { TestcasescriptComponent } from './layout/pages/testcasescript/testcasescript.component';
import { LabelsComponent } from './layout/pages/labels/labels.component';
import { ReportComponent } from './layout/pages/report/report.component';
import { PagenotfoundComponent } from './layout/shared/pagenotfound/pagenotfound.component';

const routes: Route[] = [
  // HOME ROUTING
  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'testcasescript', component: TestcasescriptComponent },
  { path: 'labels', component: LabelsComponent },
  { path: 'report', component: ReportComponent },
  { path: 'pagenotfound', component: PagenotfoundComponent },
  { path: '**', redirectTo: '/pagenotfound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }