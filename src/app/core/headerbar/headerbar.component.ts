import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { InvariantsService } from 'src/app/core/services/api/invariants.service';
import { IInvariant } from 'src/app/shared/model/invariants.model';
import { KeycloakService } from 'src/app/core/services/auth/keycloak.service';
import { UserService } from '../services/api/user.service';
import { IUser } from 'src/app/shared/model/user.model';
import { SidecontentService } from '../services/api/sidecontent.service';
import { NotificationService } from '../services/utils/notification.service';
import { HeaderTitleService } from '../services/utils/header-title.service';

@Component({
  selector: 'app-headerbar',
  templateUrl: './headerbar.component.html',
  styleUrls: ['./headerbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderbarComponent implements OnInit {

  // selected system(s) list by the user
  // using another variable while the format isn't correct
  private selectedSystemsList: Array<string> = [];

  // user data from API
  public user: IUser;

  // user data from Keycloak
  public userFullName: string; // full user displayed name

  // page title
  public title: string;
  // page title id
  public id: string;

  constructor(
    private invariantsService: InvariantsService,
    private keycloakService: KeycloakService,
    private userService: UserService,
    private sideContentService: SidecontentService,
    private notificationService: NotificationService,
    private hearderTitleService: HeaderTitleService
  ) { this.user = null; }

  ngOnInit() {

    // fetch data from User (could be done at an higher level)
    this.userService.observableUser.subscribe(r => {
      if (r) {
        this.user = r;
        this.selectedSystemsList = this.user.defaultSystem;
        // set the selected systems list at a global level
        this.invariantsService.updateSelectedSystemList(this.selectedSystemsList);
      }
    });

    // get user full name
    this.userFullName = this.keycloakService.getFullName();

    // subscrie to the title value and id
    this.hearderTitleService.observableTitle.subscribe(r => { if (r) { this.title = r.titleValue; this.id = r.id; } });
  }

  /**
   * method triggered on every user systems list values changes.
   * send the new list to the user API (to save it) and to another service for data filtering.
   */
  systemsList_OnChange(): void {
    // send the new list of selected system(s) to the invariants service (for datatable filtering)
    this.invariantsService.updateSelectedSystemList(this.selectedSystemsList);
    // send the new systems list to the API call
    this.userService.updateUserSystemList(this.selectedSystemsList);
  }

  /**
   * method triggered on every clean of the system select
   * properly empty the select systems list variable
   */
  systemsList_OnClear(): void {
    // empty the selected system(s) array
    this.selectedSystemsList = new Array<string>();
    this.invariantsService.updateSelectedSystemList(this.selectedSystemsList);
  }

  /**
   * select all the available systems from the list
  */
  selectAllSystems(): void {
    this.invariantsService.selectAllSystems();
  }

  /**
   * clear the user systems list variable
   */
  clearAllSystems(): void {
    this.systemsList_OnClear();
  }

  /**
   * @param systemName the name of the system to check
   * return true if the system is selected by the user, false instead
   */
  isASystemSelected(systemName: string): boolean {
    // we check that the selectedSystems array is defined
    // since ng-select component override declaration
    // which means undefined = empty in this case
    if (this.selectedSystemsList) {
      return this.selectedSystemsList.filter(s => s === systemName).length > 0;
    } else {
      return false;
    }
  }

  /**
   * return true if all available systems are selected.
   */
  areAllSystemsSelected(): boolean {
    return this.numberOfSelectedSystems() === this.user.system.length;
  }

  /**
   * return the number of selected systems by the user.
   */
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

  /**
   * custom search function for the system select
   * @param term keyword to filter on
   * @param item ?
   */
  customSearchSystem(term: string, item: IInvariant): boolean {
    term = term.toLowerCase();
    return item.value.toLowerCase().indexOf(term) > -1 || item.value.toLowerCase() === term;
  }

  /**
   * calls the logout method from keycloak service.
   */
  logout(): void {
    this.keycloakService.logout();
  }

  /**
   * open (in a new tab) the keycloak user settings page
   */
  openUserSettingsPage(): void {
    window.open(this.user.menu.accountLink, '_blank');
  }

  /**
   * debug function: does random things depending on the last person who edit it..
   */
  debug(): void {
    this.sideContentService.openSideBlock();
  }

}
