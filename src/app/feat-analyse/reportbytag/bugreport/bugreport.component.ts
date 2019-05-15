import { Component, OnInit } from '@angular/core';
declare function Helpers(helperName: string);

@Component({
  selector: 'app-bugreport',
  templateUrl: './bugreport.component.html',
  styleUrls: ['./bugreport.component.scss']
})
export class BugreportComponent implements OnInit {

  constructor() { 
    Helpers('easy-pie-chart');
  }

  ngOnInit() {
  }

}
