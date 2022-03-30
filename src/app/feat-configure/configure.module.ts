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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    NgbModule,
  ],
  entryComponents: [
    ServiceInteractionComponent,
  ],
})
export class ConfigureModule { }
