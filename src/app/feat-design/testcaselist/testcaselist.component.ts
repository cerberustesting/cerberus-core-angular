import { Component, OnInit } from '@angular/core';
import { TestService } from '../../core/services/crud/test.service';
import { ITestCaseHeader } from '../../shared/model/testcase.model';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';
import { Column } from 'src/app/shared/model/column.model';
import { LabelfilteringPipe } from 'src/app/shared/pipes/labelfiltering.pipe';
import { Filter } from 'src/app/shared/model/filter.model';
import { SystemService } from 'src/app/core/services/crud/system.service';
import { FilterService } from 'src/app/core/services/crud/filter.service';




@Component({
  selector: 'app-testcaselist',
  templateUrl: './testcaselist.component.html',
  styleUrls: ['./testcaselist.component.scss']
})
export class TestcaselistComponent implements OnInit {

  rows = [];
  columns: Array<Column> = [
    {
      displayName: 'Test Folder',
      databaseName: 'tec.test',
      contentName: 'test',
      active: true,
      searchable: true,
      like: true,
      dropActive: false,
      param: {
        multiple: true,
        field: 'test',
        placeholder: 'Select test',
      },
      sSearch: []

    },
    {
      displayName: 'TestCase ID',
      databaseName: 'tec.testcase',
      contentName: 'testCase',
      active: true,
      like: true,
      dropActive: false,

    }, ///
    {
      displayName: 'Status',
      databaseName: 'tec.status',
      contentName: 'status',
      active: true,
      searchable: true,
      dropActive: false,
      param: {
        multiple: true,
        field: 'status',
        placeholder: 'Select status',
      },
      sSearch: []

    },
    {
      displayName: 'Application',
      databaseName: 'tec.application',
      contentName: 'application',
      active: true,
      searchable: true,
      dropActive: false,
      param: {
        multiple: true,
        field: 'application',
        placeholder: 'Select applications',
      },
      sSearch: []


    },
    {
      displayName: 'Description',
      databaseName: 'tec.description',
      contentName: 'description',
      width: 300,
      active: true,
      dropActive: false,
      like: true,
      param: {
        multiple: true,
        field: 'description',
        placeholder: 'Search Description...',
      },
      sSearch: []

    },
    {
      displayName: 'System',
      databaseName: 'app.system',
      contentName: 'system',
      active: true,
      dropActive: false,
      searchable: true,
      param: {
        multiple: true,
        field: 'description',
        placeholder: 'Search Description...',
      },
      sSearch: []

    },
    {
      displayName: 'Global Activation',
      databaseName: 'tec.tcactive',
      contentName: 'tcActive',
      searchable: true,
      active: true,
      dropActive: false,
      type: 'boolean',
      param: {
        multiple: true,
        field: 'tcActive',
        placeholder: 'Select Gloabl Activation',
      },
      sSearch: []

    },
    {
      displayName: 'Priority',
      databaseName: 'tec.priority',
      contentName: 'priority',
      active: true,
      dropActive: false,
      searchable: true,
      param: {
        multiple: true,
        field: 'priority',
        placeholder: 'Select Priority',
      },
      sSearch: []

    },
    {
      displayName: 'CountryList',
      databaseName: '',
      contentName: 'countryList',
      width: 200,
      dropActive: false,
      active: false,
      searchable: true,
      param: {
        multiple: true,
        field: 'countryList',
        placeholder: 'Select Country',
      },
      sSearch: []

    },
    {
      displayName: 'Labels',
      databaseName: 'lab.label',
      contentName: 'labels',
      type: 'label',
      active: true,
      sortable: false,
      searchable: true,
      dropActive: false,
      param: {
        multiple: true,
        field: 'label',
        placeholder: 'Select labels',
      },
      sSearch: []


    },
    /****/
    {
      displayName: 'Stickers',
      databaseName: 'lab.labelsSTICKER',
      contentName: 'labelsSTICKER',
      type: 'label',
      active: false,
      sortable: false,
      dropActive: false,
      param: {
        multiple: true,
        field: 'labelsSTICKER',
        placeholder: 'Select Stickers',
      },
      sSearch: []

    },//
    {
      displayName: 'Requirements',
      databaseName: 'lab.labelsREQUIREMENT',
      contentName: 'labelsREQUIREMENT',
      type: 'label',
      active: false,
      dropActive: false,
      sortable: false,

      param: {
        multiple: true,
        field: 'labelsREQUIREMENT',
        placeholder: 'Select Requirement',
      },
      sSearch: []

    },//
    {
      displayName: 'Batteries',
      databaseName: 'lab.labelsBATTERY',
      contentName: 'labelsBATTERY',
      type: 'label',
      active: false,
      dropActive: false,
      sortable: false
    },//
    {
      displayName: 'QA Activation',
      databaseName: 'tec.tcactive',
      contentName: 'activePROD',
      active: false,
      dropActive: false,
      type: 'boolean'
    },
    {
      displayName: 'UAT Activation',
      databaseName: 'tec.tcactive',
      contentName: 'activeQA',
      active: false,
      dropActive: false,
      type: 'boolean'
    },
    {
      displayName: 'PROD Activation',
      databaseName: 'tec.tcactive',
      contentName: 'activeUAT',
      active: false,
      dropActive: false,
      type: 'boolean'
    },
    {
      displayName: 'Function',
      databaseName: 'tec.function',
      contentName: 'function',
      active: false,
      dropActive: false,
      like: true,

      param: {
        multiple: true,
        field: 'function',
        placeholder: 'Select Function',
      },
      sSearch: []

    },
    {
      displayName: 'Project',
      databaseName: 'tec.project',
      contentName: 'Project',
      dropActive: false,
      active: false,

      param: {
        multiple: true,
        field: 'Project',
        placeholder: 'Select Project',
      },
      sSearch: []

    },
    {
      displayName: 'Origine',
      databaseName: 'tec.origine',
      contentName: 'origine',
      dropActive: false,
      active: false,

      param: {
        multiple: true,
        field: 'origine',
        placeholder: 'Select Origine',
      },
      sSearch: []

    },
    {
      displayName: 'Reference Origine',
      databaseName: 'tec.refOrigine',
      contentName: 'refOrigin',
      active: false,
      dropActive: false,
      like: true,
      param: {
        multiple: true,
        field: 'refOrigin',
        placeholder: 'Select Reference Origine',
      },
      sSearch: []

    },
    {
      displayName: 'Type',
      databaseName: 'tec.group',
      contentName: 'group',
      searchable: true,
      active: false,
      param: {
        multiple: true,
        field: 'group',
        placeholder: 'Select Type',
      },
      sSearch: []

    },
    {
      displayName: 'Date Created',
      databaseName: 'tec.dateCreated',
      contentName: 'dateCreated',
      active: false,
      dropActive: false,
      like: true,
      param: {
        multiple: true,
        field: 'dateCreated',
        placeholder: 'Select Date Created',
      },
      sSearch: []

    },
    {
      displayName: 'User Created',
      databaseName: 'tec.usrCreated',
      contentName: 'usrCreated',
      dropActive: false,
      searchable: true,
      active: false,
      param: {
        multiple: true,
        field: 'user',
        placeholder: 'Select User',
      },
      sSearch: []

    },
    {
      displayName: 'TestCase Version',
      databaseName: 'tec.testCaseVersion',
      contentName: 'testCaseVersion',
      dropActive: false,
      active: false,
      param: {
        multiple: true,
        field: 'testCaseVersion',
        placeholder: 'Select TestCase Version',
      },
      sSearch: []

    },
    {
      displayName: 'Date Modification',
      databaseName: 'tec.dateModif',
      contentName: 'dateModif',
      active: false,
      dropActive: false,
      like: true,
      param: {
        multiple: true,
        field: 'dateModif',
        placeholder: 'Select Date Modification',
      },
      sSearch: []

    },
    {
      displayName: 'User Modification',
      databaseName: 'tec.usrModif',
      contentName: 'usrModif',
      dropActive: false,
      active: false,
      param: {
        multiple: true,
        field: 'usrModif',
        placeholder: 'Select User Modification',
      },
      sSearch: []

    },];

  page = {
    size: 10, //maximum element per page
    number: 0, //number of current page
    sort: [{dir: "asc", prop : "testcase"}],
    totalCount: 0 //total count of element in database
  };

  selectedTest = '';
  // searchTerm =  { $or: [{ testCase: '' }, { status: '' }, { application: '' }, { description: '' }, { system: '' }] };

  filterTest: any;
  testcasesList: Array<ITestCaseHeader>;
  filterList: Array<Filter> = [];

  constructor(private testService: TestService, private invariantsService: InvariantsService, private labelfilteringPipe: LabelfilteringPipe, private systemService: SystemService, private filterService: FilterService) { }

  ngOnInit() {

    this.testService.getTestCasesList(this.selectedTest, this.invariantsService.systemsSelected, this.page.size, this.page.number);

    this.testService.observableTestCasesList.subscribe(response => {
      if (response) {
        if (response.length > 0) {
          this.testcasesList = response;
        }
      } else {
        this.testcasesList = null;
      }
    });
    this.testService.observableTestCasesListLength.subscribe(response => {
      if (response) {
        this.page.totalCount = response;
      }
    });

  }

  updateTest(selection) {
    this.filterTest = selection;
    this.testService.getTestCasesList(this.filterTest, this.invariantsService.systemsSelected);
  }

  appplySystemChange() {
    if (this.page.size == null) this.page.size = 10;
    this.search()
    // if(this.filterList.length > 0) {
    //   this.testService.getTestCasesFilterList(this.page.size, this.filterList);
    // }else {
    //   this.testService.getTestCasesList(this.selectedTest, this.invariantsService.systemsSelected, this.page.size, this.page.number);
    // }

  }

  pageUpdate(newPage) { //When selecting a new page    
    this.page.number = newPage;
    this.appplySystemChange();
  }

  save() {
    console.log('Not implemented yet');
  }

  load() {
    console.log('Not implemented yet');
  }

  search() {
    this.testService.getTestCasesFilterList(this.filterService.generateQueryStringParameters(this.columns, this.page));
  }

}
