import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderbarComponent } from "./headerbar/headerbar.component";
import { FooterComponent } from "./footer/footer.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { AppRoutingModule } from "../app-routing.module";

@NgModule({
  declarations: [
      HeaderbarComponent,
      FooterComponent,
      SidebarComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports : [
      HeaderbarComponent,
      FooterComponent,
      SidebarComponent,
      AppRoutingModule
  ],
  providers : [
    /*    {
    provide: HTTP_INTERCEPTORS,
    useClass: KeycloakInterceptorService,
    multi: true
  }*/
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only import Core modules in the AppModule only.');
    }
  }
}
