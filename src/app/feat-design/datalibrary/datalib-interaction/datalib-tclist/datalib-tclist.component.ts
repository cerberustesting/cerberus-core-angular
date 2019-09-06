import { Component, OnInit } from '@angular/core';
import { TestService } from 'src/app/core/services/crud/test.service';

@Component({
  selector: 'app-datalib-tclist',
  templateUrl: './datalib-tclist.component.html',
  styleUrls: ['./datalib-tclist.component.scss']
})
export class DatalibTclistComponent implements OnInit {

  // *** Inputs on calling SideContent ***
  private id: string; // datalib ID
  private name: string; // datalib name
  private country: string; // datalib country

  // ***  ***
  requestResponseTable: any; //the informations to display

  constructor(private testService: TestService) { }

  ngOnInit() {
    this.testService.getTestDataLib(this.id, this.name, this.country, response => {
      this.requestResponseTable = response.TestCasesList;    
      // format each testcase for initialize the link to testcase edition 
      this.requestResponseTable.forEach(test => {
        test[3].forEach(testcase => {
          testcase.link_test = encodeURIComponent(test[0]);
          testcase.link_testcase = encodeURIComponent(testcase.TestCaseNumber);
        });
      });
    });
  }

}
