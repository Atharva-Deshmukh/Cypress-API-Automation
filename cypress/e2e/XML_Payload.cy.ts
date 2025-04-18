/* BELOW CODE IS NOT WORKING!! JUST FOR REFERENCE AND CONCEPTS FOR INTERVIEW 

SWAGGER USED: https://petstore.swagger.io/#/pet/addPet 

Package used: xml2json: yarn add xml2json --> PACKAGE BASED 

In postman, we can simply use the below headers: 
Content-Type: application/xml 
Accept: application/xml */

import * as xmlApiHelper from '../support/api_xml_helper';
import { XML_JSON_TESTDATA} from '../testdata/api_xml_testdata';
let parser = require('xml2json');


describe('JSON XML Workflow', () => {

    // let xmlParserInstance = new xml2js.Parser({explicitArray: false}) 

    it('Create the user and verify', () => {
        xmlApiHelper.createXMLUser(XML_JSON_TESTDATA.XML_PAYLOAD).then((createXmlResp) => {
            expect(createXmlResp.status).to.equal(200);

            /* the response is also in xml now, we need to convert it to json, parse it and then assert on it */
            
            let result = parser.toJson(createXmlResp.body);
            console.warn('RESULT -> ', result)
        });
    });
});



