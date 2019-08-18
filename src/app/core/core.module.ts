import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderbarComponent } from "./headerbar/headerbar.component";
import { FooterComponent } from "./footer/footer.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { AppRoutingModule } from "../app-routing.module";
import { PagenotfoundComponent } from "./pagenotfound/pagenotfound.component";
import { SharedModule } from '../shared/shared.module';
import { SideblockComponent } from './sideblock/sideblock.component';
import { RunComponent } from '../shared/run/run.component';
import { NotificationsComponent } from '../shared/notifications/notifications.component';

@NgModule({
  declarations: [
    HeaderbarComponent,
    FooterComponent,
    SidebarComponent,
    PagenotfoundComponent,
    SideblockComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    SharedModule
  ],
  exports: [
    HeaderbarComponent,
    FooterComponent,
    SidebarComponent,
    AppRoutingModule,
    SideblockComponent
  ],
  providers: [],
  entryComponents: [
    RunComponent,
    NotificationsComponent
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only import Core modules in the AppModule only.');
    }
  }
}
