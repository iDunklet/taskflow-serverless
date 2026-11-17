import { PutCommand } from "@aws-sdk/lib-dynamodb";
import dynamoClient from "../config/dynamoClient";
import type { Task } from "../models/Task";

export class TaskRepository {
    async save(task: Task): Promise<void> {
        const command = new PutCommand({
            TableName: "Tasks",
            Item: task
        });
        await dynamoClient.send(command);
    }
}