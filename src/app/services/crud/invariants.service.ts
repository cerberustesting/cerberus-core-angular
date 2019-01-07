import { Injectable } from '@angular/core';
import { IInvariant } from 'src/app/model/invariants.model';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from 'src/app/app.component';

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
  // public invariants
  countriesList: Array<IInvariant>;
  tcstatusList: Array<IInvariant>;
  prioritiesList: Array<IInvariant>;
  originsList: Array<IInvariant>;
  systemsList: Array<IInvariant>;
  systemsSelected = [];
  // observables
  observableCountries = new BehaviorSubject<IInvariant[]>(this.countriesList);
  observableTcStatus = new BehaviorSubject<IInvariant[]>(this.tcstatusList);
  observableSystems = new BehaviorSubject<IInvariant[]>(this.systemsList);
  observableSystemsSelected = new BehaviorSubject<any[]>(this.systemsSelected);
  observablePriorities = new BehaviorSubject<IInvariant[]>(this.prioritiesList);
  observableOriginsList = new BehaviorSubject<IInvariant[]>(this.originsList);
  observableGroupsList = new BehaviorSubject<IInvariant[]>(this.groupsList);
  observableConditionOperList = new BehaviorSubject<IInvariant[]>(this.conditionOperList);
  observableStepLoopList = new BehaviorSubject<IInvariant[]>(this.stepLoopList);
  observableActionsList = new BehaviorSubject<IInvariant[]>(this.actionsList);
  observableControlsList = new BehaviorSubject<IInvariant[]>(this.controlsList);

  constructor(private http: HttpClient) { }

  getCountries() {
    this.http.get<IInvariant[]>(AppSettings.API_endpoint + '/FindInvariantByID?idName=country')
      .subscribe(response => {
        this.countriesList = response;
        this.observableCountries.next(this.countriesList);
      })
  }
    getSystems() {
        this.http.get<IInvariant[]>(AppSettings.API_endpoint + '/FindInvariantByID?idName=system')
            .subscribe(response => {
                this.systemsList = response;
                this.observableSystems.next(this.systemsList);
            })
    }
    selectSystem(system) {
        // @ts-ignore
        if (!this.systemsSelected.includes(system)) {
            this.systemsSelected.push(system);
            console.log('new badge is : ' + system );
        } else { console.log('System already selected : ' + system ); }
    }
    removeSystem(badge) {
        if (this.systemsSelected.indexOf(badge) != null) {
            console.log('deleting badge : ' + badge );
            this.systemsSelected.splice(this.systemsSelected.indexOf(badge),1);
        }
        console.log(this.systemsSelected);
    }

  getTcStatus() {
    this.http.get<IInvariant[]>(AppSettings.API_endpoint + '/FindInvariantByID?idName=tcStatus')
      .subscribe(response => {
        this.tcstatusList = response;
        this.observableTcStatus.next(this.tcstatusList);
      })
  }

  getPriorities() {
    this.http.get<IInvariant[]>(AppSettings.API_endpoint + '/FindInvariantByID?idName=priority')
      .subscribe(response => {
        this.prioritiesList = response;
        // DIRTY : add a new field in Invariant model to have the value in Integer
        for (var key in this.prioritiesList) {
          this.prioritiesList[key].valueInt = Number(this.prioritiesList[key].value);
        }
        this.observablePriorities.next(this.prioritiesList);
      })
  }

  getOriginsList() {
    this.http.get<IInvariant[]>(AppSettings.API_endpoint + '/FindInvariantByID?idName=origin')
      .subscribe(response => {
        this.originsList = response;
        this.observableOriginsList.next(this.originsList);
      })
  }

  getGroupList() {
    this.http.get<IInvariant[]>(AppSettings.API_endpoint + '/FindInvariantByID?idName=group')
      .subscribe(response => {
        this.groupsList = response;
        this.observableGroupsList.next(this.groupsList);
      })
  }

  getStepConditionOperList() {
    this.http.get<IInvariant[]>(AppSettings.API_endpoint + '/FindInvariantByID?idName=stepconditionOper')
      .subscribe(response => {
        this.conditionOperList = response;
        this.observableConditionOperList.next(this.conditionOperList);
      })
  }

  getStepLoopList() {
    this.http.get<IInvariant[]>(AppSettings.API_endpoint + '/FindInvariantByID?idName=steploop')
      .subscribe(response => {
        this.stepLoopList = response;
        this.observableStepLoopList.next(this.stepLoopList);
      })
  }

  getActionList() {
    this.http.get<IInvariant[]>(AppSettings.API_endpoint + '/FindInvariantByID?idName=action')
      .subscribe(response => {
        this.actionsList = response;
        this.observableActionsList.next(this.actionsList);
      })
  }

  getControlsList() {
    this.http.get<IInvariant[]>(AppSettings.API_endpoint + '/FindInvariantByID?idName=control')
      .subscribe(response => {
        this.controlsList = response;
        this.observableControlsList.next(this.controlsList);
      })
  }

}
