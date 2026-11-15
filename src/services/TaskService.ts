
import type { Task } from '../models/Task';

export class TaskService {

    private tasks: Task[] = [
        {
            id: 1,
            title: 'Aprender TypeScript',
            description: 'Aprender a crear una API REST',
            status: 'IN_PROGRESS',
            completed: false
        },
        {
            id: 2,
            title: 'Aprender AWS',
            description: 'Aprender Lambda y DynamoDB',
            status: 'PENDING',
            completed: false
        }
    ];

    private nextId: number = 3;

    public getAllTasks(): Task[] {
        return this.tasks;
    }
    public getTaskById(id: number): Task | undefined {
        return this.tasks.find(task => task.id === id);
    }
    
    public createTask(task: Omit<Task, 'id'|'completed'>): Task {
        const newTask: Task = {
            ...task,
            id: this.nextId++,
            completed: false
        };
        this.tasks.push(newTask);
        return newTask;
    }
    public updateTask(
    id: number,
    updatedTask: Omit<Task, 'id'>
): Task | undefined {

    let result: Task | undefined = undefined;

    const taskIndex = this.tasks.findIndex(task => task.id === id);

    if (taskIndex !== -1) {
        const task: Task = {
            ...updatedTask,
            id: id
        };

        this.tasks[taskIndex] = task;
        result = task;
    }

    return result;
}
    public deleteTask(id: number): boolean {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    let deleted = false;

    if (taskIndex !== -1) {
        this.tasks.splice(taskIndex, 1);
        deleted = true;
    }

    return deleted;
}
}
