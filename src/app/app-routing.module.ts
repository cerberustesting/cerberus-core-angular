import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { TestcasescriptComponent } from './layout/pages/testcasescript/testcasescript.component';
import { PagenotfoundComponent } from './layout/shared/pagenotfound/pagenotfound.component';

const appRoutes: Route[] = [
  // HOME ROUTING
  { path: '', redirectTo: '/analyse/dashboard', pathMatch: 'full' },
  { path: 'testcasescript', component: TestcasescriptComponent },
  {
    path: 'design',
    loadChildren: './feat-design/design.module#DesignModule'
  },
  {
    path: 'run',
    loadChildren: './feat-run/run.module#RunModule'
  },
  {
    path: 'analyse',
    loadChildren: './feat-analyse/analyse.module#AnalyseModule'
  },
  {
    path: 'configure',
    loadChildren: './feat-configure/configure.module#ConfigureModule'
  },
  { path: '**', redirectTo: '/pagenotfound' },
  { path: 'pagenotfound', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes,
    { enableTracing: true }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
