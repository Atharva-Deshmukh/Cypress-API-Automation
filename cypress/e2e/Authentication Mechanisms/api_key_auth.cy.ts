/* Bearer tokens are part of the OAuth 2.0 authentication framework. They are dynamic tokens that expire 
after a certain period and can be refreshed. 
Unlike API keys, Bearer tokens include metadata about 
the user and the application, providing more granular control over API access.

API Key: API keys are simple but not very secure. They can be easily exposed if included in URL 
parameters or shared inadvertently. Anyone with the key can access the API.
Bearer Token: Bearer tokens are more secure. They are typically used over HTTPS, 
include user-specific information, and have an expiration time, reducing the risk of misuse.

API Key: Best suited for simple applications where security is not a major concern, or for 
server-to-server communication where the risk of key exposure is minimal.
Bearer Token: Ideal for applications requiring strong security, user-specific access control, 
and complex authentication flows. They are perfect for user-centric applications like web and mobile apps.

API keys are easy to setup up than bearer token since the later involves setting up 0auth setup
but bearer token is more secured 

In postman >> Authorization >> select API key >> there we have option to add the key to query param or to 
the header 

Add query params in qs option in cy.request() 

URL used: 
https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid={API_KEY}

Login and go to API keys in profile section, we will get unique appid

API key is manually generated, hence storing here in hardcoded format */


it('API Key auth', () => {
    cy.request({
        method: 'GET',
        url: 'https://api.openweathermap.org/data/2.5/weather',
        qs: {
            lat: '44.34',
            lon: '10.99',
            appid: 'f6aa30e1bcdfd100281d0026956e1433',
        }
    }).then((authResp) => {
        expect(authResp.status).to.eq(200);
        expect(authResp.body.base).to.eq("stations");
    });
});

