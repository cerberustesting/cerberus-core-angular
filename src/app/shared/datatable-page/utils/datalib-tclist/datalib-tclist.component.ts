import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TestService } from 'src/app/core/services/crud/test.service';

@Component({
  selector: 'app-datalib-tclist',
  templateUrl: './datalib-tclist.component.html',
  styleUrls: ['./datalib-tclist.component.scss']
})
export class DatalibTclistComponent implements OnInit {
  id: string = '';
  name: string = '';
  country: string = '';
  requestResponseTable: any; 


  constructor(public activeModal: NgbActiveModal,private testService: TestService) { }

  ngOnInit() {
    this.testService.getTestDataLib(this.id, this.name, this.country, response => {
      console.log("ReadTestDataLib", response);
      this.requestResponseTable = response.TestCasesList;
    });
  }

}
