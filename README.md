# cerberus-angular
Brand new Cerberus front-end implementation

# deploy angular app

- `npm install`
- `ng serve`

# connect it to your local cerberus

## New way (after Cerberus-4.1-SNAPHSOT (25-07-2019))

Now, the authentication on angular works. 

With keycloak, you need to athentificate on keycloak before using the angular front.
Without keycloak, you need to login on the old front before using the angular front  

To avoid CORS problem, Add on your cerberus back the env variable `FRONT_URL=your_angular_host` (eg : `FRONT_URL=http://localhost:4200`).

At this time, a cors problem can occurred with keycloak. To resolve it :
   * Log on the old cerberus front, and go back to the angular front, it should be work 
   * Or use Chrome plugin: https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi 
   * ... while the problem is not resolve.

### Active keycloak on font-angular 

on `environment.ts` file, change the `keycloakActive: false` to true : 

``` javascript
// KEYCLOAK INFORMATION
let keycloakConfig: any = {
  url: 'http://localhost:38080/auth',
  realm: 'Cerberus',
  clientId: 'cerberus'
};

// CERBERUS API ENDPOINT
let API_endpoint: string = "http://localhost:8080/";

export const environment = {
  production: false,
  cerberus_api_url: API_endpoint,
  keycloakActive: false,    // change it to true
  keycloak: keycloakConfig
};
```

This is my keycloak config : 

[keycloakconfig](img/keycloak_config.png)

## Old way (before Cerberus-4.1-SNAPHSOT)

Make sure to deploy the Angular app on a different port than your local Cerberus.

You will face CORS (Cross Origin Resource Sharing) issues because of the security rules of Cerberus.

To bypass it :
- Necessary servlets needs to call the ServletUtil.fixHeaders method which add specific headers to its call.
- Authentification constraint needs to be removed in `web.xml`.
- A CORS plugin is needed in your web browser.

All the necessary servlets have the fixHeaders method implemented. You just need to enable debug 

``` java
protected void processRequest(HttpServletRequest request, HttpServletResponse response)
throws ServletException, IOException, JSONException {
            
...

// Calling Servlet Transversal Util.
ServletUtil.servletStart(request);
ServletUtil.fixHeaders(response);
```

``` java
public static void fixHeaders(HttpServletResponse response) {
        if (LOG.isDebugEnabled()) {
	        response.addHeader("Access-Control-Allow-Origin", "*");
		response.addHeader("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS, DELETE");
		response.addHeader("Access-Control-Allow-Headers", "Content-Type");
		response.addHeader("Access-Control-Max-Age", "86400");
	}
}

```

To bypass authentication constraints, just delete the current `web.xml` and rename the `web-angular.xml` to `web.xml`.

I am using this plugin to allow CORS in my Chrome browser: https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi and it works just fine!

# Docker

In order to run it inside a docker container you can use :
```bash
# Build the image
sudo docker build -t cerberus-angular .
# Run it
sudo docker run -it -v ${PWD}:/usr/src/app -v /usr/src/app/node_modules -p 4200:4200 --rm cerberus-angular
```


