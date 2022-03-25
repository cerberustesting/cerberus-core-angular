// @angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Modules
import { ConfigureRoutingModule } from './configure-routing.module';
import { SharedModule } from '../shared/shared.module';

// Components
import { ServiceLibraryComponent } from './servicelibrary/servicelibrary.component';
import { ServiceInteractionComponent } from './servicelibrary/service-interaction/service-interaction.component';

@NgModule({
  declarations: [
    ServiceLibraryComponent,
    ServiceInteractionComponent,
  ],
  imports: [
    CommonModule,
    ConfigureRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    ServiceInteractionComponent,
  ],
})
export class ConfigureModule { }
