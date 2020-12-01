# cerberus-angular
Brand new Cerberus front-end implementation

[![Test Status](https://prod.cerberus-testing.org/ResultCIV003?campaign=FrontRegression&outputformat=svg&t=180131)](https://prod.cerberus-testing.org/)

# get started

- `npm install`
- `ng serve`

# installation guide

This application is secured by keycloak (https://www.keycloak.org).

You can both :
- connect it to an online Cerberus environment (https://qa.cerberus-testing.org) where data are safe to edit.

You just have to clone the repo and you're good to go. An internet connection is therefore necessary.
NB: You must deploy the application on default port 4200 (only this URL is configured on the online keycloak)

- connect it to a local Cerberus instance that you have to deploy locally

Please follow the instructions on cerberus-source repository (https://github.com/cerberustesting/cerberus-source/blob/master/INSTALL.tomcat) to deploy Cerberus and Keycloak on your local environment.

In cerberus-angular, edit  `environment.ts` file with your corresponding URLs :

- keycloak auth URL in the `keycloakConfig` object
``` javascript
// KEYCLOAK INFORMATION
let keycloakConfig: any = {
  url: 'http://localhost:38080/auth', //right here
  realm: 'Cerberus',
  clientId: 'cerberus-angular'
};
```
- the cerberus source URL in the same object
``` javascript
// CERBERUS API ENDPOINT
let API_endpoint: string = "http://localhost:8080";
```

The application is configured by default to work with `cerberus-angular` keycloak client with the following configuration :
- Enabled : ON
- Client protocol : openid-connect
- Access Type : public
- Standard Flow Enabled : ON
- Valid Redirect URIs : your cerberus angular URL (or URI if Root URL is configured) (e.g. http://localhost:4200/*)
- Web Origins : add "+"

# developer guide
As soon as you have access to the repository, please make sure before any push :
- `ng lint` returns no error
- `ng build --prod` runs flawlessly

The latest developements are available at: https://front-qa.cerberus-testing.org

# docker
In order to run it inside a docker container you can use :
```bash
# Build the image
sudo docker build -t cerberus-angular .
# Run it
sudo docker run -it -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules -p 4200:4200 --rm cerberus-angular
```
