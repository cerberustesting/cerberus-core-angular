import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { PagenotfoundComponent } from './core/pagenotfound/pagenotfound.component';

const appRoutes: Route[] = [
  // HOME ROUTING
  { path: '', redirectTo: '/analyse/home', pathMatch: 'full' },
  {
    path: 'design',
    loadChildren: () => import('./feat-design/design.module').then(m => m.DesignModule)
  },
  {
    path: 'run',
    loadChildren: () => import('./feat-run/run.module').then(m => m.RunModule)
  },
  {
    path: 'analyse',
    loadChildren: () => import('./feat-analyse/analyse.module').then(m => m.AnalyseModule)
  },
  {
    path: 'configure',
    loadChildren: () => import('./feat-configure/configure.module').then(m => m.ConfigureModule)
  },
  { path: '**', redirectTo: '/pagenotfound' },
  { path: 'pagenotfound', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
