import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/services/utils/alert.service';
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

  private systemsList: Array<IInvariant>;
  private selectedSystems: any[];
  private systemModel: string[];
  private toggleSelectAll: boolean = true;

  // user data from Keycloak
  private userFullName: string;

  // user data from API
  private user: IUser;

  constructor(
    private AlertService: AlertService,
    private InvariantService: InvariantsService,
    private ks: KeycloakService,
    private UserService: UserService,
    private sideContentService: SidecontentService
  ) { }

  ngOnInit() {
    this.userFullName = this.ks.getFullName();
    this.UserService.observableAccountLink.subscribe(r => { if (r) { this.user = r; } })

    this.InvariantService.observableSystems.subscribe(response => { this.systemsList = response; });
    this.InvariantService.getSystems();

    this.InvariantService.observableSystemsSelected.subscribe(
      (systemsSelected: any[]) => {
        this.selectedSystems = systemsSelected;
        console.log(this.selectedSystems);
        this.systemModel = systemsSelected;
      }
    );
    // this.InvariantService.emitSystemsSubject();
  }
  change() {
    this.systemsList = this.systemsList.filter(system => this.systemModel.includes(system.value)).concat(this.systemsList.filter(system => !this.systemModel.includes(system.value)));
    this.InvariantService.selectSystem(this.systemModel);
  }
  onClose() {
    this.InvariantService.selectSystem(this.systemModel);
  }
  onClear() {
    this.systemModel = [];
    this.InvariantService.selectSystem(this.systemModel);
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

  logout() {
    this.ks.logout();
  }

  openUserSettingsPage() {
    window.open(this.user.menu.accountLink, "_blank");
  }

  selectAll() {
    if (this.toggleSelectAll || this.systemModel.length === 0) {
      this.systemModel = this.systemsList.map(a => a.value);
      this.InvariantService.selectSystem(this.systemModel);
    } else {
      this.onClear()
    }
    this.toggleSelectAll = !this.toggleSelectAll;

  }

  isASystemSelected(system: string): boolean {
    return this.selectedSystems.filter(s => s == system).length > 0;
  }

}
