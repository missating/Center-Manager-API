import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './server/routes';

dotenv.config();

const port = (process.env.PORT || 8000);

// Set up the express app
const app = express();

// Log requests to the console
app.use(logger('dev'));

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

routes(app);

// Setup a default catch-all route that sends back a welcome message
app.get('/', (req, res) => res.status(200)
  .send('Welcome to Event management API'));

app.use('*', (req, res) => res.send('No way'));

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`App running on port ${port}`);
});

export default app;
