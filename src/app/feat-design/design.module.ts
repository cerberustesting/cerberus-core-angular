import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DesignRoutingModule } from './design-routing.module';
import { TestcaselistComponent } from "./testcaselist/testcaselist.component";
import { FilterComponent } from "./testcaselist/filters/filter/filter.component";
import { FiltersComponent } from "./testcaselist/filters/filters.component";
import { FilterPipeModule } from "ngx-filter-pipe";
import { SharedModule } from "../shared/shared.module";
import { LabelsComponent } from "./labels/labels.component";
import { TestcasescriptComponent } from "./testcasescript/testcasescript.component";
import { TcSelectorComponent } from "./testcasescript/tc-selector/tc-selector.component";
import { TcHeaderComponent } from "./testcasescript/tc-header/tc-header.component";
import { TcScriptComponent } from "./testcasescript/tc-script/tc-script.component";
import { StepComponent } from "./testcasescript/tc-script/step/step.component";
import { ActionComponent } from "./testcasescript/tc-script/action/action.component";
import { ControlComponent } from "./testcasescript/tc-script/control/control.component";
import { PropertyComponent } from "./testcasescript/tc-script/property/property.component";
import { PropertyvalueComponent } from "./testcasescript/tc-script/property/propertyvalue/propertyvalue.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { SettingsComponent } from "./testcasescript/tc-script/settings/settings.component";
import { FilterlikeComponent } from './testcaselist/filters/filterlike/filterlike.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



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
      StepComponent,
      ActionComponent,
      ControlComponent,
      PropertyComponent,
      PropertyvalueComponent,
      SettingsComponent,
      FilterlikeComponent,
      
  ],
  imports: [
    CommonModule,
    DesignRoutingModule,
    FilterPipeModule,
    SharedModule,
    DragDropModule,
    NgbModule,

  ],
  exports: [SharedModule]
})
export class DesignModule { }
