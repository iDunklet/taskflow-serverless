import { PutCommand, GetCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";import dynamoClient from "../config/dynamoClient";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
import type { Task } from "../models/Task";

export class TaskRepository {
    async save(task: Task): Promise<void> {
        const command = new PutCommand({
            TableName: "Tasks",
            Item: task
        });
        await dynamoClient.send(command);
    }
    public async findById(id: string): Promise<Task | undefined> {
        const command = new GetCommand({
            TableName: "Tasks",
            Key: { id }
        });
        const result = await dynamoClient.send(command);
        return result.Item as Task | undefined;
    }
    public async findAll(): Promise<Task[]> {
        const command = new ScanCommand({
            TableName: "Tasks"
        });
        const result = await dynamoClient.send(command);
        return (result.Items ?? []) as Task[];
    }
    public async update(task: Task): Promise<Task | undefined> {
        const existingTask = await this.findById(task.id);
        if (existingTask) {
            await this.save(task);
            return task;
        }else{
            return undefined;
        }
    }
    public async delete(id: string): Promise<boolean> {
        const existingTask = await this.findById(id);
        if (existingTask) {
            const command = new DeleteCommand({
                TableName: "Tasks",
                Key: { id }
            });
            await dynamoClient.send(command);
            return true;
        } else {
            return false;
        }  
    }


}