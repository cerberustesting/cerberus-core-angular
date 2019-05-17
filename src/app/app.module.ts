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
import { SidebarComponent } from './core/sidebar/sidebar.component';
import { FooterComponent } from './core/footer/footer.component';
import { HeaderbarComponent } from './core/headerbar/headerbar.component';
// import { DashboardComponent } from './feat-analyse/dashboard/dashboard.component';
import { TestcasescriptComponent } from './feat-design/testcasescript/testcasescript.component';
import { TcSelectorComponent } from './feat-design/testcasescript/tc-selector/tc-selector.component';
import { TcHeaderComponent } from './feat-design/testcasescript/tc-header/tc-header.component';
import { TcScriptComponent } from './feat-design/testcasescript/tc-script/tc-script.component';
import { LabelfilteringPipe } from './shared/pipes/labelfiltering.pipe';
import { LabelsComponent } from './feat-design/labels/labels.component';
import { AlertsComponent } from './shared/alerts/alerts.component';
import { StepComponent } from './feat-design/testcasescript/tc-script/step/step.component';
import { ActionComponent } from './feat-design/testcasescript/tc-script/action/action.component';
import { PagenotfoundComponent } from './core/pagenotfound/pagenotfound.component';
import { ControlComponent } from './feat-design/testcasescript/tc-script/control/control.component';
import { ExecutionsperweekComponent } from './feat-analyse/dashboard/graph/executionsperweek/executionsperweek.component';
import { SettingsComponent } from './feat-design/testcasescript/tc-script/settings/settings.component';
import { ReportbytagComponent } from './feat-analyse/reportbytag/reportbytag.component';
import { ReportbystatusComponent } from './feat-analyse/reportbytag/graph/reportbystatus/reportbystatus.component';
import { BugreportComponent } from './feat-analyse/reportbytag/bugreport/bugreport.component';
// import { TestcaselistComponent } from './feat-design/testcaselist/testcaselist.component';
import { TrueindexPipe } from './shared/pipes/trueindex.pipe';
// import { DatatableComponent } from './layout/shared/datatable/datatable.component';
// import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { PropertyComponent } from './feat-design/testcasescript/tc-script/property/property.component';
import { PropertyvalueComponent } from './feat-design/testcasescript/tc-script/property/propertyvalue/propertyvalue.component';
// import { FiltersComponent } from './feat-design/testcaselist/filters/filters.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
// import { FilterComponent } from './feat-design/testcaselist/filters/filter/filter.component';
import { UniqueproplistPipe } from './shared/pipes/uniqueproplist.pipe';
import { KeycloakInterceptorService } from './core/services/auth/keycloak.interceptor.service';
import { SharedModule } from "./shared/shared.module";
import {CoreModule} from "./core/core.module";

@NgModule({
  declarations: [
    AppComponent,
    // SidebarComponent,
    // FooterComponent,
    // HeaderbarComponent,
   // DashboardComponent,
    //TestcasescriptComponent,
    //TcSelectorComponent,
    //TcHeaderComponent,
    //TcScriptComponent,
    // LabelfilteringPipe,
    //LabelsComponent,
    //AlertsComponent,
    //StepComponent,
    //ActionComponent,
    PagenotfoundComponent,
    //ControlComponent,
    // ExecutionsperweekComponent,
    // SettingsComponent,
    //ReportbytagComponent,
    //ReportbystatusComponent,
    //BugreportComponent,
  //  TestcaselistComponent,
    //DatatableComponent,
    //TrueindexPipe,
    //PropertyComponent,
    //FiltersComponent,
    //PropertyvalueComponent,
    //FilterComponent,
    //FilterComponent,
    // UniqueproplistPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CoreModule,
    DragDropModule,
  //  NgxDatatableModule,
  //  NgPipesModule,
    FilterPipeModule,
    SharedModule

  ],
  providers: [//TrueindexPipe,
/*    {
      provide: HTTP_INTERCEPTORS,
      useClass: KeycloakInterceptorService,
      multi: true
    }*/],
  exports: [SharedModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
