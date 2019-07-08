import { Component, OnInit} from '@angular/core';
import {TestService} from '../../core/services/crud/test.service';
import {ITestCaseHeader} from '../../shared/model/testcase.model';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';
import { ColumnService } from './column.service';


@Component({
  selector: 'app-testcaselist',
  templateUrl: './testcaselist.component.html',
  styleUrls: ['./testcaselist.component.scss']
})
export class TestcaselistComponent implements OnInit {

  rows = [];
  columns: any;
  selectedTest = '';
  searchTerm =  { $or: [{ testCase: '' }, { status: '' }, { application: '' }, { description: '' }, { system: '' }] };
  filterTest: any;
  testcasesList: Array<ITestCaseHeader>;

  constructor( private testService: TestService, private invariantsService: InvariantsService, private columnService: ColumnService) { }

  ngOnInit() {
    this.testService.getTestCasesList(this.selectedTest, this.invariantsService.systemsSelected);

    this.columns = this.columnService.columns;  
    
    this.testService.observableTestCasesList.subscribe(response => {
      if (response) {
        if (response.length > 0) {
          this.testcasesList = response;
        }
      } else {
        this.testcasesList = null;
      }
    });
    this.invariantsService.observableSystemsSelected.subscribe(
      (systemsSelected: any[]) => {
        console.log("new system !");
        
        this.testService.getTestCasesList(this.selectedTest, systemsSelected);        
      }
    );

  }

  updateTest(selection) {
    this.filterTest = selection;
    this.testService.getTestCasesList(this.filterTest, this.invariantsService.systemsSelected);
  }
  updateSearch(search) {
    this.searchTerm.$or[0].testCase = search;
    this.searchTerm.$or[1].status = search;
    this.searchTerm.$or[2].application = search;
    this.searchTerm.$or[3].description = search;
    this.searchTerm.$or[4].system = search;
    console.log(this.searchTerm);
    }
}
