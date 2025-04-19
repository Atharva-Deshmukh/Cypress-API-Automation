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
but bearer token is more secured */

import * as tokenHelpers from '../../support/api_bearer_token_helper';
import { AUTH_TESTDATA } from '../../testdata/api_bearer_token_auth_testdata';

describe('Bearer token workflow', () => {

    let accessToken;

    before('Generate auth token to be used for authentication', () => {
        cy.getAccessToken().then((authResp) => {
            accessToken = authResp;
        });
    });

    it('Get book lists using the above token now', () => {
        tokenHelpers.getAllBooks(accessToken).then((getAllResp) => {
            expect(getAllResp.status).to.eq(200);
            expect(getAllResp.body.length).to.be.greaterThan(0);
            expect(getAllResp.body[0]).to.deep.equal(AUTH_TESTDATA);
        });
    });
});