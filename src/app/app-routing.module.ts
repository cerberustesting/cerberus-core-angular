import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestcasescriptComponent } from './testcasescript/testcasescript.component';

const routes: Route[] = [
  // HOME ROUTING
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  // TESTCASESCRIPT ROUTING
  {
    path: 'testcasescript', component: TestcasescriptComponent
  },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
