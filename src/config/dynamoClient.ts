
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// Conexión con DynamoDB Local
const client = new DynamoDBClient({
    region: "eu-west-1",
    endpoint: "http://localhost:8000",
    credentials: {
        accessKeyId: "local",
        secretAccessKey: "local"
    }
});

// Cliente para trabajar con objetos JavaScript
const dynamoClient = DynamoDBDocumentClient.from(client);

export default dynamoClient;
