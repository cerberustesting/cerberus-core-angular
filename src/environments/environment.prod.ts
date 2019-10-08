import npm_package from '../../package.json';

// KEYCLOAK INFORMATION
const keycloakConfig: any = {
  url: 'https://auth.cerberus-testing.org/auth',
  realm: 'CerberusQA',
  clientId: 'cerberus-angular'
};

// CERBERUS API ENDPOINT
const API_endpoint = 'https://qa.cerberus-testing.org';

export const environment = {
  production: true,
  cerberus_api_url: API_endpoint,
  keycloak: keycloakConfig,
  version: npm_package.version
};
