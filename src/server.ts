import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import router from './router/router';

const app = express();

const PORT = process.env.PORT || 8080;

app.get('/', (req: Request, res: Response) => {
  res.send('success connect to the API');
});

app.use(
  cors({
    origin: '*',
    credentials: true,
  }),
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(router);
app.listen(PORT, () => {
  console.log(`App listen on port ${PORT}`);
});
