import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestcasescriptComponent } from './testcasescript/testcasescript.component';
import { LabelsComponent } from './labels/labels.component';
import { PagenotfoundComponent } from './navigation/pagenotfound/pagenotfound.component';

const routes: Route[] = [
  // HOME ROUTING
  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'testcasescript', component: TestcasescriptComponent },
  { path: 'labels', component: LabelsComponent },
  { path: 'pagenotfound', component: PagenotfoundComponent },
  
  { path: '**', redirectTo: '/pagenotfound'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }