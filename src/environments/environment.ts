import npm_package from '../../package.json';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// KEYCLOAK INFORMATION
const keycloakConfig: any = {
  url: 'https://auth.cerberus-testing.org/auth',
  realm: 'CerberusQA',
  clientId: 'cerberus-angular'
};

// CERBERUS API ENDPOINT
const API_endpoint = 'https://qa.cerberus-testing.org';

export const environment = {
  production: false,
  cerberus_api_url: API_endpoint,
  keycloak: keycloakConfig,
  version: npm_package.version
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
