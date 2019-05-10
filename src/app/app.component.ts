import { Component, OnInit } from '@angular/core';
import { KeycloakService } from './services/auth/keycloak.service';
import { KeycloakInstance } from 'keycloak-js';

export class AppSettings {
  // URL of the Cerberus back-end application
  // e.g: http://localhost:8080/Cerberus
  public static API_endpoint: string = 'http://localhost:8080';
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
