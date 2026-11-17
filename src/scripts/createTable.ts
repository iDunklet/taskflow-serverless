import {
    DynamoDBClient,
    CreateTableCommand,
    CreateTableCommandInput,
    ListTablesCommand
} from "@aws-sdk/client-dynamodb";




const client = new DynamoDBClient({
    region: "eu-west-1",
    endpoint: "http://localhost:8000",
    credentials: {
        accessKeyId: "local",
        secretAccessKey: "local"
    }
});

const createTable = async () => {
    try {const params: CreateTableCommandInput = {
        TableName: "Tasks", AttributeDefinitions: [
            { AttributeName: "id", AttributeType: "N" }
        ], KeySchema: [
            { AttributeName: "id", KeyType: "HASH" }
        ], BillingMode: "PAY_PER_REQUEST"
    };

    const command = new CreateTableCommand(params);
    await client.send(command);
    console.log("Table Tasks created successfully!");
}catch (error) {
    console.error("Error creating table:", error);
    process.exit(1);
};}

const listTables = async () => {
    try {
        const command = new ListTablesCommand({});
        const response = await client.send(command);
        console.log("Tables in the database:");
        (response.TableNames ?? []).forEach((name) => {
            console.log(` - ${name}`);
        });
    } catch (error) {
        console.error("Error listing tables:", error);
        process.exitCode = 1;
    }
};

void listTables();