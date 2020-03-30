import express from 'express';
import swaggerUi from 'swagger-ui-express'
import { rootHandler, helloHandler } from './handlers';
const swaggerDocument = require('../swagger.json')

const app = express();
const port = process.env.PORT || '8000';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', rootHandler);
app.get('/hello/:name', helloHandler);

app.listen(port, err => {
  if (err) return console.error(err);
  return console.log(`Server is listening on ${port}`);
});