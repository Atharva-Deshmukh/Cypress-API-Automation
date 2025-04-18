import * as queryParamHelper from '../support/api_queryParam_helper';
import { QUERY_PARAM_TESTDATA } from '../testdata/api_queryParam_testdata';

describe('Query Parameter workflow', () => {
    it('Use qs in cy.request()', () => {
        queryParamHelper.getUserByIdUsingQueryParam(QUERY_PARAM_TESTDATA.qsObj).then((queryParamResp) => {
            expect(queryParamResp.status).to.equal(200);
            expect(queryParamResp.body.length).to.equal(QUERY_PARAM_TESTDATA.qsObj.limit);
        });
    });
});