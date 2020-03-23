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
import { TestCaseSelectorComponent } from './testcasescript/testcaseselector/testcaseselector.component';
import { TcScriptComponent } from './testcasescript/testcasecontent/testcasecontent.component';
import { StepComponent } from './testcasescript/testcasecontent/script/step/step.component';
import { LibraryStepsModalComponent } from './testcasescript/testcasecontent/librarystepsmodal/librarystepsmodal.component';
import { ActionComponent } from './testcasescript/testcasecontent/script/step/action/action.component';
import { ControlComponent } from './testcasescript/testcasecontent/script/step/action/control/control.component';
import { PropertyvalueComponent } from './testcasescript/testcasecontent/properties/propertygroup/propertyvalue/propertyvalue.component';
import { SettingsComponent } from './testcasescript/testcasecontent/settings/settings.component';
import { DatalibraryComponent } from './datalibrary/datalibrary.component';
import { ScriptComponent } from './testcasescript/testcasecontent/script/script.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { ActionsComponent } from './testcaselist/actions/actions.component';
import { DatalibInteractionComponent } from './datalibrary/datalib-interaction/datalib-interaction.component';
import { DatalibTclistComponent } from './datalibrary/datalib-interaction/datalib-tclist/datalib-tclist.component';
import { TestcaseInteractionComponent } from './testcaselist/testcase-interaction/testcase-interaction.component';
import { LabelsTabComponent } from './testcaselist/testcase-interaction/labels-tab/labels-tab.component';
import { LabelNodeComponent } from './testcaselist/testcase-interaction/labels-tab/label-node/label-node.component';
import { PropertiesComponent } from './testcasescript/testcasecontent/properties/properties.component';

// Pipes
import { FilterPipeModule } from 'ngx-filter-pipe';

// External
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PropertygroupComponent } from './testcasescript/testcasecontent/properties/propertygroup/propertygroup.component';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { BugsReportTabComponent } from './testcaselist/testcase-interaction/bugs-report-tab/bugs-report-tab.component';
import { DependenciesTabComponent } from './testcaselist/testcase-interaction/dependencies-tab/dependencies-tab.component';
import { ExecutionSettingsTabComponent } from './testcaselist/testcase-interaction/execution-settings-tab/execution-settings-tab.component';
import { DefinitionTabComponent } from './testcaselist/testcase-interaction/definition-tab/definition-tab.component';
import { AuditTabComponent } from './testcaselist/testcase-interaction/audit-tab/audit-tab.component';
import { ShortcutsComponent } from './testcasescript/shortcuts/shortcuts.component';
import { ControlSettingsComponent } from './testcasescript/testcasecontent/settings/control-settings/control-settings.component';
import { ActionSettingsComponent } from './testcasescript/testcasecontent/settings/action-settings/action-settings.component';
import { StepSettingsComponent } from './testcasescript/testcasecontent/settings/step-settings/step-settings.component';

@NgModule({
  declarations: [
    TestcaselistComponent,
    LabelsComponent,
    TestcasescriptComponent,
    TestCaseSelectorComponent,
    TcScriptComponent,
    StepComponent,
    LibraryStepsModalComponent,
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
    PropertiesComponent,
    PropertygroupComponent,
    BugsReportTabComponent,
    DependenciesTabComponent,
    ExecutionSettingsTabComponent,
    DefinitionTabComponent,
    AuditTabComponent,
    ShortcutsComponent,
    ControlSettingsComponent,
    ActionSettingsComponent,
    StepSettingsComponent,
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
    CKEditorModule,
    MonacoEditorModule.forRoot()
  ],
  entryComponents: [
    DatalibInteractionComponent,
    DatalibTclistComponent,
    TestcaseInteractionComponent,
    LibraryStepsModalComponent
  ],
  exports: [SharedModule]
})
export class DesignModule { }
