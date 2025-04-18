/*
                                            What is JSON Parsing?
                                            ----------------------
Parsing JSON involves converting a JSON string into a usable data structure within a programming environment

                                            What is JSON schema (many more are there below, scroll)
                                            ----------------------

JSON Schema is a format, written in JSON, that defines the structure and constraints of JSON data. 
It's used to validate JSON documents, ensuring they adhere to specific rules and expectations.

JSON:

{
    id: '3',
    createPayload: {
        name: "Atharva Deshmukh",
        job: "SDET"
    },
    updatePayload: {
        name: "Atharva Ji",
        job: "SDET - 2"
    }
}

JSON Schema:

{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "id": {
      "type": "string"
    },
    "createPayload": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "job": {
          "type": "string"
        }
      },
      "required": ["name", "job"]
    },
    "updatePayload": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "job": {
          "type": "string"
        }
      },
      "required": ["name", "job"]
    }
  },
  "required": ["id", "createPayload", "updatePayload"]
}


                                    How to validate JSON Schema in Postman?
                                    --------------------------------------

in scripts:
define json schema in a variable say "schema"

write this snippet:

const jsonData = pm.response.json()

pm.test('Schema Validation', function() {
  pm.expect(tv4.validate(jsonData, schema)).to.be.true
});


                                    How to validate JSON Schema in Cypress
                                    --------------------------------------

install ajv library: yarn add ajv
import it and create its instance, refer code below :) */

import { SCHEMA_TO_VALIDATE } from "../testdata/api_schema_validation_testdata";
import { Ajv } from 'ajv';

let ajvInstance = new Ajv();

it('Validate schema using ajv library', () => {
  cy.request({
    method: 'GET',
    url: 'https://reqres.in/api/users/2',
    retryOnNetworkFailure: true,
    failOnStatusCode: false
  }).then((getResp) => {
    expect(getResp.status).to.eq(200);
    expect(ajvInstance.validate(SCHEMA_TO_VALIDATE, getResp.body)).to.be.true;
  });
}); 