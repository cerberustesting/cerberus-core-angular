import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/utils/alert.service';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';
import { IInvariant } from 'src/app/shared/model/invariants.model';
import { KeycloakService } from 'src/app/core/services/auth/keycloak.service';
import { UserService } from '../services/crud/user.service';
import { IUser } from 'src/app/shared/model/user.model';

@Component({
  selector: 'app-headerbar',
  templateUrl: './headerbar.component.html',
  styleUrls: ['./headerbar.component.scss']
})
export class HeaderbarComponent implements OnInit {

  private systemsList: Array<IInvariant>;
  private systemSub: Subscription;
  private selectedSystems: any[];
  private systemSubscription: Subscription;
  private systemModel: string[];

  // user data from Keycloak
  private userFullName: string;

  // user data from API
  private user: IUser;

  constructor(
    private AlertService: AlertService,
    private InvariantService: InvariantsService,
    private ks: KeycloakService,
    private UserService: UserService
  ) { }

  ngOnInit() {
    this.userFullName = this.ks.getFullName();
    this.UserService.observableAccountLink.subscribe(r => { if (r) { this.user = r; } })

    this.systemSub = this.InvariantService.observableSystems.subscribe(
      (response) => {
        this.systemsList = response;
      }
    );
    this.InvariantService.getSystems();

    this.systemSubscription = this.InvariantService.observableSystemsSelected.subscribe(
      (systemsSelected: any[]) => {
        this.selectedSystems = systemsSelected;
        this.systemModel = systemsSelected;        
      }
    );
    // this.InvariantService.emitSystemsSubject();
  }

  addSystem(system) {
    this.InvariantService.selectSystem(system);
  }
  deleteSystem(system) {
    this.InvariantService.removeSystem(system);
  }
  onClear() {
    let systemsToDelete = this.selectedSystems.map(a=>a);
    for (let system of systemsToDelete) {
      this.deleteSystem(system);
    }
    this.systemModel = [];
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
    this.ks.logout();
  }
  selectAll() {
    this.systemModel = this.systemsList.map(a=>a.value);
    for (let system of this.systemModel) {
      this.addSystem(system);
    }
  }
  unselectAll() {
    this.onClear()
  }

}
