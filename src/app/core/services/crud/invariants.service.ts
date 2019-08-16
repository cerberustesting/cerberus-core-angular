import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IInvariant } from 'src/app/shared/model/invariants.model';
import { AlertService } from 'src/app/core/services/utils/alert.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvariantsService {
  // private invariants
  stepLoopList: Array<IInvariant>;
  conditionOperList: Array<IInvariant>;
  groupsList: Array<IInvariant>;
  actionsList: Array<IInvariant>;
  controlsList: Array<IInvariant>;
  tcestatusList: Array<IInvariant>;
  // public invariants
  countriesList: Array<IInvariant>;
  tcstatusList: Array<IInvariant>;
  prioritiesList: Array<IInvariant>;
  originsList: Array<IInvariant>;
  propertyTypeList: Array<IInvariant>;
  propertyNatureList: Array<IInvariant>;
  propertyDatabaseList: Array<IInvariant>;
  systemsList: Array<IInvariant>;
  environmentsList: Array<IInvariant>;
  // system management
  selectedSystemsList: Array<IInvariant>;
  // observables
  observableCountriesList = new BehaviorSubject<IInvariant[]>(this.countriesList);
  observableEnvironments = new BehaviorSubject<IInvariant[]>(this.environmentsList);
  observableTcStatus = new BehaviorSubject<IInvariant[]>(this.tcstatusList);
  observableSystems = new BehaviorSubject<IInvariant[]>(this.systemsList);
  observableSystemsSelected = new BehaviorSubject<any[]>(this.selectedSystemsList);
  observablePriorities = new BehaviorSubject<IInvariant[]>(this.prioritiesList);
  observableOriginsList = new BehaviorSubject<IInvariant[]>(this.originsList);
  observableGroupsList = new BehaviorSubject<IInvariant[]>(this.groupsList);
  observableConditionOperList = new BehaviorSubject<IInvariant[]>(this.conditionOperList);
  observableStepLoopList = new BehaviorSubject<IInvariant[]>(this.stepLoopList);
  observableActionsList = new BehaviorSubject<IInvariant[]>(this.actionsList);
  observableControlsList = new BehaviorSubject<IInvariant[]>(this.controlsList);
  observableTceStatusList = new BehaviorSubject<IInvariant[]>(this.tcestatusList);
  observablePropertyTypeList = new BehaviorSubject<IInvariant[]>(this.propertyTypeList);
  observablePropertyNatureList = new BehaviorSubject<IInvariant[]>(this.propertyNatureList);
  observablePropertyDatabaseList = new BehaviorSubject<IInvariant[]>(this.propertyDatabaseList);

  constructor(private http: HttpClient, private AlertService: AlertService) { }

  getCountriesList() {
    this.http.get<IInvariant[]>(environment.cerberus_api_url + '/FindInvariantByID?idName=country')
      .subscribe(response => {
        this.countriesList = response;
        this.observableCountriesList.next(this.countriesList);
      }, (err) => this.AlertService.APIError(err));
  }

  getSystems() {
    this.http.get<IInvariant[]>(environment.cerberus_api_url + '/FindInvariantByID?idName=system')
      .subscribe(response => {
        this.systemsList = response;
        this.observableSystems.next(this.systemsList);
      }, (err) => this.AlertService.APIError(err));
  }

    getEnvironments() {
        this.http.get<IInvariant[]>(environment.cerberus_api_url + '/FindInvariantByID?idName=environment')
            .subscribe(response => {
                this.environmentsList = response;
                this.observableEnvironments.next(this.environmentsList);
            }, (err) => this.AlertService.APIError(err));
    }

  // input: the new list of selected system(s)
  // replace the service variable with the given list
  updateSelectedSystemList(newSystemsList: Array<IInvariant>): void {
    this.selectedSystemsList = newSystemsList;
    this.observableSystemsSelected.next(this.selectedSystemsList);
  }

  // select all the systems at once
  selectAllSystems() {
    // fill a new list with all the system
    let allSystemsList = new Array<IInvariant>();
    this.systemsList.forEach(system => {
      allSystemsList.push(system);
    });
    // replace the service variable with the previously created list
    this.updateSelectedSystemList(allSystemsList);
  }

  getTcStatus() {
    this.http.get<IInvariant[]>(environment.cerberus_api_url + '/FindInvariantByID?idName=tcStatus')
      .subscribe(response => {
        this.tcstatusList = response;
        this.observableTcStatus.next(this.tcstatusList);
      }, (err) => this.AlertService.APIError(err));
  }
  getTceStatus() {
    this.http.get<IInvariant[]>(environment.cerberus_api_url + '/FindInvariantByID?idName=tceStatus')
      .subscribe(response => {
        this.tcestatusList = response;
        this.observableTceStatusList.next(this.tcestatusList);
      }, (err) => this.AlertService.APIError(err));
  }
  getPriorities() {
    this.http.get<IInvariant[]>(environment.cerberus_api_url + '/FindInvariantByID?idName=priority')
      .subscribe(response => {
        this.prioritiesList = response;
        // DIRTY : add a new field in Invariant model to have the value in Integer
        for (var key in this.prioritiesList) {
          this.prioritiesList[key].valueInt = Number(this.prioritiesList[key].value);
        }
        this.observablePriorities.next(this.prioritiesList);
      }, (err) => this.AlertService.APIError(err));
  }

  getOriginsList() {
    this.http.get<IInvariant[]>(environment.cerberus_api_url + '/FindInvariantByID?idName=origin')
      .subscribe(response => {
        this.originsList = response;
        this.observableOriginsList.next(this.originsList);
      }, (err) => this.AlertService.APIError(err));
  }

  getGroupList() {
    this.http.get<IInvariant[]>(environment.cerberus_api_url + '/FindInvariantByID?idName=group')
      .subscribe(response => {
        this.groupsList = response;
        this.observableGroupsList.next(this.groupsList);
      }, (err) => this.AlertService.APIError(err));
  }

  getStepConditionOperList() {
    this.http.get<IInvariant[]>(environment.cerberus_api_url + '/FindInvariantByID?idName=stepconditionOper')
      .subscribe(response => {
        this.conditionOperList = response;
        this.observableConditionOperList.next(this.conditionOperList);
      }, (err) => this.AlertService.APIError(err));
  }

  getStepLoopList() {
    this.http.get<IInvariant[]>(environment.cerberus_api_url + '/FindInvariantByID?idName=steploop')
      .subscribe(response => {
        this.stepLoopList = response;
        this.observableStepLoopList.next(this.stepLoopList);
      }, (err) => this.AlertService.APIError(err));
  }

  getActionList() {
    this.http.get<IInvariant[]>(environment.cerberus_api_url + '/FindInvariantByID?idName=action')
      .subscribe(response => {
        this.actionsList = response;
        this.observableActionsList.next(this.actionsList);
      }, (err) => this.AlertService.APIError(err));
  }

  getControlsList() {
    this.http.get<IInvariant[]>(environment.cerberus_api_url + '/FindInvariantByID?idName=control')
      .subscribe(response => {
        this.controlsList = response;
        this.observableControlsList.next(this.controlsList);
      }, (err) => this.AlertService.APIError(err));
  }

  getPropertyTypeList() {
    this.http.get<IInvariant[]>(environment.cerberus_api_url + '/FindInvariantByID?idName=propertyType')
      .subscribe(response => {
        this.propertyTypeList = response;
        this.observablePropertyTypeList.next(this.propertyTypeList);
      }, (err) => this.AlertService.APIError(err));
  }

  getPropertyNatureList(): void {
    this.http.get<IInvariant[]>(environment.cerberus_api_url + '/FindInvariantByID?idName=propertyNature')
      .subscribe(response => {
        this.propertyNatureList = response;
        this.observablePropertyNatureList.next(this.propertyNatureList);
      }, (err) => this.AlertService.APIError(err));
  }

  getPropertyDatabaseList(): void {
    this.http.get<IInvariant[]>(environment.cerberus_api_url + '/FindInvariantByID?idName=propertyDatabase')
      .subscribe(response => {
        this.propertyDatabaseList = response;
        this.observablePropertyDatabaseList.next(this.propertyDatabaseList);
      }, (err) => this.AlertService.APIError(err));
  }

}
