import { Request, Response, Router } from 'express';
import Todo from '../models/todoModel'; // Import the Todo model

export class TodoRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.router.get('/', async (req: Request, res: Response) => {
      const todos = await Todo.find();
      res.json(todos);
    });

    this.router.post('/', async (req: Request, res: Response) => {
      const newTodo = new Todo({ title: req.body.title });
      await newTodo.save();
      res.json(newTodo);
    });

    this.router.put('/:id', async (req: Request, res: Response) => {
      const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedTodo);
    });

    this.router.delete('/:id', async (req: Request, res: Response) => {
      await Todo.findByIdAndDelete(req.params.id);
      res.json({ message: 'Todo deleted' });
    });
  }
}
