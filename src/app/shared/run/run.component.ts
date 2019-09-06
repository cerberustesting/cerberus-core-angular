import { Component, Input, OnInit } from '@angular/core';
import { IInvariant } from '../model/invariants.model';
import { InvariantsService } from '../../core/services/crud/invariants.service';
import { IRunParameters, RunParameters } from './run.parameters';
import { RunService } from '../../core/services/crud/run.service';

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.scss']
})


export class RunComponent implements OnInit {

  @Input() testCases: Array<any>;

  private runParameters: IRunParameters = new RunParameters();
  countriesList: Array<IInvariant> = [];
  private selected_countriesList: Array<string> = [];
  envList: Array<any> = [];

  constructor(
    private InvariantsService: InvariantsService,
    private RunService: RunService
  ) { }

  ngOnInit() {
    this.InvariantsService.getCountriesList();
    this.InvariantsService.observableCountriesList.subscribe(response => {
      this.countriesList = response;
      for (const index in this.countriesList) {
        this.selected_countriesList[index] = this.countriesList[index].value;
      }
    });

    this.InvariantsService.getEnvironments();
    this.InvariantsService.observableEnvironments.subscribe(response => {
      this.envList = response;
      /*for (const index in this.envList) {
          this.selected_countriesList[index] = this.countriesList[index].value;
      }*/
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

  runSelection() {

    this.runParameters.testcase = this.testCases[0].testCase;
    this.runParameters.test = this.testCases[0].test;
    this.runParameters.environment = this.envList[0].value;
    let submit = new FormData();


    for (let key in this.runParameters) {
      submit.append(key, this.runParameters[key] || '');
    }
    console.log(submit);

    this.RunService.addToExecutionQueue(submit);
  }

}
