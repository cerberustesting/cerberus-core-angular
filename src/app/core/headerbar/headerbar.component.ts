import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/utils/alert.service';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';
import { IInvariant } from 'src/app/shared/model/invariants.model';
import { KeycloakService } from 'src/app/services/auth/keycloak.service';
import { environment } from 'src/environments/environment'

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

  // user
  userFullName: string;

  constructor(
    private AlertService: AlertService,
    private InvariantService: InvariantsService,
    private KeycloakService: KeycloakService
  ) { }

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
    if (environment.keycloakActive) {
      this.userFullName = this.KeycloakService.getFullName();
    } else {
      this.userFullName = "No user";
    }
  }

  addSystem(system) {
    this.InvariantService.selectSystem(system);
  }
  deleteSystem(system) {
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

  logout() {
    if (environment.keycloakActive) { this.KeycloakService.logout(); }
    else { console.log("Keycloak must be activated to log out"); }
  }

}
