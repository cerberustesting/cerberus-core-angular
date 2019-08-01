import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reportby-label',
  templateUrl: './reportby-label.component.html',
  styleUrls: ['./reportby-label.component.scss']
})
export class ReportbyLabelComponent implements OnInit {

  labelTree = [
    {
      label: { value: 'parent 1' }, values: { KO: 20, OK: 50, FA: 30 }, children: [
        { label: { value: 'child 1' }, values: { KO: 20, OK: 50, FA: 30 } },
        { label: { value: 'child 2' }, values: { KO: 20, OK: 50, FA: 30 } },
        { label: { value: 'child 3' }, values: { KO: 20, OK: 50, FA: 30 } },
        { label: { value: 'child 4' }, values: { KO: 20, OK: 50, FA: 30 } }
      ]
    },
    { label: { value: 'lone label'}, values: {KO: 20, OK: 50, FA: 30} },
    {
      label: { value: 'parent 2' }, values: {KO: 20, OK: 50, FA: 30}, children: [
        { label: { value: 'child 1' }, values: {KO: 20, OK: 50, FA: 30} },
        { label: { value: 'child 2' }, values: {KO: 20, OK: 50, FA: 30} }
      ]
    },
  ]

  constructor() { }

  ngOnInit() {
  }

}
