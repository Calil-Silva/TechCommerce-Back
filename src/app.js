import express from 'express';
import cors from 'cors';
import categories from './controllers/categories.js';
import signin from './controllers/signin.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/categories', categories);
app.post('/signin', signin);

export default app;
