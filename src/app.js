import express from 'express';
import cors from 'cors';
import signup from './controllers/signup.js';

const app = express();

app.use(express.json());
app.use(cors());

app.post('/register', signup);

export default app;
