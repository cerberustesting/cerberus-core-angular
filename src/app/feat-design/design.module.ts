import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignRoutingModule } from './design-routing.module';
import { TestcaselistComponent } from "./testcaselist/testcaselist.component";
import { FilterComponent } from "./testcaselist/filters/filter/filter.component";
import { FiltersComponent } from "./testcaselist/filters/filters.component";
// import { DatatableComponent } from "../shared/datatable/datatable.component";
import { FilterPipeModule } from "ngx-filter-pipe";
// import { NgSelectModule} from "@ng-select/ng-select";
import { SharedModule } from "../shared/shared.module";
import { LabelsComponent } from "./labels/labels.component";
import { TestcasescriptComponent } from "./testcasescript/testcasescript.component";
import { TcSelectorComponent } from "./testcasescript/tc-selector/tc-selector.component";
import { TcHeaderComponent } from "./testcasescript/tc-header/tc-header.component";
import { TcScriptComponent } from "./testcasescript/tc-script/tc-script.component";
import { AlertsComponent } from "../shared/alerts/alerts.component";
import { StepComponent } from "./testcasescript/tc-script/step/step.component";
import { ActionComponent } from "./testcasescript/tc-script/action/action.component";
import { ControlComponent } from "./testcasescript/tc-script/control/control.component";
import { PropertyComponent } from "./testcasescript/tc-script/property/property.component";
import { PropertyvalueComponent } from "./testcasescript/tc-script/property/propertyvalue/propertyvalue.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {SettingsComponent} from "./testcasescript/tc-script/settings/settings.component";

@NgModule({
  declarations: [
      TestcaselistComponent,
      FilterComponent,
      FiltersComponent,
      LabelsComponent,
      TestcasescriptComponent,
      TcSelectorComponent,
      TcHeaderComponent,
      TcScriptComponent,
      // AlertsComponent,
      StepComponent,
      ActionComponent,
      ControlComponent,
    //  DatatableComponent,
      PropertyComponent,
      //FiltersComponent,
      PropertyvalueComponent,
      SettingsComponent,
  ],
  imports: [
    CommonModule,
    DesignRoutingModule,
    FilterPipeModule,
    SharedModule,
    DragDropModule,
//    NgSelectModule,
    //FormsModule
  ],
  exports: [SharedModule]
})
export class DesignModule { }
