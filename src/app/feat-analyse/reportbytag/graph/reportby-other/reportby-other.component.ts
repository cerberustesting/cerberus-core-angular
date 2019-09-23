import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reportby-other',
  templateUrl: './reportby-other.component.html',
  styleUrls: ['./reportby-other.component.scss']
})
export class ReportbyOtherComponent implements OnInit {
  // the chart informations to display
  @Input() chart: any;

  // variable to determine content
  // is expanded or not
  expand: boolean;

  constructor() { }

  ngOnInit() {
    this.expand = true;
  }

}
