# cerberus-angular
Brand new Cerberus front-end implementation

# deploy angular app

- `npm install`
- `ng serve`

# connect it to your local cerberus
Make sure to deploy the Angular app on a different port than your local Cerberus.

You will face CORS (Cross Origin Resource Sharing) issues because of the security rules of Cerberus.

To bypass it :
- Necessary servlets needs to call the ServletUtil.fixHeaders method which add specific headers to its call.
- Authentification constraint needs to be removed in `web.xml`.
- A CORS plugin is needed in your web browser.

All the necessary servlets have the fixHeaders method implemented. You just need to enable debug 

```java
protected void processRequest(HttpServletRequest request, HttpServletResponse response)
throws ServletException, IOException, JSONException {
            
...

// Calling Servlet Transversal Util.
ServletUtil.servletStart(request);
ServletUtil.fixHeaders(response);
```

```java
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
