import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'src/app/core/services/auth/keycloak.service';
import { KeycloakInstance } from 'keycloak-js';
import { UserService } from './core/services/api/user.service';
import { InvariantsService } from './core/services/api/invariants.service';
import { environment } from 'src/environments/environment';
import { UserPreferencesService } from './core/services/utils/userpreferences.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public keycloakAuth: KeycloakInstance;
  public nightMode: boolean;

  constructor(
    private keycloakService: KeycloakService,
    private userService: UserService,
    private invariantsService: InvariantsService,
    private userPreferencesService: UserPreferencesService
  ) { }

  ngOnInit() {
    // subscribe to nightMode changes
    this.userPreferencesService.observableNightMode.subscribe(r => { this.nightMode = r; });
    this.keycloakAuth = this.keycloakService.getKeycloakAuth();
    this.userService.getUser();
    this.invariantsService.loadInvariants();
    console.log('cerberus-front application version is : ' + environment.version);
  }

}
