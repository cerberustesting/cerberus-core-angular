import { Component, OnInit } from '@angular/core';
import { KeycloakService } from './core/services/auth/keycloak.service';
import { KeycloakInstance } from 'keycloak-js';
import { environment } from 'src/environments/environment';
import {UserService} from "./core/services/crud/user.service";

export class AppSettings {
  public static API_endpoint: string = environment.cerberus_api_url;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public keycloakAuth: KeycloakInstance;

  constructor(
      private keycloak: KeycloakService,
      private userService: UserService
  ) { }

  ngOnInit() {
    this.keycloakAuth = this.keycloak.getKeycloakAuth();
    //this.userService.getReadUser();
  }
}
