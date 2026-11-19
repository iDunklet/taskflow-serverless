
import type { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';

export class TaskController {

    private taskService: TaskService;

    constructor(taskService: TaskService) {
        this.taskService = taskService;
    }

    public async getAllTasks(req: Request, res: Response): Promise<void> {
        try {
            const tasks = await this.taskService.getAllTasks();
            res.status(200).json(tasks);
        } catch (error) {
            console.error('Error retrieving tasks:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public async getTaskById(req: Request, res: Response): Promise<void> {
        const rawId = req.params.id;

        if (typeof rawId !== 'string' || rawId.trim() === '') {
            res.status(400).json({ message: 'Invalid task ID' });
            return;
        }

        try {
            const task = await this.taskService.getTaskById(rawId);

            if (task) {
                res.status(200).json(task);
            } else {
                res.status(404).json({ message: 'Task not found' });
            }
        } catch (error) {
            console.error('Error retrieving task:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public async createTask(req: Request, res: Response): Promise<void> {
        const { title, description, status } = req.body ?? {};

        if (
            typeof title !== 'string' ||
            title.trim() === '' ||
            typeof description !== 'string' ||
            description.trim() === '' ||
            !['PENDING', 'IN_PROGRESS', 'COMPLETED'].includes(status)
        ) {
            res.status(400).json({ message: 'Invalid task data' });
            return;
        }

        const taskData = {
            title,
            description,
            status
        };

        try {
            const newTask = await this.taskService.createTask(taskData);
            res.status(201).json(newTask);
        } catch (error) {
            console.error('Error creating task:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public async updateTask(req: Request, res: Response): Promise<void> {
        const rawId = req.params.id;

        if (typeof rawId !== 'string' || rawId.trim() === '') {
            res.status(400).json({ message: 'Invalid task ID' });
            return;
        }

        const { title, description, status, completed } = req.body ?? {};

        if (
            typeof title !== 'string' ||
            title.trim() === '' ||
            typeof description !== 'string' ||
            description.trim() === '' ||
            !['PENDING', 'IN_PROGRESS', 'COMPLETED'].includes(status) ||
            typeof completed !== 'boolean'
        ) {
            res.status(400).json({ message: 'Invalid task data' });
            return;
        }

        const updatedTask = {
            title,
            description,
            status,
            completed
        };

        try {
            const task = await this.taskService.updateTask(rawId, updatedTask);

            if (task) {
                res.status(200).json(task);
            } else {
                res.status(404).json({ message: 'Task not found' });
            }
        } catch (error) {
            console.error('Error updating task:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    public async deleteTask(req: Request, res: Response): Promise<void> {
        const rawId = req.params.id;

        if (typeof rawId !== 'string' || rawId.trim() === '') {
            res.status(400).json({ message: 'Invalid task ID' });
            return;
        }

        try {
            const deleted = await this.taskService.deleteTask(rawId);

            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Task not found' });
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}
