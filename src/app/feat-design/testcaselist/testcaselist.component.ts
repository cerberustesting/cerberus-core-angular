import { Component, OnInit} from '@angular/core';
import {TestService} from '../../core/services/crud/test.service';
import {ITestCaseHeader} from '../../shared/model/testcase.model';
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
      filterItem: {
        param: {
          multiple: true,
          field: 'test',
          placeholder: 'Select test',
          bindLabel: 'test',
          bindValue: 'test',
        },
        sSearch: []
      } 
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
      filterItem: {
        param: {
          multiple: true,
          field: 'status',
          placeholder: 'Select status',
          bindLabel: '',
          bindValue: 'value',
        },
      sSearch: []
      } 
    },
    { 
      displayName: 'Application', 
      databaseName: 'tec.application', 
      contentName: 'application', 
      active: true,
      searchable: true,
      dropActive: false,
      filterItem: {
        param: {
          multiple: true,
          field: 'application',
          placeholder: 'Select applications',
          bindLabel: 'application',
          bindValue: 'application',
        },
        sSearch: []
      } 
      
    },
    { 
      displayName: 'Description', 
      databaseName: 'tec.description', 
      contentName: 'description', 
      width: 300, 
      active: true,
      dropActive: false,
      like: true 
    },
    { 
      displayName: 'System', 
      databaseName: 'app.system', 
      contentName: 'system', 
      active: true,
      dropActive: false,
      searchable: true
    },
    { 
      displayName: 'Global Activation', 
      databaseName: 'tec.tcactive', 
      contentName: 'tcActive', 
      searchable: true,
      active: true,
      dropActive: false,
    },
    { 
      displayName: 'Priority', 
      databaseName: 'tec.priority', 
      contentName: 'priority', 
      active: true,
      dropActive: false,
      searchable: true
    },
    { 
      displayName: 'CountryList', 
      databaseName: '', 
      contentName: 'countryList', 
      width: 200, 
      dropActive: false,
      active: false 
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
      filterItem: {
        param: {
          multiple: true,
          field: 'label',
          placeholder: 'Select labels',
          bindLabel: 'label',
          bindValue: 'label',
        },
        sSearch: []
      }
      
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
    },//
    { 
      displayName: 'Requirements', 
      databaseName: 'lab.labelsREQUIREMENT', 
      contentName: 'labelsREQUIREMENT', 
      type: 'label', 
      active: false, 
      dropActive: false,
      //displayContentFunction: testcase => "not implemented yet",
      sortable: false
    },//
    { 
      displayName: 'Batteries', 
      databaseName: 'lab.labelsBATTERY', 
      contentName: 'labelsBATTERY', 
      type: 'label', 
      active: false, 
      dropActive: false,
      //displayContentFunction: testcase => "not implemented yet",
      sortable: false 
    },//
    { 
      displayName: 'QA Activation', 
      databaseName: 'tec.tcactive', 
      contentName: 'activePROD', 
      active: false,
      dropActive: false,
    },
    { 
      displayName: 'UAT Activation', 
      databaseName: 'tec.tcactive', 
      contentName: 'activeQA', 
      active: false,
      dropActive: false,
    },
    { 
      displayName: 'PROD Activation', 
      databaseName: 'tec.tcactive', 
      contentName: 'activeUAT', 
      active: false,
      dropActive: false,
    },

    // (testcase.activePROD === "Y" && testcase.activeQA === "Y" && testcase.activeUAT === "Y")? "Yes" : "No" }
    { 
      displayName: 'Function', 
      databaseName: 'tec.function', 
      contentName: 'function', 
      active: false,
      dropActive: false,
      like: true 
    },
    { 
      displayName: 'Project', 
      databaseName: 'tec.project', 
      contentName: 'Project', 
      dropActive: false,
      active: false 
    },
    { 
      displayName: 'Origine', 
      databaseName: 'tec.origine', 
      contentName: 'origine', 
      dropActive: false,
      active: false 
    },
    { 
      displayName: 'Reference Origine', 
      databaseName: 'tec.refOrigine', 
      contentName: 'refOrigin', 
      active: false,
      dropActive: false,
      like: true
    },
    { 
      displayName: 'Type', 
      databaseName: 'tec.group', 
      contentName: 'group', 
      searchable: true,
      active: false 
    },
    { 
      displayName: 'Date Created', 
      databaseName: 'tec.dateCreated', 
      contentName: 'dateCreated', 
      active: false,
      dropActive: false,
      like: true
    },
    { 
      displayName: 'User Created', 
      databaseName: 'tec.usrCreated', 
      contentName: 'usrCreated', 
      dropActive: false,
      searchable: true,
      active: false,
      filterItem: {
        param: {
          multiple: true,
          field: 'user',
          placeholder: 'Select User',
          bindLabel: 'user',
          bindValue: 'user',
        },
        sSearch: []
      }
    },
    { 
      displayName: 'TestCase Version', 
      databaseName: 'tec.testCaseVersion', 
      contentName: 'testCaseVersion', 
      dropActive: false,
      active: false 
    },
    { 
      displayName: 'Date Modification', 
      databaseName: 'tec.dateModif', 
      contentName: 'dateModif', 
      active: false,
      dropActive: false,
      like: true
    },
    { 
      displayName: 'User Modification', 
      databaseName: 'tec.usrModif', 
      contentName: 'usrModif', 
      dropActive: false,
      active: false 
    },  ];

  page =  {
    size: 10, //maximum element per page
    number: 0, //number of current page
    totalCount: 0 //total count of element in database
  };
  filterMenus = [];

  selectedTest = '';
  // searchTerm =  { $or: [{ testCase: '' }, { status: '' }, { application: '' }, { description: '' }, { system: '' }] };

  filterTest: any;
  testcasesList: Array<ITestCaseHeader>;
  filterList: Array<Filter> = [];

  constructor( private testService: TestService, private invariantsService: InvariantsService, private labelfilteringPipe: LabelfilteringPipe, private systemService: SystemService, private filterService: FilterService ) { }

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

  // updateSearch(search) {
  //   this.searchTerm.$or[0].testCase = search;
  //   this.searchTerm.$or[1].status = search;
  //   this.searchTerm.$or[2].application = search;
  //   this.searchTerm.$or[3].description = search;
  //   this.searchTerm.$or[4].system = search;
  //   console.log(this.searchTerm);
  // }

  appplySystemChange() {
    if (this.page.size == null) this.page.size = 10;
    this.search();
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
  addFilterMenu(filterItem) {
    console.log("filterItem :", filterItem);
    this.filterMenus.push(filterItem);
  }

  search() {
    // this.filterService.addfilter("group", "AUTOMATED");
    // this.filterService.addfilter("status", "CREATED");

    let query = this.filterService.generateQueryStringParameters(this.columns, this.page);
    console.log("query parameters :", query);
    this.testService.getTestCasesFilterList(query);
    

    // this.testService.getTestCasesFilterList(this.page.size, this.filterList);


    // let str = "";
    // let formData = {
    //   "sEcho": 1, //
    //   "iColumns": this.columns.length,
    //   "sColumns": this.columns.map(column => column.databaseName).join(','),
    //   "iDisplayStart": this.page.number,
    //   "iDaisplayLength": this.page.size,
    // }
    // for (let column in this.columns) {
    //   formData["mDataProp_" + column] = this.columns[column].contentName;
    //   formData["sSearch_" + column] = '';
    //   formData["bRegex_" + column] = false;
    //   formData["bSearchable_" + column] = (this.columns[column].like)? true : false;
    //   formData["bSortable_" + column] = (this.columns[column].sortable)? true : false;
    // }
    // formData["iSortCol_0"]=0;
    // formData["sSortDir_0"]='asc';
    // formData["iSortingCols"]= 1;
    // formData["sLike"]= 'tec.testCase,tec.description,tec.function,tec.refOrigine,tec.dateCreated,tec.dateModif';
    // for(let item in formData){
    //   str+= encodeURIComponent(item) + '=' + encodeURIComponent(formData[item]) + '&'
    // }
    // // str="sEcho=3&iColumns=38&sColumns=%2C%2Ctec.test%2Ctec.testCase%2Ctec.description%2Clab.label%2Clab.labelsSTICKER%2Clab.labelsREQUIREMENT%2Clab.labelsBATTERY%2Ctec.status%2Ctec.application%2Capp.system%2Ctec.tcactive%2Ctec.priority%2Ctec.function%2Ctec.project%2Ctec.origine%2Ctec.refOrigine%2Ctec.group%2Ctec.dateCreated%2Ctec.usrCreated%2Ctec.testCaseVersion%2Ctec.dateModif%2Ctec.usrModif%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C&iDisplayStart=0&iDisplayLength=25&mDataProp_0=&sSearch_0=&bRegex_0=false&bSearchable_0=false&bSortable_0=false&mDataProp_1=&sSearch_1=&bRegex_1=false&bSearchable_1=false&bSortable_1=false&mDataProp_2=test&sSearch_2=&bRegex_2=false&bSearchable_2=true&bSortable_2=true&mDataProp_3=testCase&sSearch_3=&bRegex_3=false&bSearchable_3=true&bSortable_3=true&mDataProp_4=description&sSearch_4=&bRegex_4=false&bSearchable_4=true&bSortable_4=true&mDataProp_5=labels&sSearch_5=&bRegex_5=false&bSearchable_5=true&bSortable_5=false&mDataProp_6=labelsSTICKER&sSearch_6=&bRegex_6=false&bSearchable_6=true&bSortable_6=false&mDataProp_7=labelsREQUIREMENT&sSearch_7=&bRegex_7=false&bSearchable_7=true&bSortable_7=false&mDataProp_8=labelsBATTERY&sSearch_8=&bRegex_8=false&bSearchable_8=true&bSortable_8=false&mDataProp_9=status&sSearch_9=&bRegex_9=false&bSearchable_9=true&bSortable_9=true&mDataProp_10=application&sSearch_10=&bRegex_10=false&bSearchable_10=true&bSortable_10=true&mDataProp_11=system&sSearch_11=&bRegex_11=false&bSearchable_11=true&bSortable_11=true&mDataProp_12=tcActive&sSearch_12=&bRegex_12=false&bSearchable_12=true&bSortable_12=true&mDataProp_13=priority&sSearch_13=&bRegex_13=false&bSearchable_13=true&bSortable_13=true&mDataProp_14=function&sSearch_14=&bRegex_14=false&bSearchable_14=true&bSortable_14=true&mDataProp_15=project&sSearch_15=&bRegex_15=false&bSearchable_15=true&bSortable_15=true&mDataProp_16=origine&sSearch_16=&bRegex_16=false&bSearchable_16=true&bSortable_16=true&mDataProp_17=refOrigine&sSearch_17=&bRegex_17=false&bSearchable_17=true&bSortable_17=true&mDataProp_18=group&sSearch_18=&bRegex_18=false&bSearchable_18=true&bSortable_18=true&mDataProp_19=dateCreated&sSearch_19=&bRegex_19=false&bSearchable_19=true&bSortable_19=true&mDataProp_20=usrCreated&sSearch_20=&bRegex_20=false&bSearchable_20=true&bSortable_20=true&mDataProp_21=testCaseVersion&sSearch_21=&bRegex_21=false&bSearchable_21=true&bSortable_21=true&mDataProp_22=dateModif&sSearch_22=&bRegex_22=false&bSearchable_22=true&bSortable_22=true&mDataProp_23=usrModif&sSearch_23=&bRegex_23=false&bSearchable_23=true&bSortable_23=true&mDataProp_24=function&sSearch_24=&bRegex_24=false&bSearchable_24=false&bSortable_24=false&mDataProp_25=function&sSearch_25=&bRegex_25=false&bSearchable_25=false&bSortable_25=false&mDataProp_26=function&sSearch_26=&bRegex_26=false&bSearchable_26=false&bSortable_26=false&mDataProp_27=function&sSearch_27=&bRegex_27=false&bSearchable_27=false&bSortable_27=false&mDataProp_28=function&sSearch_28=&bRegex_28=false&bSearchable_28=false&bSortable_28=false&mDataProShow more";
    // str="sEcho=5&iColumns=38&sColumns=%2C%2Ctec.test%2Ctec.testCase%2Ctec.description%2Clab.label%2Clab.labelsSTICKER%2Clab.labelsREQUIREMENT%2Clab.labelsBATTERY%2Ctec.status%2Ctec.application%2Capp.system%2Ctec.tcactive%2Ctec.priority%2Ctec.function%2Ctec.project%2Ctec.origine%2Ctec.refOrigine%2Ctec.group%2Ctec.dateCreated%2Ctec.usrCreated%2Ctec.testCaseVersion%2Ctec.dateModif%2Ctec.usrModif%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C&iDisplayStart=0&iDisplayLength=25&mDataProp_0=&sSearch_0=&bRegex_0=false&bSearchable_0=false&bSortable_0=false&mDataProp_1=&sSearch_1=&bRegex_1=false&bSearchable_1=false&bSortable_1=false&mDataProp_2=test&sSearch_2=ANDROID%2CAfricashop%2CAnzin+-+Stocks&bRegex_2=false&bSearchable_2=true&bSortable_2=true&mDataProp_3=testCase&sSearch_3=&bRegex_3=false&bSearchable_3=true&bSortable_3=true&mDataProp_4=description&sSearch_4=to&bRegex_4=false&bSearchable_4=true&bSortable_4=true&mDataProp_5=labels&sSearch_5=&bRegex_5=false&bSearchable_5=true&bSortable_5=false&mDataProp_6=labelsSTICKER&sSearch_6=&bRegex_6=false&bSearchable_6=true&bSortable_6=false&mDataProp_7=labelsREQUIREMENT&sSearch_7=&bRegex_7=false&bSearchable_7=true&bSortable_7=false&mDataProp_8=labelsBATTERY&sSearch_8=&bRegex_8=false&bSearchable_8=true&bSortable_8=false&mDataProp_9=status&sSearch_9=&bRegex_9=false&bSearchable_9=true&bSortable_9=true&mDataProp_10=application&sSearch_10=&bRegex_10=false&bSearchable_10=true&bSortable_10=true&mDataProp_11=system&sSearch_11=&bRegex_11=false&bSearchable_11=true&bSortable_11=true&mDataProp_12=tcActive&sSearch_12=&bRegex_12=false&bSearchable_12=true&bSortable_12=true&mDataProp_13=priority&sSearch_13=&bRegex_13=false&bSearchable_13=true&bSortable_13=true&mDataProp_14=function&sSearch_14=&bRegex_14=false&bSearchable_14=true&bSortable_14=true&mDataProp_15=project&sSearch_15=&bRegex_15=false&bSearchable_15=true&bSortable_15=true&mDataProp_16=origine&sSearch_16=&bRegex_16=false&bSearchable_16=true&bSortable_16=true&mDataProp_17=refOrigine&sSearch_17=&bRegex_17=false&bSearchable_17=true&bSortable_17=true&mDataProp_18=group&sSearch_18=&bRegex_18=false&bSearchable_18=true&bSortable_18=true&mDataProp_19=dateCreated&sSearch_19=&bRegex_19=false&bSearchable_19=true&bSortable_19=true&mDataProp_20=usrCreated&sSearch_20=&bRegex_20=false&bSearchable_20=true&bSortable_20=true&mDataProp_21=testCaseVersion&sSearch_21=&bRegex_21=false&bSearchable_21=true&bSortable_21=true&mDataProp_22=dateModif&sSearch_22=&bRegex_22=false&bSearchable_22=true&bSortable_22=true&mDataProp_23=usrModif&sSearch_23=&bRegex_23=false&bSearchable_23=true&bSortable_23=true&mDataProp_24=function&sSearch_24=&bRegex_24=false&bSearchable_24=false&bSortable_24=false&mDataProp_25=function&sSearch_25=&bRegex_25=false&bSearchable_25=false&bSortable_25=false&mDataProp_26=function&sSearch_26=&bRegex_26=false&bSearchable_26=false&bSortable_26=false&mDataProp_27=function&sSearch_27=&bRegex_27=false&bSearchable_27=false&bSortable_27=false&mDataProp_28=function&sSearch_28=&bRegex_28=false&bSearchabShow more"
    // //str = str.replace(",", "%2C");
    // this.testService.filtreTestCase(str).subscribe((response) => {
    //   console.log('response : ',response);
      
    // })
  }

}
