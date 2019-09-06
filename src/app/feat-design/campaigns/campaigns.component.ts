import { Component, OnInit } from '@angular/core';
import { CampainsColumnsData } from './campaigns-columnsdata';
import { Column } from 'src/app/shared/model/column.model';
import { HeaderTitleService } from 'src/app/core/services/utils/header-title.service';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.scss']
})
export class CampaignsComponent implements OnInit {

  columns: Array<Column> = CampainsColumnsData; // column list  
  defaultPageSort = [{ dir: "asc", prop: "testCase" }];
  private selectedRows: Array<any> = [];
  servlet: string = '/ReadCampaign'

  constructor(private headerTitleService: HeaderTitleService) {
    headerTitleService.setTitle("Campaigns");
  }

  ngOnInit() {
  }

}
