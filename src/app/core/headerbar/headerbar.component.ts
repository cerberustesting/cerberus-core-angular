import { Component, OnInit } from '@angular/core';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';
import { IInvariant } from 'src/app/shared/model/invariants.model';
import { KeycloakService } from 'src/app/core/services/auth/keycloak.service';
import { UserService } from '../services/crud/user.service';
import { IUser } from 'src/app/shared/model/user.model';
import { SidecontentService } from '../services/crud/sidecontent.service';
import { RunComponent } from '../../shared/run/run.component';

@Component({
  selector: 'app-headerbar',
  templateUrl: './headerbar.component.html',
  styleUrls: ['./headerbar.component.scss']
})
export class HeaderbarComponent implements OnInit {

  // system(s) list fetched from API
  private systemsList: Array<IInvariant> = [];
  // selected system(s) list  
  private selectedSystems: Array<IInvariant>;

  // user data from Keycloak
  private userFullName: string;

  // user data from API
  private user: IUser;

  constructor(
    private InvariantService: InvariantsService,
    private Keycloak: KeycloakService,
    private UserService: UserService,
    private sideContentService: SidecontentService
  ) { }

  ngOnInit() {
    // fetch data from User (could be done at a higher level)
    this.UserService.observableAccountLink.subscribe(r => { if (r) { this.user = r; } })
    this.userFullName = this.Keycloak.getFullName();

    // fetch the system list from invariant list
    this.InvariantService.observableSystems.subscribe(response => { this.systemsList = response; });
    this.InvariantService.getSystems();

    // subscribe to selected system(s) list
    this.InvariantService.observableSystemsSelected.subscribe(r => { this.selectedSystems = r; });
  }

  systemsList_OnChange() {
    // send the new list of selected system(s) to the service
    this.InvariantService.updateSelectedSystemList(this.selectedSystems);
    // TODO : order the selected system(s) at the beginning
    //this.systemsList = this.systemsList.filter(system => this.systemModel.includes(system.value)).concat(this.systemsList.filter(system => !this.systemModel.includes(system.value)));
  }

  systemsList_OnClear() {
    // empty the selected system(s) array
    this.selectedSystems = new Array<IInvariant>();
    this.InvariantService.updateSelectedSystemList(this.selectedSystems);
  }

  selectAllSystems(): void {
    this.InvariantService.selectAllSystems();
  }

  clearAllSystems(): void {
    this.systemsList_OnClear();
  }

  isASystemSelected(systemName: string): boolean {
    // we check that the selectedSystems array is defined
    // since ng-select component override declaration
    // which means undefined == empty in this case
    if (this.selectedSystems) { return this.selectedSystems.filter(s => s.value == systemName).length > 0; }
    else { return false; }
  }

  areAllSystemsSelected(): boolean {
    return this.numberOfSelectedSystems() === this.systemsList.length;
  }

  numberOfSelectedSystems(): number {
    let numberOfSelectedSystems: number;
    // due to ng-select behavior
    // if selectedSystems is undefined => empty array
    if (!this.selectedSystems) { numberOfSelectedSystems = 0; }
    else { numberOfSelectedSystems = this.selectedSystems.length; }
    return numberOfSelectedSystems;
  }

  logout() {
    this.Keycloak.logout();
  }

  openUserSettingsPage() {
    window.open(this.user.menu.accountLink, "_blank");
  }

  debug() {
    //this.AlertService.displayMessage(this.createARandomAlert());
    this.sideContentService.openSideBlock();
    this.sideContentService.addComponentToSideBlock(RunComponent);
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
