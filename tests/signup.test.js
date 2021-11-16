import supertest from 'supertest';
import '../src/setup/setup.js';
import app from '../src/app.js';
import connection from '../src/database/database.js';
import { deleteUser, insertUser } from '../src/factories/userFactory.js';
import { mockedUser } from '../src/mocks/userMock.js';

const agent = supertest(app);

afterAll(async () => {
  connection.end();
});

beforeEach(async () => {
  await deleteUser();
  await connection.query('DELETE FROM countries');
});

afterEach(async () => {
  await deleteUser();
  await connection.query('DELETE FROM countries');
});

describe('POST /signup', () => {
  beforeEach(async () => {
    await deleteUser();
    await connection.query('DELETE FROM countries');
  });

  afterEach(async () => {
    await deleteUser();
    await connection.query('DELETE FROM countries');
  });

  test('Should return status 200 if register data is valid', async () => {
    const newUser = {
      name: mockedUser.name,
      email: mockedUser.email,
      password: mockedUser.password,
      selectedCountry: mockedUser.selectedCountry,
      birthDate: mockedUser.birthDate,
      confirmedPassword: mockedUser.confirmedPassword(),
    };

    const result = await agent.post('/signup').send(newUser);
    expect(result.status).toEqual(200);
    expect(result.body).toEqual({ message: 'Registro efetuado!' });
  });

  test('Should return status 406 if register data is invalid', async () => {
    const newUser = {
      name: mockedUser.name,
      email: mockedUser.email,
      password: mockedUser.password,
      selectedCountry: mockedUser.selectedCountry,
      birthDate: mockedUser.birthDate,
      confirmedPassword: mockedUser.fakePassword(),
    };

    const result = await agent.post('/signup').send(newUser);
    expect(result.status).toEqual(406);
    expect(result.body).toHaveProperty('message');
  });

  test('Should return status 400 if user is already registered', async () => {
    await insertUser(
      mockedUser.name,
      mockedUser.email,
      mockedUser.hashedPassword(),
      mockedUser.selectedCountry,
      mockedUser.birthDate
    );

    const newUser = {
      name: mockedUser.name,
      email: mockedUser.email,
      password: mockedUser.password,
      selectedCountry: mockedUser.selectedCountry,
      birthDate: mockedUser.birthDate,
      confirmedPassword: mockedUser.confirmedPassword(),
    };
    const result = await agent.post('/signup').send(newUser);
    expect(result.status).toEqual(400);
  });
});
