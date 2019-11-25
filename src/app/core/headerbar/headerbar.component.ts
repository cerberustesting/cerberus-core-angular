import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { InvariantsService } from 'src/app/core/services/crud/invariants.service';
import { IInvariant } from 'src/app/shared/model/invariants.model';
import { KeycloakService } from 'src/app/core/services/auth/keycloak.service';
import { UserService } from '../services/crud/user.service';
import { IUser } from 'src/app/shared/model/user.model';
import { SidecontentService } from '../services/crud/sidecontent.service';
import { NotificationService } from '../services/utils/notification.service';
import { NotificationStyle } from '../services/utils/notification.model';
import { HeaderTitleService } from '../services/utils/header-title.service';

@Component({
  selector: 'app-headerbar',
  templateUrl: './headerbar.component.html',
  styleUrls: ['./headerbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderbarComponent implements OnInit {

  // system(s) list fetched from API
  systemsList: Array<IInvariant> = [];
  // selected system(s) list by the user
  selectedSystemsList: Array<IInvariant> = [];

  // user data from API
  private user: IUser;
  // user data from Keycloak
  userFullName: string;

  // page title
  title: string;
  // page title id
  // needed to differentiate page id other than from value
  // since it language dependant
  id: string;

  constructor(
    private _invariantsService: InvariantsService,
    private _keycloakService: KeycloakService,
    private _userService: UserService,
    private _sideContentService: SidecontentService,
    private _notificationService: NotificationService,
    private _hearderTitleService: HeaderTitleService
  ) { }

  ngOnInit() {
    // fetch data from User (could be done at a higher level)
    this._userService.observableAccountLink.subscribe(r => { if (r) { this.user = r; } });
    this.userFullName = this._keycloakService.getFullName();

    // fetch the system list from invariant list
    this._invariantsService.observableSystems.subscribe(response => { this.systemsList = response; });
    this._invariantsService.getSystems();

    // subscribe to selected system(s) list
    this._invariantsService.observableSystemsSelected.subscribe(r => { this.selectedSystemsList = r; });

    this._hearderTitleService.observableTitle.subscribe(r => { if (r) { this.title = r.titleValue; this.id = r.id; } });
  }

  systemsList_OnChange(): void {
    // send the new list of selected system(s) to the service
    this._invariantsService.updateSelectedSystemList(this.selectedSystemsList);
    // TODO : order the selected system(s) at the beginning
    // this.systemsList = this.systemsList.filter(system => this.systemModel.includes(system.value))
    // .concat(this.systemsList.filter(system => !this.systemModel.includes(system.value)));
  }

  systemsList_OnClear(): void {
    // empty the selected system(s) array
    this.selectedSystemsList = new Array<IInvariant>();
    this._invariantsService.updateSelectedSystemList(this.selectedSystemsList);
  }

  selectAllSystems(): void {
    this._invariantsService.selectAllSystems();
  }

  clearAllSystems(): void {
    this.systemsList_OnClear();
  }

  isASystemSelected(systemName: string): boolean {
    // we check that the selectedSystems array is defined
    // since ng-select component override declaration
    // which means undefined == empty in this case
    if (this.selectedSystemsList) {
      return this.selectedSystemsList.filter(s => s.value === systemName).length > 0;
    } else {
      return false;
    }
  }

  areAllSystemsSelected(): boolean {
    return this.numberOfSelectedSystems() === this.systemsList.length;
  }

  numberOfSelectedSystems(): number {
    let numberOfSelectedSystems: number;
    // due to ng-select behavior
    // if selectedSystems is undefined => empty array
    if (!this.selectedSystemsList) {
      numberOfSelectedSystems = 0;
    } else {
      numberOfSelectedSystems = this.selectedSystemsList.length;
    }
    return numberOfSelectedSystems;
  }

  customSearchSystem(term: string, item: IInvariant) {
    term = term.toLowerCase();
    return item.value.toLowerCase().indexOf(term) > -1 || item.value.toLowerCase() === term;
  }

  logout(): void {
    this._keycloakService.logout();
  }

  openUserSettingsPage(): void {
    window.open(this.user.menu.accountLink, '_blank');
  }

  // DEBUG FUNCTION : feel free to edit them!
  debug(): void {
    this._sideContentService.openSideBlock();
  }

  debug2(): void {
    this._notificationService.createANotification(
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit,' +
      ' sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' +
      ' Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi' +
      ' ut aliquip ex ea commodo consequat.',
      NotificationStyle.Info,
      true,
      5000);
  }

  refreshInvariants() {
    this._invariantsService.loadInvariants();
  }
}
