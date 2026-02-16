import express, { type Request, type Response } from 'express';

const app = express();

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json('Hello');
});

app.post('/', (req: Request, res: Response) => {
  const body = req.body;
  res.status(201).json(body);
});

export default app;
