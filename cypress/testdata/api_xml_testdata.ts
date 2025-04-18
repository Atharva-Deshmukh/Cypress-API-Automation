/* XML format
    <?xml version="1.0" encoding="UTF-8" standalone="yes"?>
    <Pet>
        <id>9223372036854775807</id>
        <name>AD_SAUR</name>
        <photoUrls>
            <photoUrl>string</photoUrl>
        </photoUrls>
        <status>available</status>
        <tags/>
    </Pet>  
*/

export const XML_JSON_TESTDATA = {

    /* XML payload should be in single line in vs code, else it gives error */
    XML_PAYLOAD: '<?xml version="1.0" encoding="UTF-8"?><Pet>	<id>0</id>	<Category>		<id>0</id>		<name>AIR_BENDERS</name>	</Category>	<name>AD_SAURUS_API</name>	<photoUrls>		<photoUrl>string</photoUrl>	</photoUrls>	<tags>		<Tag>			<id>0</id>			<name>string</name>		</Tag>	</tags>	<status>available</status></Pet>',
    XML_RESPONSE: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Pet>    <id>9223372036854775807</id>    <name>AD_SAURUS_API</name>    <photoUrls>        <photoUrl>string</photoUrl>    </photoUrls>    <status>available</status>    <tags/></Pet>',

    JSON_RESP: {
        id: 9223372036854775807,
        name: "AD_SAURUS_API",
        photoUrls: [
            "string"
        ],
        tags: [],
        status: "available"
    }
}
