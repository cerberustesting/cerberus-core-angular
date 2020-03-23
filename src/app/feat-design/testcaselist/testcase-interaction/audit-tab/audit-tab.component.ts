import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TestCase } from 'src/app/shared/model/back/testcase/testcase.model';

@Component({
  selector: 'app-audit-tab',
  templateUrl: './audit-tab.component.html',
  styleUrls: ['./audit-tab.component.scss']
})
export class AuditTabComponent implements OnInit {

  /** audit form group */
  @Input('audit') audit: FormGroup;

  /** test case header object */
  @Input('testcaseheader') testcaseheader: TestCase;

  constructor() { }

  ngOnInit() {
  }

}
