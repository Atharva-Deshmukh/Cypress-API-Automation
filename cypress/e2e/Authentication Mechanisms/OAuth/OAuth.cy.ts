/* Mechanism is given in the diagram in this folder

We will implement OAuth in github

For applying OAuth, we need to create a client app on the host that supports OAuth
this gives us the client id and client secret

                        Basic OAuth workflow (this workflow varies from host to host):
                        ------------------------------------------------------------

- Create a client app on the host supporting OAuth
- Generate client Id and client secret there
- Now, we need authorization token
- After getting authorization code, we use client_id, client_secret and authorization token we got
- After we get OAuth token, we can now use it to get actual resources through APIs

                                    How to create client app in github?
                                    ----------------------------------

- Github profile >> settings >> Developer settings >> OAuth apps >> Create app there
- Generate client id and client secret here
- After generating clientId and clientSecret there, we need authorization token
- On Github, there is an URL to which we need to add our clientsecret, and we get auth token
  https://github.com/login/oauth/authorize?client_id=<clientId here>
- Hit this, and click on authorise
- This redirects us to our client app url we set and in the url itself, we have a code:
  In my case: https://github.com/settings/applications/new?code=b5198b8384b65dd0a7d2
- Now, we have client id, client secret, authorization token, using these 3, we request for 
  OAuth token now to the Auth server
  Hit the below POST request and get OAuth token

  POST https://github.com/login/oauth/access_token

  QueryParams to pass:
    client_id       => string	Required => The client ID you received from GitHub for your OAuth app.
    client_secret   => string	Required => The client secret you received from GitHub for your OAuth app.
    code            => string	Required => the Authorization code we got previously


    After hitting, format of response:
    access_token=<oauthTokenHere>&scope=&token_type=bearer

This was the OAuth token, we will use this OAuth token to get response from the server
On server side, server to verifies from the Auth server if this OAuth token is valid, and responds only then

API to test we used = github repo API: https://api.github.com/user/repos
Bearer token Authorization is required for above API

Respnse:

[
    {
        "id": "id here",
        "node_id": "id here",
        "name": "Atharva-Deshmukh",
        "full_name": "Atharva-Deshmukh/Atharva-Deshmukh",
        "private": false,
        "owner": {
            "login": "Atharva-Deshmukh",
            "id": id here,
            "node_id": "node id here",
            .
            .
            .
            .

*/

/* CANNOT PUSH the below three with actual values since git by default
    doesn't allow to push client secrets
*/
let gitHubClientId: string = 'YOUR GITHUB TOKEN HERE';
let gitHubClientSecret: string = 'client secret';
let authorizationCode: string = 'auth code ';  // this auth code expires soon

/* Below code DOES NOT WORK since we need manual interaction and github is cross origin for cypress
So, gives error, better generate token manually and then use it in subsequent requests */

it.skip('captures redirect URL from GET request', () => {
    cy.request({
      url: 'https://github.com/login/oauth/authorize',
      followRedirect: true, // Important!
      qs: {
        client_id: gitHubClientId,
      }
    }).then((resp) => {
      console.warn('RESP -> ', resp)
      expect(resp.status).to.eq(302) // or 301  --> check if we were redirected.
      const redirectUrl = resp.redirectedToUrl;
      const url = new URL(redirectUrl)
      console.warn('URL redirected to - 1', url.href)
    //   const code = url.searchParams.get('code')
    //   cy.log('Redirect URL:', redirectUrl)
    //   cy.log('Code:', code)
    
    return cy.request({
        url: url.href,
        followRedirect: true
      })

    }).then((redirect2Resp) => {
        console.warn('redirect 2 resp', redirect2Resp)
    });
  });
    

