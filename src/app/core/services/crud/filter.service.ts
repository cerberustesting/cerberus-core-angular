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
      "sEcho": 4, //
      "iColumns": columnList.length, 
      "sColumns": columnList.map(column => column.databaseName).join(','),
      "iDisplayStart": (pageInformation.number-1)*pageInformation.size,
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
    //formData["sLike"]= 'tec.testCase,tec.description,tec.function,tec.refOrigine,tec.dateCreated,tec.dateModif';
    for(let item in formData){
      queryParameter+= encodeURIComponent(item) + '=' + encodeURIComponent(formData[item]) + '&';
    }
    queryParameter+= "sLike=tec.testCase%2Ctec.description%2Ctec.function%2Ctec.refOrigine%2Ctec.dateCreated%2Ctec.dateModif";

    return queryParameter;
    // return "sEcho=4&iColumns=39&sColumns=%2C%2Ctec.test%2Ctec.testCase%2Ctec.description%2Clab.label%2Clab.labelsSTICKER%2Clab.labelsREQUIREMENT%2Clab.labelsBATTERY%2Ctec.status%2Ctec.application%2Capp.system%2Ctec.tcactive%2Ctec.priority%2Ctec.function%2Ctec.project%2Ctec.origine%2Ctec.refOrigine%2Ctec.group%2Ctec.dateCreated%2Ctec.usrCreated%2Ctec.testCaseVersion%2Ctec.dateModif%2Ctec.usrModif%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C%2C&iDisplayStart=0&iDisplayLength=10&mDataProp_0=&sSearch_0=&bRegex_0=false&bSearchable_0=false&bSortable_0=false&mDataProp_1=&sSearch_1=&bRegex_1=false&bSearchable_1=false&bSortable_1=false&mDataProp_2=test&sSearch_2=&bRegex_2=false&bSearchable_2=true&bSortable_2=true&mDataProp_3=testCase&sSearch_3=000&bRegex_3=false&bSearchable_3=true&bSortable_3=true&mDataProp_4=description&sSearch_4=&bRegex_4=false&bSearchable_4=true&bSortable_4=true&mDataProp_5=labels&sSearch_5=&bRegex_5=false&bSearchable_5=true&bSortable_5=false&mDataProp_6=labelsSTICKER&sSearch_6=&bRegex_6=false&bSearchable_6=true&bSortable_6=false&mDataProp_7=labelsREQUIREMENT&sSearch_7=&bRegex_7=false&bSearchable_7=true&bSortable_7=false&mDataProp_8=labelsBATTERY&sSearch_8=&bRegex_8=false&bSearchable_8=true&bSortable_8=false&mDataProp_9=status&sSearch_9=&bRegex_9=false&bSearchable_9=true&bSortable_9=true&mDataProp_10=application&sSearch_10=&bRegex_10=false&bSearchable_10=true&bSortable_10=true&mDataProp_11=system&sSearch_11=&bRegex_11=false&bSearchable_11=true&bSortable_11=true&mDataProp_12=tcActive&sSearch_12=&bRegex_12=false&bSearchable_12=true&bSortable_12=true&mDataProp_13=priority&sSearch_13=&bRegex_13=false&bSearchable_13=true&bSortable_13=true&mDataProp_14=function&sSearch_14=&bRegex_14=false&bSearchable_14=true&bSortable_14=true&mDataProp_15=project&sSearch_15=&bRegex_15=false&bSearchable_15=true&bSortable_15=true&mDataProp_16=origine&sSearch_16=&bRegex_16=false&bSearchable_16=true&bSortable_16=true&mDataProp_17=refOrigine&sSearch_17=&bRegex_17=false&bSearchable_17=true&bSortable_17=true&mDataProp_18=group&sSearch_18=&bRegex_18=false&bSearchable_18=true&bSortable_18=true&mDataProp_19=dateCreated&sSearch_19=&bRegex_19=false&bSearchable_19=true&bSortable_19=true&mDataProp_20=usrCreated&sSearch_20=&bRegex_20=false&bSearchable_20=true&bSortable_20=true&mDataProp_21=testCaseVersion&sSearch_21=&bRegex_21=false&bSearchable_21=true&bSortable_21=true&mDataProp_22=dateModif&sSearch_22=&bRegex_22=false&bSearchable_22=true&bSortable_22=true&mDataProp_23=usrModif&sSearch_23=&bRegex_23=false&bSearchable_23=true&bSortable_23=true&mDataProp_24=function&sSearch_24=&bRegex_24=false&bSearchable_24=false&bSortable_24=false&mDataProp_25=function&sSearch_25=&bRegex_25=false&bSearchable_25=false&bSortable_25=false&mDataProp_26=function&sSearch_26=&bRegex_26=false&bSearchable_26=false&bSortable_26=false&mDataProp_27=function&sSearch_27=&bRegex_27=false&bSearchable_27=false&bSortable_27=false&mDataProp_28=function&sSearch_28=&bRegex_28=false&bSearchable_28=false&bSortable_28=false&mDataProp_29=function&sSearch_29=&bRegex_29=false&bSearchable_29=false&bSortable_29=false&mDataProp_30=function&sSearch_30=&bRegex_30=false&bSearchable_30=false&bSortable_30=false&mDataProp_31=function&sSearch_31=&bRegex_31=false&bSearchable_31=false&bSortable_31=false&mDataProp_32=function&sSearch_32=&bRegex_32=false&bSearchable_32=false&bSortable_32=false&mDataProp_33=function&sSearch_33=&bRegex_33=false&bSearchable_33=false&bSortable_33=false&mDataProp_34=function&sSearch_34=&bRegex_34=false&bSearchable_34=false&bSortable_34=false&mDataProp_35=function&sSearch_35=&bRegex_35=false&bSearchable_35=false&bSortable_35=false&mDataProp_36=function&sSearch_36=&bRegex_36=false&bSearchable_36=false&bSortable_36=false&mDataProp_37=function&sSearch_37=&bRegex_37=false&bSearchable_37=false&bSortable_37=false&mDataProp_38=function&sSearch_38=&bRegex_38=false&bSearchable_38=false&bSortable_38=false&sSearch=&bRegex=false&iSortCol_0=2&sSortDir_0=asc&iSortingCols=1&sLike=tec.testCase%2Ctec.description%2Ctec.function%2Ctec.refOrigine%2Ctec.dateCreated%2Ctec.dateModif"
  }
}
