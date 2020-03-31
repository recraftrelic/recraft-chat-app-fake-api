import jsonServer from 'json-server';
import path from 'path';
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from '../swagger.json';
import loginRouter from './routes/login';

const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middleWares = jsonServer.defaults()
const port = process.env.PORT || '8000';
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

server.use(jsonServer.bodyParser)

server.use((req: { method: string; body: { createdAt: number } }, res: any, next: () => void) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

server.use(middleWares)
server.use('/login', loginRouter)
server.use(router)
server.listen(port, (err: any) => {
  if (err) return console.error(err);
  return console.log(`Server is listening on ${port}`);
});
