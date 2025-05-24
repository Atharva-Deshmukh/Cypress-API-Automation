/* In Postman: 
    req: POST
    body: form-data 
          key - value (file is uploaded here)

    In Cypress:
    - we use XMLHttpRequest()
      assuming key = key and value = file to be uploaded in body >> form-data

      We require following functions
*/


function formRequest(method: string, url: string, formData, headers) {

    const request = new XMLHttpRequest(); /* XHR request */

    /* Initializes a newly-created request, or re-initializes an existing one.
       Syntax: open(method, url, async)
       An optional Boolean parameter, defaulting to true, indicating whether or not to perform the 
       operation asynchronously. If this value is false, the send() method does not return until the 
       response is received. If true, notification of a completed transaction is provided using event 
       listeners. 
    */
    request.open(method, url, false);

    if(headers) {
        headers.forEach(function (header) {
            request.setRequestHeader(header.name, header.value);
        });
    }

    request.send(formData);
    return request;
}

export function uploadFileWithoutFixture(url: string, accessToken: string, projectId: string, value: any) {
    let headers = [
        {accessToken: 'Bearer ' + accessToken},
        {projectId: projectId},
    ];

    const formData = new FormData(); /* Helps to create key value pairs */
    formData.set('key', JSON.stringify(value));
    return cy.then(() => formRequest('POST', url, formData, headers)); 

}

export function uploadFileWithFixture(url: string, accessToken: string, projectId: string, value: any) {

    return cy.fixture('./fileToUpload', 'binary').then((binary) => {

        const blob = Cypress.Blob.binaryStringToBlob(binary, '.pdf');
        let headers = [
            { accessToken: 'Bearer ' + accessToken },
            { projectId: projectId },
        ];

        const formData = new FormData(); /* Helps to create key value pairs */
        formData.set('key', JSON.stringify(value));
        formData.set('file', blob, 'FileNameHere');
        return cy.then(() => formRequest('POST', url, formData, headers));
    })

}