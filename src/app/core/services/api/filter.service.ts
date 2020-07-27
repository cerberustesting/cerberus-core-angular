import { Injectable, EventEmitter } from '@angular/core';
import { Column } from 'src/app/shared/model/front/column.model';
import { InvariantsService } from './invariants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { TestCase } from 'src/app/shared/model/back/testcase/testcase.model';
import { UserService } from './user.service';
import tcs from 'src/assets/data/mock/testcases.json';
import tfs from 'src/assets/data/mock/testfolders.json';
import { GlobalService } from '../utils/global.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  })
};

export class ActiveFilter {

  // event for datatable component to refresh its content
  observableRefreshTestCaseList = new EventEmitter<void>(null);

  filter: string; // filter key
  values: Array<any>; // option(s) selected for dropdown
  term: string; // search term for filter like
  mode: string; // filter mode (SEARCH_FIELD or DROPDOWN)

  constructor(filter: string, values: Array<any>, term: string, mode: string) {
    this.filter = filter;
    this.values = values;
    this.term = term;
    this.mode = mode;
  }
}

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  // obsolete
  private tableContent: Array<any>;

  // TODO: function to reset the variables (when browsing another page)

  private activeFiltersList: Array<ActiveFilter>;

  observableActiveFiltersList = new BehaviorSubject<ActiveFilter[]>(this.activeFiltersList);

  // event for datatable component to refresh its content
  refreshContentEvent = new EventEmitter<void>(null);

  constructor(
    private globalService: GlobalService,
    private http: HttpClient,
    private userService: UserService) {
    this.activeFiltersList = new Array<ActiveFilter>();
  }

  /**
  * returns all datatable filters in a url-encoded string (to send to API)
  * @params columnList : list of columns and their values
  * @params pageInformation : information on the current page
  * @params globalSearch : quick search keyword
 */
  // TODO : pass the systems as an input
  generateQueryStringParameters(
    columnList: Array<Column>,
    pageInformation: { size: number, sort: any, number: number, totalCount: number },
    globalSearch: string
  ): string {
    let queryParameter = '';
    const formData = {};
    const columnListWithActiveFilter = columnList.filter(e => e.sSearch)
      .filter(e => e.sSearch.length !== 0 ||
        e.contentName === pageInformation.sort[0].prop ||
        e.contentName === 'system');
    // contaign all columns to filter&sort

    // generate request header

    // ? 'sEcho'

    formData['iDisplayStart'] = pageInformation.number * pageInformation.size; // first element index
    formData['iDisplayLength'] = pageInformation.size; // number of elements
    const sortCol = columnListWithActiveFilter.map(a => a.contentName).indexOf(pageInformation.sort[0].prop);
    if (sortCol >= 0) {
      formData['iSortCol_0'] = sortCol; // column to sort
      formData['sSortDir_0'] = pageInformation.sort[0].dir; // sort direction
    }
    if (globalSearch !== '') { formData['sSearch'] = globalSearch; } // value in global search field
    if (columnListWithActiveFilter.length > 0) {
      formData['sColumns'] = columnListWithActiveFilter.map(column => column.apiName).join(','); // list of columns to filter&sort
      // ? 'iColumns'
      for (const column in columnListWithActiveFilter) {

        if (columnListWithActiveFilter[column].type === 'label') {
          formData['sSearch_' + column] = (columnListWithActiveFilter[column].sSearch) ? columnListWithActiveFilter[column].sSearch.map(a => a.label).join(',') : ''; // value(s) to filter (only label)
        } else if (columnListWithActiveFilter[column].contentName === 'system') {
          const systemByFilter = ((columnListWithActiveFilter[column].sSearch.length !== 0) ? columnListWithActiveFilter[column].sSearch.join(',') : '');
          let systemByService;
          if (this.userService.user.defaultSystem) {
            const systemByFilterRaw = new Array<String>();
            if (this.userService.user.defaultSystem.length !== 0) {
              this.userService.user.defaultSystem.forEach(system => {
                systemByFilterRaw.push(system);
              });
              systemByService = ',' + systemByFilterRaw.join(',');
            } else {
              systemByService = ''; // prevent sending 'undefined' if no system are selected
            }
          } else {
            systemByService = '';
          }
          formData['sSearch_' + column] = systemByFilter + ((systemByFilter !== '' && systemByService !== '') ? ',' : '') + systemByService; // value(s) to filter
        } else {
          if (columnListWithActiveFilter[column].filterMode === 'SEARCH_FIELD') {
            formData['sSearch_' + column] = columnListWithActiveFilter[column].sSearch;
          } else if (columnListWithActiveFilter[column].multiple === false) {
            formData['sSearch_' + column] = columnListWithActiveFilter[column].sSearch;
          } else {
            formData['sSearch_' + column] = (columnListWithActiveFilter[column].sSearch) ? columnListWithActiveFilter[column].sSearch.join(',') : ''; // value(s) to filter
          }
        }
        // ? 'mDataProp_'
        // ? 'bRegex_'
        // ? 'bSearchable_'
        // ? 'bSortable_'
      }
      formData['sLike'] = columnListWithActiveFilter.filter(c => c.filterMode === 'SEARCH_FIELD').map(column => column.apiName).join(','); // databaseName of like filters
    }

    // encode the whole formData content
    for (const item in formData) { if (item) { queryParameter += encodeURIComponent(item) + '=' + encodeURIComponent(formData[item]) + '&'; } }

    return queryParameter.slice(0, -1); // removing the last '&'
  }

  /**
   * getContentForTable method
   * returns datable content
   * @params servlet : api endpoint
   * @params queryParameters : url-encoded filters
  */
  getContentForTable(servlet: string, queryParameters: string, callback): void {
    // return mocked results
    if (servlet === '/ReadTestCase') {
      // return the mock data for test cases list
      callback(tcs.contentTable, tcs.iTotalRecords);
    } else if (servlet === '/ReadTest') {
      // callback(tfs.contentTable, 61);
      this.http.post<any>(environment.cerberus_api_url + servlet, queryParameters, httpOptions)
        .subscribe((response) => {
          if (response) {
            if (response.iTotalRecords > 0) {
              // formatting test folders, waiting for: https://github.com/cerberustesting/cerberus-source/issues/2104
              callback(this.globalService.formatTestFolderList(response.contentTable), response.iTotalRecords);
            }
          }
        });
    }

  }

  // return the options list of possible values for a column
  // that is filtered by a dropdown typed filter
  getOptionsListForColumnsFiltering(servlet: string, columnName: string) {
    const query = environment.cerberus_api_url + servlet + '?columnName=' + columnName;
    return this.http.get<TestCase>(query);
  }

  /**
  * refresh the /testcaselist data table content with the currently active filters values
  */
  refreshTableContent() {
    this.refreshContentEvent.emit(null);
  }

}
