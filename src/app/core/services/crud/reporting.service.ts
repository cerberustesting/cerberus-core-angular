import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ITag } from 'src/app/shared/model/reporting.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {
  private tagDetail = {};
  private reportStatus = {
    status: [],
    total: 0
  };
  private reportTestFolder = {};
  private reportLabel = {};
  status: Array<any> = [
    {
      label: "FA",
      color: "#F0AD4E",
      icon: 'fa-robot'
    },
    {
      label: "KO",
      color: "#D9534F",
      icon: 'fa-times'
    },
    {
      label: "NA",
      color: '#aaa',
      icon: 'fa-robot'
    },
    {
      label: "NE",
      color: '#aaa',
      icon: 'fa-robot'
    },
    {
      label: "OK",
      color: "#5CB85C",
      icon: 'fa-check'
    },
    {
      label: "PE",
      color: '#aaa',
      icon: 'fa-robot'
    },
    {
      label: "QE",
      color: '#aaa',
      icon: 'fa-robot'
    },
    {
      label: "QU",
      color: '#aaa',
      icon: 'fa-robot'
    },
    {
      label: "WE",
      color: '#aaa',
      icon: 'fa-robot'
    }
  ]

  observableTagDetail = new BehaviorSubject<any>(this.tagDetail);
  observableReportStatus = new BehaviorSubject<any>(this.reportStatus);
  observableReportTestFolder = new BehaviorSubject<any>(this.reportTestFolder);

  // variables
  private tagsList: Array<ITag>;
  // observables
  observableTagsList = new BehaviorSubject<ITag[]>(this.tagsList);

  constructor(private http: HttpClient) { }

  getTagList() {
    this.http.get<ITag[]>(environment.cerberus_api_url + '/ReadTag?iSortCol_0=0&sSortDir_0=desc&sColumns=id,tag,campaign,description')
      .subscribe(response => {
        // @ts-ignore
        this.tagsList = response.contentTable;
        this.observableTagsList.next(this.tagsList);
      })
  }
  ReadTestCaseExecutionByTag(tag: string, callback: (any) => any) {
    //TODO : Specified type
    this.http.get<any>(environment.cerberus_api_url + '/ReadTestCaseExecutionByTag?Tag=' + tag + '&OK=on&KO=on&FA=on&NA=on&NE=on&WE=on&PE=on&QU=on&QE=on&CA=on&BE=on&CH=on&ES=on&FR=on&IT=on&LU=on&NL=on&PT=on&RU=on&UK=on&VI=on&PL=on&DE=on&RX=on&UF=on&env=on&country=on&robotDecli=on&app=on&')
      .subscribe(response => {
        callback(response);
      })
  }

  getTestCaseExecutionByTag(tag: string) {
    this.ReadTestCaseExecutionByTag(tag, response => {
      console.log("response :", response);
      this.parseTagDetail(response);
      this.parseReportStatus(response);
      this.parseReportTestFolder(response);
    });
  }

  tagExists(tag: string) {
    if (tag != null) { return this.tagsList.filter(t => t.tag === tag).length > 0; }
    else { return false; }
  }

  findTag(tag: string): ITag {
    return this.tagsList.find(t => t.tag === tag);
  }

  parseTagDetail(response) {
    this.tagDetail = {
      start: response.functionChart.globalStart.split(' CEST')[0],
      end: response.tagObject.DateEndQueue,
      lastExecution: response.functionChart.globalEnd,
      duration: response.tagDuration,
      campaign: response.tagObject.campaign,
      usrCreated: response.tagObject.UsrCreated,
      ciResult: response.tagObject.ciResult,
    }
    this.observableTagDetail.next(this.tagDetail);
  }
  parseReportStatus(response) {
    this.reportStatus = {
      total: 0,
      status: []
    }
    for(let status of this.status) {
      this.reportStatus.status.push({
        label: status.label,
        icon: status.icon,
        color: status.color,
        data: response.tagObject['nb'+status.label]
      });
    }
    this.reportStatus.total = response.tagObject.nbExeUsefull;
    this.observableReportStatus.next(this.reportStatus)
  }
  parseReportTestFolder(response) {
    let labelList = [];
    let datasets = [];
    let colors = [];

    for (let axis of response.functionChart.axis) {
      labelList.push(axis.name);
    }
    
    for (let status of this.status){
      let temp = {data: [], label: status.label, backgroundColor: status.color, hoverBackgroundColor: status.color};
      for (let axis of response.functionChart.axis) {
        if (axis[status.label]) temp.data.push(axis[status.label].value);
        else temp.data.push(0);
      }
      if (temp.data.some(number => number!=0)) datasets.push(temp);
    }


    this.reportTestFolder = {
      datasets: datasets,
      label: labelList,
      options : {
        responsive: true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: { xAxes: [{stacked: true}], yAxes: [{stacked: true}] },
        plugins: {
          datalabels: {
            anchor: 'end',
            align: 'end',
          }
        }
      },
      legend: true
    }
    this.observableReportTestFolder.next(this.reportTestFolder);
  }
  
}
