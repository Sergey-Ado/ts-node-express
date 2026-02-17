import express, { type Request, type Response } from 'express';
import { createServer } from 'node:http';
// import { dirname, join } from 'node:path';
// import { fileURLToPath } from 'node:url';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

// const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  // res.sendFile(join(__dirname, 'index.html'));
  res.send('Hello');
});

io.on('connection', (socket) => {
  // console.log('a user connected');
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

export default server;
