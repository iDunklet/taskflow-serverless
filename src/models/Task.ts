import type { TaskStatus } from './TaskStatus.js';
export interface Task{
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    completed: boolean;
}