export function createXMLUser(createXMLPayload: any) {
    return cy.request({
        method: 'POST',
        url: `https://petstore.swagger.io/v2/pet`,
        failOnStatusCode: false,
        retryOnNetworkFailure: true,
        headers: {
            'Content-Type': 'application/xml', 
            Accept: 'application/xml'
        },
        body: createXMLPayload
    });
}
