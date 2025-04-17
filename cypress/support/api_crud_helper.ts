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
    cy.log('BASE URL -> ', Cypress.env('baseUrl'))
    return cy.request({
        method: 'GET',
        url: `${Cypress.env('baseUrl')}/api/users`,
        failOnStatusCode: false,
        headers: {
            select: '{"Name", "Id"}',
        }
    });
}