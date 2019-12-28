// @angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Modules
import { DesignRoutingModule } from './design-routing.module';
import { SharedModule } from '../shared/shared.module';

// Components
import { TestcaselistComponent } from './testcaselist/testcaselist.component';
import { LabelsComponent } from './labels/labels.component';
import { TestcasescriptComponent } from './testcasescript/testcasescript.component';
import { TcSelectorComponent } from './testcasescript/tc-selector/tc-selector.component';
import { TcHeaderComponent } from './testcasescript/tc-header/tc-header.component';
import { TcScriptComponent } from './testcasescript/tc-script/tc-script.component';
import { StepComponent } from './testcasescript/tc-script/step/step.component';
import { ActionComponent } from './testcasescript/tc-script/action/action.component';
import { ControlComponent } from './testcasescript/tc-script/control/control.component';
import { PropertyvalueComponent } from './testcasescript/tc-script/property-v3/propertyvalue/propertyvalue.component';
import { SettingsComponent } from './testcasescript/tc-script/settings/settings.component';
import { DatalibraryComponent } from './datalibrary/datalibrary.component';
import { ScriptComponent } from './testcasescript/tc-script/script/script.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { ActionsComponent } from './testcaselist/actions/actions.component';
import { DatalibInteractionComponent } from './datalibrary/datalib-interaction/datalib-interaction.component';
import { DatalibTclistComponent } from './datalibrary/datalib-interaction/datalib-tclist/datalib-tclist.component';
import { TestcaseInteractionComponent } from './testcaselist/testcase-interaction/testcase-interaction.component';
import { LabelsTabComponent } from './testcaselist/testcase-interaction/labels-tab/labels-tab.component';
import { LabelNodeComponent } from './testcaselist/testcase-interaction/labels-tab/label-node/label-node.component';
import { PropertyV3Component } from './testcasescript/tc-script/property-v3/property-v3.component';

// Pipes
import { FilterPipeModule } from 'ngx-filter-pipe';

// External
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PropertygroupComponent } from './testcasescript/tc-script/property-v3/propertygroup/propertygroup.component';

@NgModule({
  declarations: [
    TestcaselistComponent,
    LabelsComponent,
    TestcasescriptComponent,
    TcSelectorComponent,
    TcHeaderComponent,
    TcScriptComponent,
    StepComponent,
    ActionComponent,
    ControlComponent,
    PropertyvalueComponent,
    SettingsComponent,
    ScriptComponent,
    DatalibraryComponent,
    CampaignsComponent,
    ActionsComponent,
    DatalibInteractionComponent,
    DatalibTclistComponent,
    TestcaseInteractionComponent,
    LabelsTabComponent,
    LabelNodeComponent,
    PropertyV3Component,
    PropertygroupComponent
  ],
  imports: [
    CommonModule,
    DesignRoutingModule,
    FilterPipeModule,
    SharedModule,
    DragDropModule,
    NgbModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule
  ],
  entryComponents: [
    DatalibInteractionComponent,
    DatalibTclistComponent,
    TestcaseInteractionComponent
  ],
  exports: [SharedModule]
})
export class DesignModule { }
