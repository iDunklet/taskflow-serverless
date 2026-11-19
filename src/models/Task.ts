import type { TaskStatus } from './TaskStatus.js';
export interface Task{
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    completed: boolean;
}