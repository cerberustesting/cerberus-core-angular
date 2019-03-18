import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { ITestCaseHeader } from 'src/app/model/testcase.model';
import {TestService} from '../../../services/crud/test.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnInit {
  @Input() dataSource: any = [];
  @Input() displayedColumns: any[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // dataSource = this.testcasesList;
  // displayedColumns: string[] = ['testCase', 'status', 'application', 'description'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor() {
  }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    console.log(this.dataSource);
  }
}



