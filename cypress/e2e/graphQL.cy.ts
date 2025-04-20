/*
Never worked on it before, but I do know the basics.
It requires backend setup

IN POSTMAN:
----------

body >> graphQL >> there we can add the Body consisting of query, mutation or subscription

In Cypress, we just have to add these three headers to cy.request()

cy.request({
    method: 'POST',
    url: '/graphql',
    body: {       // You will get this in inspect tab
        operationName: 'name here',
        query: 'query, mutation or subscription in stringified object format',
        variables: {var: value}
    }
});
*/