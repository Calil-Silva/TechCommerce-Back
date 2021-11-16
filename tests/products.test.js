import supertest from 'supertest';
import '../src/setup/setup.js';
import app from '../src/app.js';
import connection from '../src/database/database.js';
import { insertAllProducts } from '../src/factories/productsFactory.js';
import { insertAllCategories } from '../src/factories/categoriesFactory.js';

const agent = supertest(app);

afterAll(async () => {
  await connection.query('DELETE FROM products;');
  await connection.query('DELETE FROM categories;');
  await connection.query('ALTER SEQUENCE products_id_seq RESTART WITH 1;');
  await connection.query('ALTER SEQUENCE categories_id_seq RESTART WITH 1;');
  connection.end();
});

beforeAll(async () => {
  await connection.query('DELETE FROM products;');
  await connection.query('DELETE FROM categories;');
  await connection.query('ALTER SEQUENCE products_id_seq RESTART WITH 1;');
  await connection.query('ALTER SEQUENCE categories_id_seq RESTART WITH 1;');
  insertAllCategories();
  insertAllProducts();
});

describe('Route GET /products', () => {
  test('should return 200 when everything goes well. ', async () => {
    const result = await agent.get('/products?categoryID=4');

    expect(result.status).toEqual(200);
  });

  test('should return 400 if query CategoryID not exist.', async () => {
    const result = await agent.get('/products');
    expect(result.status).toEqual(400);
    expect(result.body).toHaveProperty('message');
    expect(result.body).toEqual({ message: 'Query category id not defined.' });
  });

  test('should return 400 if query CategoryID out range.', async () => {
    const result = await agent.get('/products?categoryID=7');
    expect(result.status).toEqual(400);
    expect(result.body).toHaveProperty('message');
    expect(result.body).toEqual({ message: 'Category id out of range.' });
  });
});
