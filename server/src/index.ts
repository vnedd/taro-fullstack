import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import express from 'express';

import router from './routes';
import connectMongoDB from './config/db.config';
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware';
import stripeRouter from './routes/stripe';

dotenv.config();

const app = express();
const dbUrl = process.env.DB_URL!;
const port = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use(cors());

app.use(
  express.urlencoded({
    extended: true
  })
);

connectMongoDB(dbUrl);

app.use('/', stripeRouter);

app.use(express.json());

app.use('/api', router);

app.use(errorHandlingMiddleware);

const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

process.on('SIGINT', () => {
  server.close(() => console.log(`Exit server express`));
});
