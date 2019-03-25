import { Component, OnInit, Input } from '@angular/core';
import { IProperty } from 'src/app/model/property.model';
import { InvariantsService } from 'src/app/services/crud/invariants.service';
import { IInvariant } from 'src/app/model/invariants.model';
import { TestService } from 'src/app/services/crud/test.service';
import { ITestCaseHeader } from 'src/app/model/testcase.model';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.scss']
})
export class PropertyComponent implements OnInit {

  @Input('propertiesByCountry') propertiesByCountry: IProperty;
  private countriesList: Array<String>;
  private inv_countriesList: Array<IInvariant>;

  private testcaseheader: ITestCaseHeader;

  private selectedPropertyByCountry: IProperty;

  constructor(
    private InvariantsService: InvariantsService,
    private TestService: TestService
  ) { }

  ngOnInit() {
    this.TestService.observableTestCase.subscribe(r => { this.testcaseheader = r.info; });
    this.InvariantsService.observableCountriesList.subscribe(r => {
      this.inv_countriesList = r;
      this.countriesList = new Array<string>();
      for (var index in this.inv_countriesList) {
        // check that the country is enabled for the testcase
        if (this.TestService.isCountryDefinedForTestCase(this.testcaseheader, this.inv_countriesList[index].value)) {
          this.countriesList.push(this.inv_countriesList[index].value);
        }
      }
    });
    // GUI parameters 
    //this.selectedPropertyByCountry = 'All';
  }

}
