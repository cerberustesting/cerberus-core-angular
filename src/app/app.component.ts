import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'src/app/core/services/auth/keycloak.service';
import { KeycloakInstance } from 'keycloak-js';
import { UserService } from './core/services/crud/user.service';
import { InvariantsService } from './core/services/crud/invariants.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public keycloakAuth: KeycloakInstance;
  nightMode: boolean;

  constructor(
    private _keycloakService: KeycloakService,
    private _userService: UserService,
    private _invariantsService: InvariantsService
  ) { }

  ngOnInit() {
    this.nightMode = false;
    this.keycloakAuth = this._keycloakService.getKeycloakAuth();
    this._userService.getUser();
    this._invariantsService.loadInvariants();
    console.log('cerberus-front application version is : ' + environment.version);
  }
  toggleNightMode() {
    this.nightMode = !this.nightMode;
  }
}
