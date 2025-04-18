export function getAccessToken() {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('tokenBaseUrl')}/api-clients/`,
        retryOnNetworkFailure: true,
        failOnStatusCode: false,
        body: {
            /* client name and client email ids are randomly generated */
            clientName: "AD_SDET" + Math.random().toString(5).substring(2),
            clientEmail: "ad" + Math.random().toString(5).substring(2) + "@example.com"
        }
    }).then((authResp) => {
        return authResp.body.accessToken;
    });
}

export function getAllBooks(accessToken: string) {
    return cy.request({
        method: 'GET',
        url: `${Cypress.env('tokenBaseUrl')}/books`,
        headers: {
            Authorization: accessToken,
        },
    });
}

