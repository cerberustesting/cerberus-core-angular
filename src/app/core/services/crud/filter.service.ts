import { Injectable } from '@angular/core';
import { Column } from 'src/app/shared/model/column.model';
import { InvariantsService } from './invariants.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { ITestCaseHeader } from 'src/app/shared/model/testcase.model';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  })
};

export class ActiveFilter {
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

  constructor(private invariantService: InvariantsService,
    private http: HttpClient) {
    this.activeFiltersList = new Array<ActiveFilter>();
  }

  generateQueryStringParameters(columnList: Array<Column>,
    pageInformation: { size: number, sort: any, number: number, totalCount: number },
    globalSearch: string): string {
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
          if (this.invariantService.selectedSystemsList) {
            const systemByFilterRaw = new Array<String>();
            if (this.invariantService.selectedSystemsList.length !== 0) {
              this.invariantService.selectedSystemsList.forEach(system => {
                systemByFilterRaw.push(system.value);
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

    for (const item in formData) {
      if (item) {
        queryParameter += encodeURIComponent(item) + '=' + encodeURIComponent(formData[item]) + '&';
      }
    }
    return queryParameter.slice(0, -1); // removing the last '&'
  }

  // return the values to be displayed on a datatable
  // according to filter, sort & search
  getContentForTable(servlet: string, queryParameters: string, callback) {
    this.http.post<any>(environment.cerberus_api_url + servlet, queryParameters, httpOptions)
      .subscribe((response) => {
        if (response) {
          if (response.iTotalRecords > 0) {
            callback(response.contentTable, response.iTotalRecords);
          }
        }
      });
  }

  // return the options list of possible values for a column
  // that is filtered by a dropdown typed filter
  getOptionsListForColumnsFiltering(servlet: string, columnName: string) {
    const query = environment.cerberus_api_url + servlet + '?columnName=' + columnName;
    return this.http.get<ITestCaseHeader>(query);
  }

  // add a new filter or new values for an existing values to the list
  // addAFilter(key: string, values: Array<any>, term: string, mode: string) {
  //   const filter = new ActiveFilter(key, values, term, mode);
  //   const similarFilter = this.activeFiltersList.find(f => f.filter === filter.filter);
  //   if (similarFilter) {
  //     // the filter is already active
  //     const index = this.activeFiltersList.indexOf(similarFilter);
  //     // update the values & term for this key
  //     this.activeFiltersList[index].values = values;
  //     this.activeFiltersList[index].term = term;
  //   } else {
  //     // add the new filter to the selection
  //     this.activeFiltersList.push(filter);
  //   }
  //   this.observableActiveFiltersList.next(this.activeFiltersList);
  // }

  // remove a filter from the active filters list
  // removeAFilter(key: string) {
  //   const filter = this.activeFiltersList.find(f => f.filter === filter.filter);
  //   // ensure that the filter is already active
  //   if (filter) {
  //     // removes it
  //     const index = this.activeFiltersList.indexOf(filter);
  //     this.activeFiltersList.splice(index, 1);
  //   }
  //   this.observableActiveFiltersList.next(this.activeFiltersList);
  // }

}
