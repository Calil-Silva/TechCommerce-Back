import supertest from 'supertest';
import '../src/setup/setup.js';
import app from '../src/app.js';
import connection from '../src/database/database.js';

const agent = supertest(app);

afterAll(async () => {
  connection.end();
});

describe('POST /register', () => {
  test('it should return status code 201', async () => {
    const user = {
      name: 'Calil',
      email: 'calil@driven.com',
      password: '123',
    };

    const result = await agent.post('/register').send(user);
    expect(result.status).toEqual(201);
  });
});