const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");

const config={
	region:"us-east-1"
}
const DynamoConnection = new DynamoDBClient(config);

module.exports= {DynamoConnection};