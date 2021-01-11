import npm_package from '../../package.json';
import { HttpHeaders } from '@angular/common/http';

// KEYCLOAK INFORMATION
const keycloakConfig: any = {
  url: 'https://auth.cerberus-testing.org/auth',
  realm: 'CerberusQA',
  clientId: 'cerberus-angular'
};

// HTTP HEADERS FOR API QUERY
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  })
};

// CERBERUS API ENDPOINT
const API_endpoint = 'https://qa.cerberus-testing.com';

export const environment = {
  production: true,
  cerberus_api_url: API_endpoint,
  keycloak: keycloakConfig,
  version: npm_package.version,
  httpOptions: httpOptions
};
