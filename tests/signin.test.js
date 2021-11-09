import supertest from 'supertest';
import '../src/setup/setup.js';
import app from '../src/app.js';
import connection from '../src/database/database.js';
import { deleteUser, insertUser } from '../src/factories/userFactory.js';
import { addNewSession } from '../src/factories/sessionsFactory.js';
import { mockedUser } from '../src/mocks/userMock.js';

const agent = supertest(app);

afterAll(async () => {
  connection.end();
});

beforeAll(async () => {
  await deleteUser();
  await connection.query('DELETE FROM countries');
});

describe('POST /signin', () => {
  beforeEach(async () => {
    await insertUser(
      mockedUser.name,
      mockedUser.email,
      mockedUser.hashedPassword(),
      mockedUser.selectedCountry,
      mockedUser.birthDate
    );
    await addNewSession();
  });

  afterEach(async () => {
    await deleteUser();
    await connection.query('DELETE FROM countries');
  });

  test('Should return status code 200 and a body with user_id and token, if user is registered', async () => {
    const connectionData = {
      email: mockedUser.email,
      password: mockedUser.password,
    };
    const result = await agent.post('/signin').send(connectionData);
    expect(result.status).toEqual(200);
    expect(result.body).toHaveProperty('token');
  });

  test('Sould return status code 400, if user is not registered or has passed invalid credentials', async () => {
    const connectionData = {
      email: mockedUser.email,
      password: mockedUser.fakePassword(),
    };

    const result = await agent.post('/signin').send(connectionData);
    expect(result.status).toEqual(400);
    expect(result.body).toEqual({ message: 'Usuário ou senha incorretos.' });
  });
});
