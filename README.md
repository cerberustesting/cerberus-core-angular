# cerberus-angular
Brand new Cerberus front-end implementation

# deploy angular app

- `npm install`
- `ng serve`

# connect it to cerberus-source API

This Cerberus front is using keycloak for its authentication

You can both :
- connect it to an online Cerberus environment (QA) where data are safe to edit

You just have to clone the repo and you're good to go. An online internet connection is therefore necessary.
You also must deploy the application on default port 4200

- connect it to a local Cerberus instance that you have to deploy locally

Please follow the instructions on cerberus-source repository to deploy Cerberus and Keycloak on your local environment.

In cerberus-angular, edit  `environment.ts` file with your corresponding URLs :

- keycloak auth URL in the `keycloakConfig` object
``` javascript
// KEYCLOAK INFORMATION
let keycloakConfig: any = {
  url: 'http://localhost:38080/auth', //right here
  realm: 'Cerberus',
  clientId: 'cerberus'
};
```
- the cerberus source URL in the same object
``` javascript
// CERBERUS API ENDPOINT
let API_endpoint: string = "http://localhost:8080/";
```

The application is configured by default to work with `cerberus-angular` keycloak client with the following configuration :
- Enabled : ON
- Client protocol : openid-connect
- Access Type : public
- Standard Flow Enabled : ON
- Valid Redirect URIs : your cerberus angular URL (or URI if Root URL is configured) (e.g. http://localhost:4200/*)
- Web Origins : add "+"

# Docker

In order to run it inside a docker container you can use :
```bash
# Build the image
sudo docker build -t cerberus-angular .
# Run it
sudo docker run -it -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules -p 4200:4200 --rm cerberus-angular
```
