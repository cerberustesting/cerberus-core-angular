import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServiceLibraryComponent } from './servicelibrary/servicelibrary.component';

const routes: Routes = [
  {
    path: 'servicelibrary',
    component: ServiceLibraryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigureRoutingModule { }
