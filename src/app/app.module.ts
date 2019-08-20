import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core/core.module";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SessionInterceptorService } from './core/services/auth/session.interceptor.service'
import { DesignModule } from './feat-design/design.module';


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
    DesignModule
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
