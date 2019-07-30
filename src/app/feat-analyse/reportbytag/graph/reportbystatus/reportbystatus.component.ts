import { Component, OnInit, Input } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartType, ChartOptions } from 'chart.js';
import { ITag } from 'src/app/shared/model/reporting.model';
declare var jQuery: any;

@Component({
  selector: 'app-reportbystatus',
  templateUrl: './reportbystatus.component.html',
  styleUrls: ['./reportbystatus.component.scss']
})
export class ReportbystatusComponent implements OnInit {

  @Input() selectedTag: ITag;

  loadJS: Promise<any>;
  private graphID: string = "graph_reportbystatus";

  constructor() {
    
  }

 labels: Label[];
 colors: any;
 data: number[];
 activeState: Array<any>;


  public initChartJSLines() {
    let compo = [
      {
        label: "FA",
        color: 'rgba(141, 196, 81, 1)',
        colorHover: 'rgba(141, 196, 81, .5)',
        data: this.selectedTag.nbFA,
        icon: 'fa-robot'
      },
      {
        label: "KO",
        color: 'rgba(255, 177, 25, 1)',
        colorHover: 'rgba(255, 177, 25, .5)',
        data: this.selectedTag.nbKO,
        icon: 'fa-times'
      },
      {
        label: "NA",
        color: 'rgba(224, 79, 26, 1)',
        colorHover: 'rgba(224, 79, 26, .5)',
        data: this.selectedTag.nbNA,
        icon: 'fa-robot'
      },
      {
        label: "NE",
        color: 'rgba(224, 79, 26, 1)',
        colorHover: 'rgba(224, 79, 26, .5)',
        data: this.selectedTag.nbNE,
        icon: 'fa-robot'
      },
      {
        label: "OK",
        color: 'rgba(224, 79, 26, 1)',
        colorHover: 'rgba(224, 79, 26, .5)',
        data: this.selectedTag.nbOK,
        icon: 'fa-check'
      },
      {
        label: "PE",
        color: 'rgba(224, 79, 26, 1)',
        colorHover: 'rgba(224, 79, 26, .5)',
        data: this.selectedTag.nbPE,
        icon: 'fa-robot'
      },
      {
        label: "QE",
        color: 'rgba(224, 79, 26, 1)',
        colorHover: 'rgba(224, 79, 26, .5)',
        data: this.selectedTag.nbQE,
        icon: 'fa-robot'
      },
      {
        label: "QU",
        color: 'rgba(224, 79, 26, 1)',
        colorHover: 'rgba(224, 79, 26, .5)',
        data: this.selectedTag.nbQU,
        icon: 'fa-robot'
      },
      {
        label: "WE",
        color: 'rgba(224, 79, 26, 1)',
        colorHover: 'rgba(224, 79, 26, .5)',
        data: this.selectedTag.nbWE,
        icon: 'fa-robot'
      }
    ];
    this.activeState = compo.filter(e=> e.data>0);
    this.labels = this.activeState.map(e => e.label);
    // this.colors = [
    //   {
    //     backgroundColor: compo.map(e => e.color)
    //   }
    // ];
    this.data = this.activeState.map(e => e.data);
 
  }

  ngOnInit() {
    this.initChartJSLines();
  }

  round(value) {
    return Math.round(value);
  }

}
