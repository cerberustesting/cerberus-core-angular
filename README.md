# cerberus-angular
Draft of a new possible Front end implementation for Cerberus

# deploy angular app

- `npm install`
- `ng serve`

# connect it to your local cerberus
Make sure to deploy the Angular app on a different port than your local Cerberus.
- Include the following code (1) in each servlet that needs to be called (in Cerberus)
- Also make sure to make the servlet public  by editing the web.xml (2) file (in Cerberus)

> (1) to include at the end of each servlet (e.g. ReadTestCase.java)
==> not necessary since 3.10 : just call ServletUtil.fixHeaders(response) in your servlet

```java
private void fixHeaders(HttpServletResponse response) {
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS, DELETE");
        response.addHeader("Access-Control-Allow-Headers", "Content-Type");
        response.addHeader("Access-Control-Max-Age", "86400");
    }
protected void doOptions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        fixHeaders(response);
}
```
> then, call the fixHeaders function at the beginning of the servlet processRequest method, like so:
```java
protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, CerberusException {
    	fixHeaders(response);
```
> (2) to make the servlet public, find the servlet name under its `<web-resource-collection>` tag in `web.xml` and delete the `<url-pattern>` tag corresponding to it.

```xml
<web-resource-collection>
  <web-resource-name>servlet</web-resource-name>
  <description>servlet</description>
  <url-pattern>/ReadTestCase</url-pattern>
  ...
```
You may also need to allow CORS inside your browser, I am using this one with Chrome : https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi
