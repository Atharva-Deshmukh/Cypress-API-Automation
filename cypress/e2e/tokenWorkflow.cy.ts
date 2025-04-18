import * as tokenHelpers from '../support/api_token_helper';
import { AUTH_TESTDATA } from '../testdata/api_auth_testdata';

describe('Simple token workflow', () => {

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