import supertest from 'supertest';
import '../src/setup/setup.js';
import app from '../src/app.js';
import connection from '../src/database/database.js';
import { deleteUser } from '../src/factories/userFactory.js';
import { mockedUser } from '../src/mocks/userMock.js';

const agent = supertest(app);

afterAll(async () => {
  connection.end();
});

beforeAll(async () => {
  deleteUser();
  await connection.query('DELETE FROM countries');
});

describe('POST /signup', () => {
  beforeEach(async () => {
    deleteUser();
    await connection.query('DELETE FROM countries');
  });

  afterEach(async () => {
    deleteUser();
    await connection.query('DELETE FROM countries');
  });

  test('Should return status 406 if register data is invalid', async () => {
    const newUser = {
      name: mockedUser.name,
      email: mockedUser.email,
      password: mockedUser.password,
      selectedCountry: mockedUser.selectedCountry(),
      birthDate: mockedUser.birthDate,
      confirmedPassword: mockedUser.confirmedPassword(),
    };

    const result = await agent.post('/signup').send(newUser);
    expect(result.status).toEqual(200);
    expect(result.body).toEqual({ message: 'Registro efetuado!' });
    // expect(result.body).toHaveProperty('name');
    // expect(result.body).toHaveProperty('selectedCountry');
    // expect(result.body).toHaveProperty('birthDate');
    // expect(result.body).toHaveProperty('email');
    // expect(result.body).toHaveProperty('password');
    // expect(result.body).toHaveProperty('confirmedPassword');
  });
});
