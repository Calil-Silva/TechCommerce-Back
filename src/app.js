import express from 'express';
import cors from 'cors';
import signin from './controllers/signin.js';
import signup from './controllers/signup.js';

const app = express();

app.use(express.json());
app.use(cors());

app.post('/signin', signin);
app.post('/signup', signup);

export default app;
