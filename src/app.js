import express from 'express';
import cors from 'cors';
import signup from './controllers/signup.js';
import categories from './controllers/categories.js';
const app = express();

app.use(express.json());
app.use(cors());

app.post('/register', signup);
app.get('/categories', categories);

export default app;
