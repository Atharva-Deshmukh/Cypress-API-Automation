export function getUserByIdUsingQueryParam(queryParams: any) {
    return cy.request({
        method: 'GET',
        url: `https://fakestoreapi.com/products`,
        qs: queryParams
    });
}