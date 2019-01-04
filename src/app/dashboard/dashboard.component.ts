import { Component, OnInit } from '@angular/core';
declare function Helpers(name: string);
declare function initChartJS();

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    initChartJS();
  }

}
