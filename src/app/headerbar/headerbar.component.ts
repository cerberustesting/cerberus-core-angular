import { Component, OnInit } from '@angular/core';
import { AlertService, Alert } from '../services/utils/alert.service';
import { InvariantsService } from '../services/crud/invariants.service';
import { IInvariant } from '../model/invariants.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-headerbar',
  templateUrl: './headerbar.component.html',
  styleUrls: ['./headerbar.component.scss']
})
export class HeaderbarComponent implements OnInit {

  systemsList: Array<IInvariant>;
  systemSub: Subscription;
  selectedSystems: any[];
  systemSubscription: Subscription;

  constructor(private AlertService: AlertService,
              private InvariantService: InvariantsService) { }

  ngOnInit() {
    this.systemSub = this.InvariantService.observableSystems.subscribe(
        (response) => {
          this.systemsList = response;
        }
    );
    this.InvariantService.getSystems();

    this.systemSubscription = this.InvariantService.observableSystemsSelected.subscribe(
        (systemsSelected: any[]) => {
          this.selectedSystems = systemsSelected;
        }
    );
    // this.InvariantService.emitSystemsSubject();
  }

  addSystem(system){
    this.InvariantService.selectSystem(system);
  }
  deleteSystem(system){
    this.InvariantService.removeSystem(system);
  }

  debug() {
    this.AlertService.displayMessage(this.createARandomAlert());
  }

  createARandomAlert() {
    return {
      message: "message test " + Math.floor(Math.random() * (999999 - 100000)) + 100000,
      animationIn: "fadeInDown",
      animationOut: "fadeOut",
      style: "alert-info",
      duration: 5000
    }
  }


}
