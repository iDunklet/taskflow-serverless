import { randomUUID } from "node:crypto";
import type { Task } from '../models/Task';
import { TaskRepository } from '../repositories/TaskRepository';
export class TaskService {
    private taskRepository = new TaskRepository();

    

    public getAllTasks(): Promise<Task[]> {
        return this.taskRepository.findAll();
    }

    public async getTaskById(id: string): Promise<Task | undefined> {
        const task = await this.taskRepository.findById(id);
        return task;
        
    }
    
    public async createTask(task: Omit<Task, 'id' | 'completed'>): Promise<Task> {
        const newTask: Task = {
            ...task,
            id: randomUUID(),
            completed: false
        };
        await this.taskRepository.save(newTask);
        return newTask;
    }

    public async updateTask(
    id: string,
    updatedTask: Omit<Task, 'id'>
): Promise<Task | undefined> {
        const task: Task = {
            ...updatedTask,
            id: id
        };
        const result = await this.taskRepository.update(task);
    return result;
}
    public async deleteTask(id: string): Promise<boolean> {
    const deleted = await this.taskRepository.delete(id);
    return deleted;
}
}
