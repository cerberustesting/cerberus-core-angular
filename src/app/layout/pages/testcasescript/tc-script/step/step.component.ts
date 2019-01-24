import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IStep } from 'src/app/model/testcase.model';
import { IInvariant } from 'src/app/model/invariants.model';
import { CrossReference } from 'src/app/model/crossreference.model';
import { InvariantsService } from 'src/app/services/crud/invariants.service';
import { CrossreferenceService } from 'src/app/services/utils/crossreference.service';
import { SettingsService } from '../settings/settings.service';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

  @Input('step') step: IStep;
  showActionList: boolean;

  constructor(
    private SettingsService: SettingsService
  ) { }

  ngOnInit() { this.step.toDelete = false; }

  focusOnStep(): void {
    // send the step to the settings service and thus, to the settings component
    this.SettingsService.editStepSettings(this.step);
    this.showActionList = !this.showActionList;
  }

  clearFocus(): void {
    console.log("focus out");
    //this.SettingsService.clearFocus();
  }

}
