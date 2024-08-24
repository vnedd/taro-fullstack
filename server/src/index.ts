import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';

import router from './routes';
import connectMongoDB from './config/db.config';
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware';

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
app.use(express.json());

connectMongoDB(dbUrl);

app.use('/api', router);
app.use(errorHandlingMiddleware);

const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

process.on('SIGINT', () => {
  server.close(() => console.log(`Exit server express`));
});
