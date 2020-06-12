import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Application } from 'src/app/shared/model/back/application/application.model';
import { SystemService } from 'src/app/core/services/api/system.service';
import { Invariant } from 'src/app/shared/model/back/invariant/invariant.model';
import { InvariantsService } from 'src/app/core/services/api/invariants.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TestCase } from 'src/app/shared/model/back/testcase/testcase.model';

@Component({
  selector: 'app-definition-tab',
  templateUrl: './definition-tab.component.html',
  styleUrls: ['./definition-tab.component.scss']
})
export class DefinitionTabComponent implements OnInit {

  /** form section for definition tab fields */
  @Input('definition') definition: FormGroup;

  /** test case (header) object */
  @Input('testcaseheader') testcaseheader: TestCase;

  /** list of available applications */
  public applications: Array<Application>;

  // public invariants
  public statusList: Array<Invariant>;
  public priorities: Array<Invariant>;

  // private invariants
  public types: Array<Invariant>;

  /** detailled description value Editor object */
  public Editor = ClassicEditor;

  constructor(
    private systemService: SystemService,
    private invariantsService: InvariantsService
  ) { }

  ngOnInit() {
    // subscribe to invariants list
    this.invariantsService.observablePriorities.subscribe(rep => this.priorities = rep);
    this.invariantsService.observableGroupsList.subscribe(rep => this.types = rep);
    this.invariantsService.observableTcStatus.subscribe(rep => this.statusList = rep);
    // fetch the list of applications for all the systems
    this.systemService.getApplicationList((applications => {
      this.applications = applications;
    }), undefined, undefined, undefined);
  }

  getFromSystem() {
    // TODO : update the tc system when application changes
  }

}
