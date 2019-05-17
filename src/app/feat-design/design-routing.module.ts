import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestcaselistComponent } from "./testcaselist/testcaselist.component";
import { TestcasescriptComponent} from "./testcasescript/testcasescript.component";

const designRoutes: Routes = [
  {
    path: 'testcaseslist',
    component: TestcaselistComponent
  },
  {
    path: 'testcasescript',
    component: TestcasescriptComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(designRoutes)],
  exports: [RouterModule]
})
export class DesignRoutingModule { }
