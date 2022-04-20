import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SessionInterceptorService } from './core/services/auth/session.interceptor.service';
import { DesignModule } from './feat-design/design.module';
import { ConfigureModule } from './feat-configure/configure.module';
import { AnalyseModule } from './feat-analyse/analyse.module';
import { RunModule } from './feat-run/run.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MonacoEditorModule } from 'ngx-monaco-editor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    FilterPipeModule,
    SharedModule,
    BrowserAnimationsModule,
    DesignModule,
    ConfigureModule,
    AnalyseModule,
    RunModule,
    CKEditorModule,
    MonacoEditorModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SessionInterceptorService,
      multi: true
    }
  ],
  exports: [SharedModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
