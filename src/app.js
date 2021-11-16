import express from 'express';
import cors from 'cors';
import categories from './controllers/categories.js';
import signin from './controllers/signin.js';
import signup from './controllers/signup.js';
import products from './controllers/products.js';
import checkout from './controllers/checkout.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/categories', categories);
app.post('/signin', signin);
app.post('/signup', signup);
app.get('/products', products);
app.put('/checkout', checkout);

export default app;
