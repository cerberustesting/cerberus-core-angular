import { Injectable } from '@angular/core';
import { Column } from 'src/app/shared/model/column.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  generateQueryStringParameters(columnList: Array<Column>, pageInformation: {size: number, sort: any, number: number, totalCount: number}, globalSearch: string): string {
    let queryParameter = "";

    //generate request header
    let formData = {
      // "sEcho": 1, //
      "iColumns": columnList.length, 
      "sColumns": columnList.map(column => column.databaseName).join(','),
      "iDisplayStart": pageInformation.number,
      "iDisplayLength": pageInformation.size,
    }
    for (let column in columnList) {
      formData["mDataProp_" + column] = columnList[column].contentName;
      if (columnList[column].type==='label') {
        formData["sSearch_" + column] = (columnList[column].sSearch)? columnList[column].sSearch.map(a=>a.label).join(',') : '';
      } else {
        formData["sSearch_" + column] = (columnList[column].sSearch)? columnList[column].sSearch.join(',') : '';
      }      
      // formData["bRegex_" + column] = false;
      formData["bSearchable_" + column] = (columnList[column].searchable || columnList[column].like)? true : false;
      formData["bSortable_" + column] = (columnList[column].sortable)? true : false;
    }
    let sortCol = columnList.map(a => a.contentName).indexOf(pageInformation.sort[0].prop);
    formData["iSortCol_0"]=(sortCol>=0)? sortCol : 1; //column to sort
    formData["sSortDir_0"]= pageInformation.sort[0].dir; //sort direction
    formData["sSearch"]=globalSearch;
    formData["sLike"]= 'tec.testCase,tec.description,tec.function,tec.refOrigine,tec.dateCreated,tec.dateModif';
    for(let item in formData){
      queryParameter+= encodeURIComponent(item) + '=' + encodeURIComponent(formData[item]) + '&';
    }

    return queryParameter
  }
}
