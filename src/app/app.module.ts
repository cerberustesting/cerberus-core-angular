import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './layout/shared/sidebar/sidebar.component';
import { FooterComponent } from './layout/shared/footer/footer.component';
import { HeaderbarComponent } from './layout/shared/headerbar/headerbar.component';
import { DashboardComponent } from './layout/pages/dashboard/dashboard.component';
import { TestcasescriptComponent } from './layout/pages/testcasescript/testcasescript.component';
import { TcSelectorComponent } from './layout/pages/testcasescript/tc-selector/tc-selector.component';
import { TcHeaderComponent } from './layout/pages/testcasescript/tc-header/tc-header.component';
import { TcScriptComponent } from './layout/pages/testcasescript/tc-script/tc-script.component';
import { LabelfilteringPipe } from './pipes/labelfiltering.pipe';
import { LabelsComponent } from './layout/pages/labels/labels.component';
import { AlertsComponent } from './layout/shared/headerbar/alerts/alerts.component';
import { StepComponent } from './layout/pages/testcasescript/tc-script/step/step.component';
import { ActionComponent } from './layout/pages/testcasescript/tc-script/action/action.component';
import { ReportComponent } from './layout/pages/report/report.component';
import { TagselectorComponent } from './layout/pages/report/tagselector/tagselector.component';
import { PagenotfoundComponent } from './layout/shared/pagenotfound/pagenotfound.component';
import { ControlComponent } from './layout/pages/testcasescript/tc-script/control/control.component';
import { ExecutionsperweekComponent } from './layout/pages/dashboard/graph/executionsperweek/executionsperweek.component';
import { SettingsComponent } from './layout/pages/testcasescript/tc-script/settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FooterComponent,
    HeaderbarComponent,
    DashboardComponent,
    TestcasescriptComponent,
    TcSelectorComponent,
    TcHeaderComponent,
    TcScriptComponent,
    LabelfilteringPipe,
    LabelsComponent,
    AlertsComponent,
    StepComponent,
    ActionComponent,
    PagenotfoundComponent,
    ReportComponent,
    TagselectorComponent,
    ControlComponent,
    ExecutionsperweekComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbPopoverModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }