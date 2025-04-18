/* FUNCTION LIKE this is USED IN REAL LIFE

function getAll(accessToken: string, filterName: string) {
    return cy.request({
        method: 'GET',
        url: '',
        failOnStatusCode: false,
        headers: {
            Authorization: 'Bearer ' + accessToken,
            clientname: '',
            select: '{"Name", "Id"}',
            filter: `{Equals: {"Name": '${filterName}'}}`
        },
        retryOnNetworkFailure: true
    });
}

*/

// base url is set already
export function getAllUsers() {
    return cy.request({
        method: 'GET',
        url: `${Cypress.env('baseUrl')}/users`,
        failOnStatusCode: false,
        headers: {
            select: '{"Name", "Id"}',
        }
    });
}

export function getUsersById(id: string) {
    return cy.request({
        method: 'GET',
        url: `${Cypress.env('baseUrl')}/users/${id}`,
        failOnStatusCode: false,
        headers: {
            select: '{"Name", "Id"}',
        }
    });
}

export function createUser(createPayload: any) {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('baseUrl')}/users`,
        failOnStatusCode: false,
        retryOnNetworkFailure: true,
        body: createPayload
    });
}

export function updateUser(updatePayload: any, id: string) {
    return cy.request({
        method: 'PUT',
        url: `${Cypress.env('baseUrl')}/users/${id}`,
        headers: {
            select: '{"name", "job"}',
        },
        failOnStatusCode: false,
        retryOnNetworkFailure: true,
        body: updatePayload
    });
}