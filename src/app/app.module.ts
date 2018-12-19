import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderbarComponent } from './headerbar/headerbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TestcasescriptComponent } from './testcasescript/testcasescript.component';
import { TcSelectorComponent } from './testcasescript/tc-selector/tc-selector.component';
import { TcHeaderComponent } from './testcasescript/tc-header/tc-header.component';
import { TcScriptComponent } from './testcasescript/tc-script/tc-script.component';
import { LabelfilteringPipe } from './pipes/labelfiltering.pipe';
import { LabelsComponent } from './labels/labels.component';
import { AlertsComponent } from './headerbar/alerts/alerts.component';

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
    AlertsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
