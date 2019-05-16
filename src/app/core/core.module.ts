import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderbarComponent } from "./headerbar/headerbar.component";

@NgModule({
  declarations: [
      HeaderbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports : [
      HeaderbarComponent
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. You should only import Core modules in the AppModule only.');
    }
  }
}
