import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestcaselistComponent } from './testcaselist/testcaselist.component';
import { TestcasescriptComponent} from './testcasescript/testcasescript.component';
import { DatalibraryComponent } from './datalibrary/datalibrary.component';
import { CampaignsComponent } from './campaigns/campaigns.component';

const designRoutes: Routes = [
  {
    path: 'testcaseslist',
    component: TestcaselistComponent
  },
  {
    path: 'testcasescript/:test/:testcase',
    component: TestcasescriptComponent
  },
  {
    path: 'testcasescript/:test',
    component: TestcasescriptComponent
  },
  {
    path: 'testcasescript',
    component: TestcasescriptComponent
  },
  {
    path: 'datalibrary',
    component: DatalibraryComponent
  },
  {
    path: 'campaigns',
    component: CampaignsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(designRoutes)],
  exports: [RouterModule]
})
export class DesignRoutingModule { }
