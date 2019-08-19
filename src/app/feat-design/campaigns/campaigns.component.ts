import { Component, OnInit } from '@angular/core';
import { CampainsColumnsData } from './campaigns-columnsdata';
import { Column } from 'src/app/shared/model/column.model';
import { HeaderTitleService } from 'src/app/core/services/crud/header-title.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {

  columns: Array<Column> = CampainsColumnsData; // column list
  
  page = {
    size: 0, //maximum element per page
    number: 1, //number of current page
    sort: [{dir: "asc", prop : "testCase"}], //sort item
    totalCount: 0 //total count of element in database
  };
  selectedRows: Array<any> = [];
  servlet :string = '/ReadCampaign'

  constructor(private headerTitleService: HeaderTitleService) { 
    headerTitleService.setTitle("Campaigns");
  }

  ngOnInit() {
  }

}
