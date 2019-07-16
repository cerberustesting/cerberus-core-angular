import { Injectable } from '@angular/core';
import { Column } from 'src/app/shared/model/column.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  generateQueryStringParameters(columnList: Array<Column>, pageInformation: {size: number, number: number, totalCount: number}): string {
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
      formData["sSearch_" + column] = (columnList[column].filterItem)? columnList[column].filterItem.sSearch.join(',') : '';
      // formData["bRegex_" + column] = false;
      formData["bSearchable_" + column] = (columnList[column].searchable)? true : false;
      formData["bSortable_" + column] = (columnList[column].sortable)? true : false;
    }
    // formData["iSortCol_0"]=2;
    // formData["sSortDir_0"]='asc';
    // formData["iSortingCols"]= 1;
    formData["sLike"]= 'tec.testCase,tec.description,tec.function,tec.refOrigine,tec.dateCreated,tec.dateModif';
    for(let item in formData){
      queryParameter+= encodeURIComponent(item) + '=' + encodeURIComponent(formData[item]) + '&';
    }

    return queryParameter
  }
}
