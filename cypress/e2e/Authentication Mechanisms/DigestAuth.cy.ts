/* 
Digest authentication does the same thing as Basic authentication, but it provides a security improvement 
in the way in which a user's credentials are sent across the network. Using Digest authentication, 
credentials are transmitted across the network as an MD5 (message digest) hash.

In cypress, just pass this in auth option in cy.request()

  'auth': {
    'username': 'username',
    'password': 'password',
    'method': 'degest'
  }

  URL to be used in cypress for digest auth is same as the one used for basic auth
*/

import { BASIC_AUTH_TESTDATA } from "../../testdata/api_basic_auth_testdata";


it('Digest Auth in Cypress', () => {
    cy.request({
        method: 'GET',
        url: 'https://postman-echo.com/basic-auth',
        auth: {
            username: BASIC_AUTH_TESTDATA.USERNAME,
            password: BASIC_AUTH_TESTDATA.PASSWORD,
            method: 'degest'
        },
        retryOnNetworkFailure: true,
        failOnStatusCode: false
    }).then((digestAuthResp) => {
        expect(digestAuthResp.status).to.eq(200);
        expect(digestAuthResp.body).has.property('authenticated');
        expect(digestAuthResp.body.authenticated).to.be.true;
    });
});

