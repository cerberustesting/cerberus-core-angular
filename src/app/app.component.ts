import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'src/app/core/services/auth/keycloak.service';
import { KeycloakInstance } from 'keycloak-js';
import { environment } from 'src/environments/environment';
import { UserService } from './core/services/crud/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public keycloakAuth: KeycloakInstance;
  nightMode: boolean;

  constructor(
    private keycloak: KeycloakService,
    private UserService: UserService
  ) { }

  ngOnInit() {
    this.nightMode = false;
    this.keycloakAuth = this.keycloak.getKeycloakAuth();
    this.UserService.getUser();
  }
  toggleNightMode() {
    this.nightMode = !this.nightMode;
  }
}
