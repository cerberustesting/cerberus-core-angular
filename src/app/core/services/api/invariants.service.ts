import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Invariant } from 'src/app/shared/model/back/invariant/invariant.model';
import { environment } from 'src/environments/environment';
import { NotificationService } from '../utils/notification.service';
import { NotificationStyle } from '../utils/notification.model';

@Injectable({
  providedIn: 'root'
})
export class InvariantsService {

  // private invariants
  stepLoopList: Array<Invariant>;
  conditionOperList: Array<Invariant>;
  groupsList: Array<Invariant>;
  actionsList: Array<Invariant>;
  controlsList: Array<Invariant>;
  tcestatusList: Array<Invariant>;

  // public invariants
  countriesList: Array<Invariant>;
  tcstatusList: Array<Invariant>;
  prioritiesList: Array<Invariant>;
  originsList: Array<Invariant>;
  propertyTypeList: Array<Invariant>;
  propertyNatureList: Array<Invariant>;
  propertyDatabaseList: Array<Invariant>;
  systemsList: Array<any>;
  environmentsList: Array<Invariant>;
  appService: Array<any>;

  // observables
  observableCountriesList = new BehaviorSubject<Invariant[]>(this.countriesList);
  observableEnvironments = new BehaviorSubject<Invariant[]>(this.environmentsList);
  observableTcStatus = new BehaviorSubject<Invariant[]>(this.tcstatusList);
  observableSystems = new BehaviorSubject<Invariant[]>(this.systemsList);
  observablePriorities = new BehaviorSubject<Invariant[]>(this.prioritiesList);
  observableOriginsList = new BehaviorSubject<Invariant[]>(this.originsList);
  observableGroupsList = new BehaviorSubject<Invariant[]>(this.groupsList);
  observableConditionOperList = new BehaviorSubject<Invariant[]>(this.conditionOperList);
  observableStepLoopList = new BehaviorSubject<Invariant[]>(this.stepLoopList);
  observableActionsList = new BehaviorSubject<Invariant[]>(this.actionsList);
  observableControlsList = new BehaviorSubject<Invariant[]>(this.controlsList);
  observableTceStatusList = new BehaviorSubject<Invariant[]>(this.tcestatusList);
  observablePropertyTypeList = new BehaviorSubject<Invariant[]>(this.propertyTypeList);
  observablePropertyNatureList = new BehaviorSubject<Invariant[]>(this.propertyNatureList);
  observablePropertyDatabaseList = new BehaviorSubject<Invariant[]>(this.propertyDatabaseList);
  observableAppService = new BehaviorSubject<any[]>(this.propertyDatabaseList);

  constructor(private http: HttpClient, private Notification: NotificationService) { }

  getCountriesList() {
    this.http.get<Invariant[]>(environment.cerberus_api_url + '/FindInvariantByID?idName=country')
      .subscribe(response => {
        this.countriesList = response;
        this.observableCountriesList.next(this.countriesList);
      }, (err) => this.Notification.createANotification(err, NotificationStyle.Error));
  }

  getSystems() {
    this.http.get<Invariant[]>(environment.cerberus_api_url + '/FindInvariantByID?idName=system')
      .subscribe(response => {
        this.systemsList = response;
        this.observableSystems.next(this.systemsList);
      }, (err) => this.Notification.createANotification(err, NotificationStyle.Error));
  }

  getEnvironments() {
    this.http.get<Invariant[]>(environment.cerberus_api_url + '/FindInvariantByID?idName=environment')
      .subscribe(response => {
        this.environmentsList = response;
        this.observableEnvironments.next(this.environmentsList);
      }, (err) => this.Notification.createANotification(err, NotificationStyle.Error));
  }

  getTcStatus() {
    this.http.get<Invariant[]>(environment.cerberus_api_url + '/FindInvariantByID?idName=tcStatus')
      .subscribe(response => {
        this.tcstatusList = response;
        this.observableTcStatus.next(this.tcstatusList);
      }, (err) => this.Notification.createANotification(err, NotificationStyle.Error));
  }

  getTceStatus() {
    this.http.get<Invariant[]>(environment.cerberus_api_url + '/FindInvariantByID?idName=tceStatus')
      .subscribe(response => {
        this.tcestatusList = response;
        this.observableTceStatusList.next(this.tcestatusList);
      }, (err) => this.Notification.createANotification(err, NotificationStyle.Error));
  }

  getPriorities() {
    this.http.get<Invariant[]>(environment.cerberus_api_url + '/FindInvariantByID?idName=priority')
      .subscribe(response => {
        this.prioritiesList = response;
        // DIRTY : add a new field in Invariant model to have the value in Integer
        for (const key in this.prioritiesList) {
          if (key) {
            this.prioritiesList[key].valueInt = Number(this.prioritiesList[key].value);
          }
        }
        this.observablePriorities.next(this.prioritiesList);
      }, (err) => this.Notification.createANotification(err, NotificationStyle.Error));
  }

  getOriginsList() {
    this.http.get<Invariant[]>(environment.cerberus_api_url + '/FindInvariantByID?idName=origin')
      .subscribe(response => {
        this.originsList = response;
        this.observableOriginsList.next(this.originsList);
      }, (err) => this.Notification.createANotification(err, NotificationStyle.Error));
  }

  getGroupList() {
    this.http.get<Invariant[]>(environment.cerberus_api_url + '/FindInvariantByID?idName=group')
      .subscribe(response => {
        this.groupsList = response;
        this.observableGroupsList.next(this.groupsList);
      }, (err) => this.Notification.createANotification(err, NotificationStyle.Error));
  }

  getStepConditionOperList() {
    this.http.get<Invariant[]>(environment.cerberus_api_url + '/FindInvariantByID?idName=stepconditionOper')
      .subscribe(response => {
        this.conditionOperList = response;
        this.observableConditionOperList.next(this.conditionOperList);
      }, (err) => this.Notification.createANotification(err, NotificationStyle.Error));
  }

  getStepLoopList() {
    this.http.get<Invariant[]>(environment.cerberus_api_url + '/FindInvariantByID?idName=steploop')
      .subscribe(response => {
        this.stepLoopList = response;
        this.observableStepLoopList.next(this.stepLoopList);
      }, (err) => this.Notification.createANotification(err, NotificationStyle.Error));
  }

  getActionList() {
    this.http.get<Invariant[]>(environment.cerberus_api_url + '/FindInvariantByID?idName=action')
      .subscribe(response => {
        this.actionsList = response;
        this.observableActionsList.next(this.actionsList);
      }, (err) => this.Notification.createANotification(err, NotificationStyle.Error));
  }

  getControlsList() {
    this.http.get<Invariant[]>(environment.cerberus_api_url + '/FindInvariantByID?idName=control')
      .subscribe(response => {
        this.controlsList = response;
        this.observableControlsList.next(this.controlsList);
      }, (err) => this.Notification.createANotification(err, NotificationStyle.Error));
  }

  getPropertyTypeList() {
    this.http.get<Invariant[]>(environment.cerberus_api_url + '/FindInvariantByID?idName=propertyType')
      .subscribe(response => {
        this.propertyTypeList = response;
        this.observablePropertyTypeList.next(this.propertyTypeList);
      }, (err) => this.Notification.createANotification(err, NotificationStyle.Error));
  }

  getPropertyNatureList(): void {
    this.http.get<Invariant[]>(environment.cerberus_api_url + '/FindInvariantByID?idName=propertyNature')
      .subscribe(response => {
        this.propertyNatureList = response;
        this.observablePropertyNatureList.next(this.propertyNatureList);
      }, (err) => this.Notification.createANotification(err, NotificationStyle.Error));
  }

  getPropertyDatabaseList(): void {
    this.http.get<Invariant[]>(environment.cerberus_api_url + '/FindInvariantByID?idName=propertyDatabase')
      .subscribe(response => {
        this.propertyDatabaseList = response;
        this.observablePropertyDatabaseList.next(this.propertyDatabaseList);
      }, (err) => this.Notification.createANotification(err, NotificationStyle.Error));
  }

  getApplicationService(): void {
    this.http.get<any>(environment.cerberus_api_url + '/ReadAppService?iSortCol_0=0&sSortDir_0=asc&sColumns=service,type,method,description&iDisplayLength=30&sSearch_0=&iDisplayStart=0')
      .subscribe(response => {
        this.appService = response.contentTable;
        this.observableAppService.next(this.appService);
      }, (err) => this.Notification.createANotification(err, NotificationStyle.Error));
  }

  loadInvariants() {
    this.getActionList();
    this.getApplicationService();
    this.getControlsList();
    this.getCountriesList();
    this.getEnvironments();
    this.getGroupList();
    this.getOriginsList();
    this.getPriorities();
    this.getPropertyDatabaseList();
    this.getPropertyNatureList();
    this.getPropertyTypeList();
    this.getStepConditionOperList();
    this.getStepLoopList();
    this.getSystems();
    this.getTcStatus();
    this.getTceStatus();
  }

}
