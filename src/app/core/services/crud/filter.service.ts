import { Injectable } from '@angular/core';
import { Column } from 'src/app/shared/model/column.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  generateQueryStringParameters(columnList: Array<Column>, pageInformation: { size: number, sort: any, number: number, totalCount: number }, globalSearch: string): string {
    let queryParameter = "";
    let formData = {}
    let columnListWithActiveFilter = columnList.filter(e => e.sSearch).filter(e => e.sSearch.length != 0 || e.contentName == pageInformation.sort[0].prop);

    //generate request header

    // ? "sEcho"
    
    formData["iDisplayStart"] = (pageInformation.number - 1) * pageInformation.size; // first element index
    formData["iDisplayLength"] = pageInformation.size; // number of elements
    let sortCol = columnListWithActiveFilter.map(a => a.contentName).indexOf(pageInformation.sort[0].prop);
    if (sortCol >= 0) {
      formData["iSortCol_0"] = sortCol; //column to sort
      formData["sSortDir_0"] = pageInformation.sort[0].dir; //sort direction
    }
    if (globalSearch != '') formData["sSearch"] = globalSearch; // value in global search field


    if (columnListWithActiveFilter.length > 0) {
      formData["sColumns"] = columnListWithActiveFilter.map(column => column.databaseName).join(','); // list of columns to filter&sort
      // ? "iColumns" 
      for (let column in columnListWithActiveFilter) {
        if (columnList[column].type === 'label') {
          formData["sSearch_" + column] = (columnListWithActiveFilter[column].sSearch) ? columnListWithActiveFilter[column].sSearch.map(a => a.label).join(',') : ''; // value(s) to filter (only label)
        } else {
          formData["sSearch_" + column] = (columnListWithActiveFilter[column].sSearch) ? columnListWithActiveFilter[column].sSearch.join(',') : ''; // value(s) to filter
        }
        // ? "mDataProp_"
        // ? "bRegex_"
        // ? "bSearchable_"
        // ? "bSortable_"
      }
      formData["sLike"] = columnListWithActiveFilter.filter(c => c.like).map(column => column.databaseName).join(','); // databaseName of like filters
    }

    for (let item in formData) {
      queryParameter += encodeURIComponent(item) + '=' + encodeURIComponent(formData[item]) + '&';
    }   
    return queryParameter.slice(0, -1);
  }
}
