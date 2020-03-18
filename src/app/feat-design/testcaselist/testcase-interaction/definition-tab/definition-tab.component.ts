import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IApplication } from 'src/app/shared/model/application.model';
import { SystemService } from 'src/app/core/services/api/system.service';
import { Invariant } from 'src/app/shared/model/invariants.model';
import { InvariantsService } from 'src/app/core/services/api/invariants.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-definition-tab',
  templateUrl: './definition-tab.component.html',
  styleUrls: ['./definition-tab.component.scss']
})
export class DefinitionTabComponent implements OnInit {

  /** form section for definition tab fields */
  @Input('definition') definition: FormGroup;

  /** list of available applications */
  public applications: Array<IApplication>;

  // public invariants
  public statusList: Array<Invariant>;
  public priorities: Array<Invariant>;

  // private invariants
  public types: Array<Invariant>;

  /** detailled description value Editor object */
  public Editor = ClassicEditor;

  constructor(
    private systemService: SystemService,
    private invariantsService: InvariantsService) { }

  ngOnInit() {
    // subscribe to invariants list
    this.systemService.observableApplicationList.subscribe(rep => this.applications = rep);
    this.invariantsService.observablePriorities.subscribe(rep => this.priorities = rep);
    this.invariantsService.observableGroupsList.subscribe(rep => this.types = rep);
    this.invariantsService.observableTcStatus.subscribe(rep => this.statusList = rep);
  }

  getFromSystem() {
    // TODO : update the tc system when application changes
  }

}
