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

describe('POST /signin', () => {
  beforeEach(async () => {
    await insertUser(
      mockedUser.name,
      mockedUser.email,
      mockedUser.hashedPassword()
    );
    await addNewSession();
  });

  afterEach(async () => {
    await deleteUser();
  });

  test('Should return status code 202', async () => {
    const connectionData = {
      email: mockedUser.email,
      password: mockedUser.password,
    };
    const result = await agent.post('/signin').send(connectionData);
    expect(result.status).toEqual(202);
  });
});
