import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ITag } from 'src/app/shared/model/reporting.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {
  private campaignData: any;
  private tagDetail = {};
  private reportStatus = { status: [], total: 0 };
  private reportTestFolder = {};
  private reportLabel = [];
  private reportOther = [];
  private reportStatisticsReliability = {};
  private reportStatisticsDurationExecution = {};
  selectedTagName: string;
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
  observableReportLabel = new BehaviorSubject<any>(this.reportLabel);
  observableReportOther = new BehaviorSubject<any>(this.reportOther);
  observableReportStatisticsReliability = new BehaviorSubject<any>(this.reportStatisticsDurationExecution);
  observableReportStatisticsDurationExecution = new BehaviorSubject<any>(this.reportStatisticsDurationExecution);

  // variables
  private tagsList: Array<ITag>;
  // observables
  private observableTagsList = new BehaviorSubject<ITag[]>(this.tagsList);

  private colors = [
    '#0665d0',    
    '#689550',
    '#774aa4',
    '#00a680',
    '#314499',
    '#3b5998',
    '#6772e5',
    '#dd4b39'
  ]

  constructor(private http: HttpClient) { }

  /** getTagList
   * * call the api to get the tag list
   */
  getTagList() {
    this.http.get<ITag[]>(environment.cerberus_api_url + '/ReadTag?iSortCol_0=0&sSortDir_0=desc&sColumns=id,tag,campaign,description')
      .subscribe(response => {
        // @ts-ignore
        this.tagsList = response.contentTable;
        this.observableTagsList.next(this.tagsList);
      })
  }

  /** ReadTestCaseExecutionByTag
   * * call the api to get tag informations then get campaign informations.
   * @param callback function to execute with the tag information as parameter
   */
  ReadTestCaseExecutionByTag(callback: (any) => any) {    
    this.http.get<any>(environment.cerberus_api_url + '/ReadTestCaseExecutionByTag?Tag=' + this.selectedTagName + '&OK=on&KO=on&FA=on&NA=on&NE=on&WE=on&PE=on&QU=on&QE=on&CA=on&BE=on&CH=on&ES=on&FR=on&IT=on&LU=on&NL=on&PT=on&RU=on&UK=on&VI=on&PL=on&DE=on&RX=on&UF=on&env=on&country=on&robotDecli=on&app=on&')
      .subscribe(response => {
        this.http.get<any>(environment.cerberus_api_url + '/ReadCampaign?tag=true&&campaign=' + response.tagObject.campaign)
          .subscribe(campaignResponse => {
            if(campaignResponse.contentTable) {
              this.campaignData = campaignResponse.contentTable.tag.slice(0, 10);
            } else {
              this.campaignData = [];
            }           
            callback(response);
          })
      })
  }

  /** getTestCaseExecutionByTag
   * * call `ReadTestCaseExecutionByTag`
   * * parse the result to the graphs
   * @param tag 
   */
  getTestCaseExecutionByTag(tag: string) {
    this.selectedTagName = tag;
    this.ReadTestCaseExecutionByTag(response => {
      this.parseTagDetail(response);
      this.parseReportStatus(response);
      this.parseReportTestFolder(response);
      this.parseReportLabel(response);
      this.parseOther(response);
      this.parseStatisticDuration();
      this.parseStatisticReliability();
    });
  }

  /** tagExists
   * * test if the tag exist
   * @param tag the tag to test
   * @returns true if the tag exist
   */
  tagExists(tag: string) {
    if (tag != null) { return this.tagsList.filter(t => t.tag === tag).length > 0; }
    else { return false; }
  }

  /** findTag
   * find a tag by his name
   * @param tag the name of the tag
   * @returns the tag
   */
  findTag(tag: string): ITag {
    return this.tagsList.find(t => t.tag === tag);
  }

  /** parseTagDetail
   * * parse the response for the tag detail block
   * @param response the response to parse
   */
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

  /** parseReportStatus
   * * parse the response for the report by status graph
   * @param response the response to parse
   */
  parseReportStatus(response) {
    this.reportStatus = {
      total: 0,
      status: []
    }
    for (let status of this.status) {
      this.reportStatus.status.push({
        label: status.label,
        icon: status.icon,
        color: status.color,
        data: response.tagObject['nb' + status.label]
      });
    }
    this.reportStatus.total = response.tagObject.nbExeUsefull;
    this.observableReportStatus.next(this.reportStatus)
  }

  /** parseReportTestFolder
   * * parse the response for the Report by Test Folder graph
   * @param response the response to parse
   */
  parseReportTestFolder(response) {
    let labelList = [];
    let datasets = [];
    let colors = [];

    for (let axis of response.functionChart.axis) {
      labelList.push(axis.name);
    }

    for (let status of this.status) {
      let temp = { data: [], label: status.label, backgroundColor: status.color, hoverBackgroundColor: status.color };
      for (let axis of response.functionChart.axis) {
        if (axis[status.label]) temp.data.push(axis[status.label].value);
        else temp.data.push(0);
      }
      if (temp.data.some(number => number != 0)) datasets.push(temp);
    }

    this.reportTestFolder = {
      datasets: datasets,
      label: labelList,
      options: {
        responsive: true,
        // We use these empty structures as placeholders for dynamic theming.
        scales: { xAxes: [{ stacked: true }], yAxes: [{ stacked: true }] },
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

  /** getValuesFromLabelStats
   * @returns percentage for all stat
   * @param stats the stats to return
   */
  getValuesFromLabelStats(stats) {
    return { 
      KO: Math.round((stats.nbKO/stats.nbElementWithChild)*100), 
      OK: Math.round((stats.nbOK/stats.nbElementWithChild)*100), 
      FA: Math.round((stats.nbFA/stats.nbElementWithChild)*100), 
      NA: Math.round((stats.nbNA/stats.nbElementWithChild)*100), 
      NE: Math.round((stats.nbNE/stats.nbElementWithChild)*100), 
      CA: Math.round((stats.nbCA/stats.nbElementWithChild)*100) }
  }

  /** getValuesFromLabelStats
   * * parse the response for the Report by Label graph
   * @param stats the response to parse
   */
  parseReportLabel(response) {    

    this.reportLabel = [];

    for (let node of response.labelStat.labelTreeREQUIREMENT.concat(response.labelStat.labelTreeSTICKER)) {
      if(node.counter1WithChild!=0) this.reportLabel.push(this.parseLabelChildren(node));      
    }
    this.observableReportLabel.next(this.reportLabel);

  }
  
  /** parseLabelChildren
   * * parse children nodes
   * * RECURSIVE
   * @param label 
   */
  parseLabelChildren(label) {
    if (label.nodes) {
      let children = [];
      for (let node of label.nodes) {
        if(node.counter1WithChild!=0) children.push(this.parseLabelChildren(node))
      }
      return { label: { value: label.label.label, color: label.label.color }, values: this.getValuesFromLabelStats(label.stats), children: children };
    } else {
      return { label: { value: label.label.label, color: label.label.color }, values: this.getValuesFromLabelStats(label.stats) };
    }
  }

  /** parseOther
   * * parse the response for the polar graphs
   * @param response the response to parse
   */
  parseOther(response) {
    this.reportOther = [];

    let graphs = {
      Countries: {},
      Environments: {},
      RobotDecli: {},
      Applications: {}
    }

    for (let table of response.statsChart.contentTable.split) {
      let percentage = Math.round((table.OK / table.total) * 1000) / 10
      if (!graphs.Countries[table.country]) graphs.Countries[table.country] = [];
      graphs.Countries[table.country].push(percentage);
      if (!graphs.Environments[table.environment]) graphs.Environments[table.environment] = [];
      graphs.Environments[table.environment].push(percentage);
      if (!graphs.RobotDecli[table.robotDecli]) graphs.RobotDecli[table.robotDecli] = [];
      graphs.RobotDecli[table.robotDecli].push(percentage);
      if (!graphs.Applications[table.application]) graphs.Applications[table.application] = [];
      graphs.Applications[table.application].push(percentage);
    }

    for (let graph in graphs) {
      let labels = [];
      let data = [];
      let display = false;
      for (let label in graphs[graph]) {
        labels.push((label !== '')? label : 'none');
        let sum = 0;
        graphs[graph][label].forEach(element => {
          sum += element;
        });
        if (sum>0) display = true;
        data.push(Math.round((sum / graphs[graph][label].length) * 10) / 10)
      }
      if(data.length <=1) display = false
      let chart = {
        display: display,
        name: graph,
        data: data,
        legend: false,
        labels: labels,
        colors: [ { 
          backgroundColor: this.colors, 
          borderColor: this.colors
        } ],
        options: {
          title: {
            display: true,
            text: 'percentage of OK\'s / ' + graph,
          },
          scale: {
            display: false
          }
        }
      }
      this.reportOther.push(chart);
    }
    this.observableReportOther.next(this.reportOther);
  }

  /** parseStatisticReliability
   * * parse campaign data for the statistic by duration and execution graph
   */
  parseStatisticReliability() {
    let datasets = [
      { data: [], label: "Reliability", type: 'line' },
      { data: [], label: "Results" },
    ]
    let labels = [];
    let display = (this.campaignData.length>0)? true:false;

    for (let tag of this.campaignData) {
      datasets[0].data.push((Math.round(tag.nbExeUsefull / tag.nbExe) * 100));
      datasets[1].data.push(Math.round((tag.nbOK / tag.nbExe) * 100));
      labels.push(tag.tag);
    }
    this.reportStatisticsReliability = {
      options: {
        responsive: true
      },
      datasets: datasets,
      labels: labels,
      display: display
    };
    this.observableReportStatisticsReliability.next(this.reportStatisticsReliability);
  }

  /** parseStatisticDuration
   * * parse campaign data for the statistic by reliability
   */
  parseStatisticDuration() {
    let datasets = [
      { data: [], label: "Duration", type: 'line' },
      { data: [], label: "Executions" },
    ]
    let labels = [];
    let display = (this.campaignData.length>0)? true:false;

    for (let tag of this.campaignData) {
      let dateEnd = new Date(tag.DateEndQueue);
      let dateStart = new Date(tag.DateCreated);
      let duration = Math.round((dateEnd.getTime() - dateStart.getTime()) / 6000) / 10
      datasets[0].data.push((duration > 0) ? duration : 0);
      datasets[1].data.push(tag.nbExe);
      labels.push(tag.tag);
    }
    this.reportStatisticsDurationExecution = {
      options: {
        responsive: true
      },
      datasets: datasets,
      labels: labels,
      display: display
    };
    this.observableReportStatisticsDurationExecution.next(this.reportStatisticsDurationExecution);
  }

}
