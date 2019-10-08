import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DatatableComponent } from './datatable-page/datatable/datatable.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrueindexPipe } from './pipes/trueindex.pipe';
import { UniqueproplistPipe } from './pipes/uniqueproplist.pipe';
import { LabelfilteringPipe } from './pipes/labelfiltering.pipe';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatatablePageComponent } from './datatable-page/datatable-page.component';
import { FiltersComponent } from './datatable-page/filters/filters.component';
import { FilterComponent } from './datatable-page/utils/filter/filter.component';
import { RunComponent } from './run/run.component';
import { CustomModalComponent } from './custom-modal/custom-modal.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationsComponent } from './notifications/notifications.component';
import { DatatableFilterTmpDirective, DatatableMassActionTmpDirective, DatatableEndLineActionDirective } from './datatable-page/directives/datatable.directive';

@NgModule({
  declarations: [
    DatatableComponent,
    TrueindexPipe,
    UniqueproplistPipe,
    LabelfilteringPipe,
    DatatablePageComponent,
    FiltersComponent,
    FilterComponent,
    RunComponent,
    CustomModalComponent,
    NotificationsComponent,
    DatatableFilterTmpDirective,
    DatatableMassActionTmpDirective,
    DatatableEndLineActionDirective
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    NgxDatatableModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatSnackBarModule
  ],
  entryComponents: [
    CustomModalComponent
  ],
  exports: [
    NgSelectModule,
    DatatableComponent,
    FormsModule,
    TrueindexPipe,
    UniqueproplistPipe,
    LabelfilteringPipe,
    NgbPopoverModule,
    FiltersComponent,
    DatatablePageComponent,
    NotificationsComponent,
    DatatableFilterTmpDirective,
    DatatableMassActionTmpDirective,
    DatatableEndLineActionDirective
  ],
  providers: [
    TrueindexPipe,
    LabelfilteringPipe
  ]
})
export class SharedModule { }
