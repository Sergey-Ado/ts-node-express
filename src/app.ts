import express, { type Request, type Response } from 'express';
import { createServer } from 'node:http';
// import { dirname, join } from 'node:path';
// import { fileURLToPath } from 'node:url';
import { Server } from 'socket.io';
import { parserInputItem } from './models/parsers.js';
// import { items } from './models/item.js';
import { v4 as uuid } from 'uuid';
import { prisma } from './prisma/prisma.js';

const app = express();
const server = createServer(app);
const io = new Server(server);

// const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});

app.post('/users', async (req: Request, res: Response) => {
  const body: unknown = req.body;
  const inputItem = parserInputItem(body);
  if (inputItem) {
    // const id = uuid();
    // const item = { id, name: inputItem.name };
    // res.status(201).json(item);
    // items.push(item);

    const id = uuid();
    console.log(inputItem);
    const newUser = await prisma.user.create({
      data: {
        id,
        name: inputItem.name,
      },
    });
    res.json(newUser);
    // res.json(inputItem);
  } else {
    res.sendStatus(204);
  }
});

app.get('/users', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  console.log(users);
  res.json(users);
  // res.json(items);
});

app.get('/users/:id', async (req: Request, res: Response) => {
  const id = req.params.id;
  // const user = items.find((item) => item.id === id);
  // if (user) res.json(user);
  // else res.sendStatus(404);
  if (typeof id === 'string') {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (user) res.json(user);
    else res.sendStatus(404);
  } else res.sendStatus(404);
});

io.on('connection', (socket) => {
  console.log('a user connected');
  // socket.on('disconnect', () => {
  //   console.log('user disconnected');
  // });
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
});

app.post('/', (req: Request, res: Response) => {
  const body = req.body;
  res.status(201).json(body);
});

app.post('/posts', async (req: Request, res: Response) => {
  const body: unknown = req.body;
  const inputItem = parserInputItem(body);
  if (inputItem) {
    const id = uuid();
    const newUser = await prisma.user.create({
      data: {
        id,
        name: inputItem.name,
      },
    });
    res.json(newUser);
  } else {
    res.sendStatus(204);
  }
});

app.get('/posts', async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

export default server;
