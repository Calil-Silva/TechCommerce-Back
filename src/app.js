import express from 'express';
import cors from 'cors';
import signin from './controllers/signin.js';

const app = express();

app.use(express.json());
app.use(cors());

app.post('/signin', signin);

export default app;
