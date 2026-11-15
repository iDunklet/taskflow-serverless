
import type { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';

export class TaskController {

    private taskService: TaskService;

    constructor(taskService: TaskService) {
        this.taskService = taskService;
    }

    // TODO: Crear el método getAllTasks()
    public getAllTasks(req: Request, res: Response): void {
        const tasks = this.taskService.getAllTasks();
        res.json(tasks);

    }
    public getTaskById(req: Request, res: Response): void {
    const rawId = req.params.id;

    if (typeof rawId !== 'string') {
        res.status(400).json({ message: 'Invalid task ID' });
    } else {
        const id = Number(rawId);
        if(!Number.isInteger(id) || id <= 0) {
            res.status(400).json({ message: 'Invalid task ID' });
        }else{
        const task = this.taskService.getTaskById(id);

        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    }
    }

    }
    public createTask(req: Request, res: Response): void {
        const { title, description, status } = req.body; 
        const taskData = {
        title,
        description,
        status
        };  
        const newTask = this.taskService.createTask(taskData);
        res.status(201).json(newTask);
    }

public updateTask(req: Request, res: Response): void {
    const rawId = req.params.id;

    if (typeof rawId !== 'string') {
        res.status(400).json({ message: 'Invalid task ID' });
    } else {
        const id = Number(rawId);

        if (!Number.isInteger(id) || id <= 0) {
            res.status(400).json({ message: 'Invalid task ID' });
        } else {
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
            } else {
                const updatedTask = {
                    title,
                    description,
                    status,
                    completed
                };

                const task = this.taskService.updateTask(id, updatedTask);

                if (task) {
                    res.status(200).json(task);
                } else {
                    res.status(404).json({ message: 'Task not found' });
                }
            }
        }
    }

}

public deleteTask(req: Request, res: Response): void {

    // TODO 1: Obtener req.params.id.
    const rawId = req.params.id;

    // TODO 2: Validar que sea un string.
    if (typeof rawId !== 'string') {
        res.status(400).json({ message: 'Invalid task ID' });
        return;
    }

    // TODO 3: Convertirlo a número y comprobar
    // que sea un entero positivo.
    const id = Number(rawId);
    if (!Number.isInteger(id) || id <= 0) {
        res.status(400).json({ message: 'Invalid task ID' });
        return;
    }

    // TODO 4: Llamar a this.taskService.deleteTask(id).
    const deleted = this.taskService.deleteTask(id);
    // TODO 5: Si devuelve true, responder 204.
    // Si devuelve false, responder 404.
    if (deleted) {
        res.status(204).send();
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
}


    
}


