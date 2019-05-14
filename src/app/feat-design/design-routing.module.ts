import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestcaselistComponent } from "./testcaselist/testcaselist.component";

const designRoutes: Routes = [
  {
    path: 'testcaseslist',
    component: TestcaselistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(designRoutes)],
  exports: [RouterModule]
})
export class DesignRoutingModule { }
