import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import router from '../routers';
import auth from '../middleware/auth';

dotenv.config();

const app: Express = express();
const { DOMAIN } = process.env;

app.use(cors({
  allowedHeaders: 'Content-Type,Authorization',
  methods: 'GET,POST',
  origin: DOMAIN,
}));

app.use(express.json());
//app.use(auth);
app.use('/api/v1', router);

export default app;
