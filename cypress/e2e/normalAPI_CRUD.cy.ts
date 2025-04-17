import * as apiHelpers from '../support/api_crud_helper';
import { TESTDATA } from '../testdata/api_crud_testdata';

describe('API CRUD WORKFLOW', () => {

    it('Get All users', () => {
        apiHelpers.getAllUsers().then((resp) => {
            expect(resp.body).to.haveOwnProperty('data');
            expect(resp.body.data.length).to.be.greaterThan(0);
        });
    });

    it('CRUD workflow', () => {
        // get user by ID to note initial state
        apiHelpers.getUsersById(TESTDATA.id).then((getByIdResp) => {
            expect(getByIdResp.status).to.eq(200);
            expect(getByIdResp.body.data.id).to.eq(Number(TESTDATA.id));
            
            //  create a new user and get it
            let createdRespId: string;
            apiHelpers.createUser(TESTDATA.payload).then((createResp) => {
                expect(createResp.status).to.eq(201);
                createdRespId = createResp.body.id; // store the created id
                
                // verify creation --> Does not work since API does not persist, using online APIs
                // in production code, it will definitely work!
                // apiHelpers.getUsersById(createdRespId).then((createdRespVerification) => {
                //     expect(createdRespVerification.status).to.equal(200);
                //     expect(createdRespVerification.body.id).to.equal(createdRespId);
                //     expect(createdRespVerification.body.name).to.equal(TESTDATA.payload.name);
                //     expect(createdRespVerification.body.job).to.equal(TESTDATA.payload.job);
                // })
            });
        });

    });

});