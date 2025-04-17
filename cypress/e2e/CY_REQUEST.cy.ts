/* 
Makes an HTTP request.

                                                        Syntax:
                                                        -------
cy.request(url)
cy.request(url, body)
cy.request(method, url)
cy.request(method, url, body)
cy.request(options)

                                                      PROPERTIES:
                                                      ----------
Request is not displayed in the Network Tab of Developer Tools
Cypress does not actually make an XHR request from the browser. 
We are actually making the HTTP request from Cypress (in Node). 
So, you won't see the request inside of your Developer Tools.


CORS is bypassed
Normally when the browser detects a cross-origin HTTP request, 
it will send an OPTIONS preflight check to ensure the server allows cross-origin requests, 
but cy.request() bypasses CORS entirely.

// we can make requests to any external server, no problem.
cy.request('https://www.google.com/webhp?#q=cypress.io+cors')
  .its('body')
  .should('include', 'Testing, the way it should be') // true


                                                        IMP PART:
                                                        ---------
                                                        
If you do not provide a fully qualified domain name (FQDN) URL, 
Cypress will make its best guess as to which host you want cy.request() to use in the URL.

If you make a cy.request() after visiting a page, 
Cypress assumes the URL used for the cy.visit() is the host.

cy.visit('http://localhost:8080/app')
cy.request('users/1.json') //  URL is  http://localhost:8080/users/1.json

If you make a cy.request() prior to visiting a page, Cypress assumes the host is the 
baseUrl property configured inside of of your configuration file.

// cypress.config.ts
import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:1234',
  },
})

cy.request('seed/admin') // URL is http://localhost:1234/seed/admin

If Cypress cannot determine the host it will throw an error.


Yields 
cy.request() yields the response as an object literal containing properties such as:

status
body
headers
duration

*/

it('Checking response object', () => {
    cy.request('https://reqres.in/api/users').then((respObj) => {
      console.warn('OBJ -> ', respObj);
      
      /* OUTPUT:
      
      {
        body: {
        data = [],
        },
        duration: 80,
        headers: {},
        requestHeaders: {},
        status: 200,
        statusText: "OK"
      }
      */
    });
});

/* Sometimes it's quicker to test the contents of a page rather than cy.visit() and wait for the 
entire page and all of its resources to load.

cy.request('/admin').its('body').should('include', '<h1>Admin</h1>')


Alias the request using .as()
cy.request('https://jsonplaceholder.cypress.io/comments').as('comments')

cy.get('@comments').should((response) => {
  expect(response.body).to.have.length(500)
  expect(response).to.have.property('headers')
  expect(response).to.have.property('duration')
})

Request a page while disabling auto redirect
To test the redirection behavior of a login without a session, cy.request can be used to check the status and redirectedToUrl property.

The redirectedToUrl property is a special Cypress property that normalizes the URL the browser would normally follow during a redirect.

cy.request({
  url: '/dashboard',
  followRedirect: false, // turn off following redirects
}).then((resp) => {
  // redirect status code is 302
  expect(resp.status).to.eq(302)
  expect(resp.redirectedToUrl).to.eq('http://localhost:8082/unauthorized')
})

Download a PDF file
By passing the encoding: binary option, the response.body will be serialized binary content of the file. You can use this to access various file types via .request() like .pdf, .zip, or .doc files.

cy.request({
  url: 'http://localhost:8080/some-document.pdf',
  encoding: 'binary',
}).then((response) => {
  cy.writeFile('path/to/save/document.pdf', response.body, 'binary')
})

Get Data URL of an image
By passing the encoding: base64 option, the response.body will be base64-encoded content of the image. You can use this to construct a Data URI for use elsewhere.

cy.request({
  url: 'https://docs.cypress.io/img/logo.png',
  encoding: 'base64',
}).then((response) => {
  const base64Content = response.body
  const mime = response.headers['content-type'] // or 'image/png'
  // see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
  const imageDataUrl = `data:${mime};base64,${base64Content}`
})


HTML form submissions using form option
Oftentimes, once you have a proper e2e test around logging in, there's no reason to continue to cy.visit() the login and wait for the entire page to load all associated resources before running any other commands. Doing so can slow down our entire test suite.

Using cy.request(), we can bypass all of this because it automatically gets and sets cookies as if the requests had come from the browser.

cy.request({
  method: 'POST',
  url: '/login_with_form', // baseUrl is prepend to URL
  form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
  body: {
    username: 'jane.lane',
    password: 'password123',
  },
})

// to prove we have a session
cy.getCookie('cypress-session-cookie').should('exist')
*/