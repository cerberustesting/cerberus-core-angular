import { Component, OnInit } from '@angular/core';
import { KeycloakService } from './core/services/auth/keycloak.service';
import { KeycloakInstance } from 'keycloak-js';
import { environment } from 'src/environments/environment';

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

  constructor(private keycloak: KeycloakService) { }

  ngOnInit() {
    this.keycloakAuth = this.keycloak.getKeycloakAuth();
  }
}
