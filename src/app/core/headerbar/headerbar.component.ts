import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';
import { IInvariant } from 'src/app/shared/model/invariants.model';
import { KeycloakService } from 'src/app/core/services/auth/keycloak.service';
import { UserService } from '../services/crud/user.service';
import { IUser } from 'src/app/shared/model/user.model';
import { SidecontentService } from '../services/crud/sidecontent.service';
import { NotificationService } from '../services/utils/notification.service';
import { NotificationStyle } from '../services/utils/notification.model';
import { HeaderTitleService } from '../services/crud/header-title.service';

@Component({
  selector: 'app-headerbar',
  templateUrl: './headerbar.component.html',
  styleUrls: ['./headerbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderbarComponent implements OnInit {

  // system(s) list fetched from API
  private systemsList: Array<IInvariant> = [];
  // selected system(s) list by the user 
  private selectedSystemsList: Array<IInvariant>;

  // user data from API
  private user: IUser;
  // user data from Keycloak
  private userFullName: string;

  private title: string;

  constructor(
    private InvariantService: InvariantsService,
    private Keycloak: KeycloakService,
    private UserService: UserService,
    private sideContentService: SidecontentService,
    private NotificationService: NotificationService,
    private hearderTitleService: HeaderTitleService
  ) { }

  ngOnInit() {
    // fetch data from User (could be done at a higher level)
    this.UserService.observableAccountLink.subscribe(r => { if (r) { this.user = r; } })
    this.userFullName = this.Keycloak.getFullName();

    // fetch the system list from invariant list
    this.InvariantService.observableSystems.subscribe(response => { this.systemsList = response; });
    this.InvariantService.getSystems();

    // subscribe to selected system(s) list
    this.InvariantService.observableSystemsSelected.subscribe(r => { this.selectedSystemsList = r; });

    this.hearderTitleService.observableTitle.subscribe(newTitle => this.title = newTitle)
  }

  systemsList_OnChange(): void {
    // send the new list of selected system(s) to the service
    this.InvariantService.updateSelectedSystemList(this.selectedSystemsList);
    // TODO : order the selected system(s) at the beginning
    //this.systemsList = this.systemsList.filter(system => this.systemModel.includes(system.value)).concat(this.systemsList.filter(system => !this.systemModel.includes(system.value)));
  }

  systemsList_OnClear(): void {
    // empty the selected system(s) array
    this.selectedSystemsList = new Array<IInvariant>();
    this.InvariantService.updateSelectedSystemList(this.selectedSystemsList);
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
    if (this.selectedSystemsList) { return this.selectedSystemsList.filter(s => s.value == systemName).length > 0; }
    else { return false; }
  }

  areAllSystemsSelected(): boolean {
    return this.numberOfSelectedSystems() === this.systemsList.length;
  }

  numberOfSelectedSystems(): number {
    let numberOfSelectedSystems: number;
    // due to ng-select behavior
    // if selectedSystems is undefined => empty array
    if (!this.selectedSystemsList) { numberOfSelectedSystems = 0; }
    else { numberOfSelectedSystems = this.selectedSystemsList.length; }
    return numberOfSelectedSystems;
  }

  customSearchSystem(term: string, item: IInvariant) {
    term = term.toLowerCase();
    return item.value.toLowerCase().indexOf(term) > -1 || item.value.toLowerCase() === term;
  }

  logout(): void {
    this.Keycloak.logout();
  }

  openUserSettingsPage(): void {
    window.open(this.user.menu.accountLink, "_blank");
  }

  // DEBUG FUNCTION : feel free to edit them!
  debug(): void {
    this.sideContentService.openSideBlock();
  }

  debug2(): void {
    this.NotificationService.createANotification("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", NotificationStyle.Info, true, 5000);
  }
}