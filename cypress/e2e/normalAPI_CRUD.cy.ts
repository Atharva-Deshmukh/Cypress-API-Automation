import * as apiHelpers from '../support/api_crud_helper';

describe('API CRUD WORKFLOW', () => {

    it('Get All users', () => {
        apiHelpers.getAllUsers().then((resp) => {
            expect(resp.body).to.haveOwnProperty('data');
            expect(resp.body.data.length).to.be.greaterThan(0);
        });
    });

    // it('CRUD workflow', () => {
    //     // get user by ID

    //     // edit 
    // });

});