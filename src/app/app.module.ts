import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgPipesModule } from 'ngx-pipes';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './layout/shared/sidebar/sidebar.component';
import { FooterComponent } from './layout/shared/footer/footer.component';
import { HeaderbarComponent } from './layout/shared/headerbar/headerbar.component';
// import { DashboardComponent } from './feat-analyse/dashboard/dashboard.component';
import { TestcasescriptComponent } from './layout/pages/testcasescript/testcasescript.component';
import { TcSelectorComponent } from './layout/pages/testcasescript/tc-selector/tc-selector.component';
import { TcHeaderComponent } from './layout/pages/testcasescript/tc-header/tc-header.component';
import { TcScriptComponent } from './layout/pages/testcasescript/tc-script/tc-script.component';
import { LabelfilteringPipe } from './pipes/labelfiltering.pipe';
import { LabelsComponent } from './feat-design/labels/labels.component';
import { AlertsComponent } from './layout/shared/headerbar/alerts/alerts.component';
import { StepComponent } from './layout/pages/testcasescript/tc-script/step/step.component';
import { ActionComponent } from './layout/pages/testcasescript/tc-script/action/action.component';
import { PagenotfoundComponent } from './layout/shared/pagenotfound/pagenotfound.component';
import { ControlComponent } from './layout/pages/testcasescript/tc-script/control/control.component';
import { ExecutionsperweekComponent } from './feat-analyse/dashboard/graph/executionsperweek/executionsperweek.component';
import { SettingsComponent } from './layout/pages/testcasescript/tc-script/settings/settings.component';
import { ReportbytagComponent } from './feat-analyse/reportbytag/reportbytag.component';
import { ReportbystatusComponent } from './feat-analyse/reportbytag/graph/reportbystatus/reportbystatus.component';
import { BugreportComponent } from './feat-analyse/reportbytag/bugreport/bugreport.component';
// import { TestcaselistComponent } from './feat-design/testcaselist/testcaselist.component';
import { TrueindexPipe } from './pipes/trueindex.pipe';
// import { DatatableComponent } from './layout/shared/datatable/datatable.component';
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PropertyComponent } from './layout/pages/testcasescript/tc-script/property/property.component';
import { PropertyvalueComponent } from './layout/pages/testcasescript/tc-script/property/propertyvalue/propertyvalue.component';
// import { FiltersComponent } from './feat-design/testcaselist/filters/filters.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
// import { FilterComponent } from './feat-design/testcaselist/filters/filter/filter.component';
import { UniqueproplistPipe } from './pipes/uniqueproplist.pipe';
import { KeycloakInterceptorService } from './services/auth/keycloak.interceptor.service';
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    FooterComponent,
    HeaderbarComponent,
   // DashboardComponent,
    TestcasescriptComponent,
    TcSelectorComponent,
    TcHeaderComponent,
    TcScriptComponent,
    LabelfilteringPipe,
    //LabelsComponent,
    AlertsComponent,
    StepComponent,
    ActionComponent,
    PagenotfoundComponent,
    ControlComponent,
    // ExecutionsperweekComponent,
    SettingsComponent,
    //ReportbytagComponent,
    //ReportbystatusComponent,
    //BugreportComponent,
  //  TestcaselistComponent,
    //DatatableComponent,
    TrueindexPipe,
    PropertyComponent,
    //FiltersComponent,
    PropertyvalueComponent,
    //FilterComponent,
    //FilterComponent,
    UniqueproplistPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbPopoverModule,
    //NgSelectModule,
    DragDropModule,
  //  NgxDatatableModule,
    NgPipesModule,
    FilterPipeModule,
    SharedModule

  ],
  providers: [TrueindexPipe,
/*    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakInterceptorService,
      multi: true
    }*/],
  exports: [SharedModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
