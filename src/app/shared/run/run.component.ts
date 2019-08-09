import { Component, OnInit } from '@angular/core';
import {IInvariant} from '../model/invariants.model';
import {InvariantsService} from '../../core/services/crud/invariants.service';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.scss']
})
export class RunComponent implements OnInit {

  private countriesList: Array<IInvariant> = new Array();
  private selected_countriesList: Array<string> = new Array();
  private envList: Array<any> = [
      {
        value: "QA"
      },
      {
        value: "UAT"
      },
      {
        value: "PREPROD"
      },
      {
        value: "STAGING"
      },
      {
        value: "RE7"
      }
  ];

  constructor(private InvariantsService: InvariantsService) {}

  ngOnInit() {
    this.InvariantsService.getCountriesList();
    this.InvariantsService.getTceStatus();
    this.InvariantsService.observableCountriesList.subscribe(response => {
      this.countriesList = response;
      for (const index in this.countriesList) {
        this.selected_countriesList[index] = this.countriesList[index].value;
      }
    });
  }

  isCountrySelected(country: string): boolean {
    return this.selected_countriesList.filter(c => c === country).length > 0;
  }

  updateCountriesList($event, country: string) {
    if (!$event.target.checked) {
      // unchek : the country is removed
      const index = this.selected_countriesList.indexOf(country);
      this.selected_countriesList.splice(index, 1);
    } else {
      // check : the country is added
      // if it is not already in the array
      if (this.selected_countriesList.indexOf(country) == -1) {
        this.selected_countriesList.push(country);
      }
    }
  }

}
