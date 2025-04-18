/* In postman:

Authorization tab >> select Basic Auth

just add username and password there

some extra assertions in postman

pm.test('Response status is ok', function() {
    pm.response.to.have.status(200);
});

                                            ASSUMMING response:
                                            -------------------

                                            {
                                                "authenticated": true
                                            }

pm.test('Response object has "authenticated" = true', () => {
    pm.response.to.have.jsonBody("authenticated");
    pm.expect(pm.response.json().authenticated).to.be.true;
}); 

                                    Cypress syntax for basic auth:
                                    -----------------------------


  'auth': {
    'user': 'username',
    'pass': 'password',
    'sendImmediately': false
  }
*/

import { BASIC_AUTH_TESTDATA } from "../testdata/api_basic_auth_testdata";

it('Basic Auth in Cypress', () => {
    cy.request({
        method: 'GET',
        url: 'https://postman-echo.com/basic-auth',
        auth: {
            user: BASIC_AUTH_TESTDATA.USERNAME,
            pass: BASIC_AUTH_TESTDATA.PASSWORD,
            sendImmediately: true
        },
        retryOnNetworkFailure: true,
        failOnStatusCode: false
    }).then((basicAuthResp) => {
        expect(basicAuthResp.status).to.eq(200);
        expect(basicAuthResp.body).has.property('authenticated');
        expect(basicAuthResp.body.authenticated).to.be.true;
    });
});