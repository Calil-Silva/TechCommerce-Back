import supertest from 'supertest';
import '../src/setup/setup.js';
import app from '../src/app.js';
import connection from '../src/database/database.js';
// import { mockedUser } from '../src/mocks/userMock.js';

const agent = supertest(app);
const mockedOrder = {
  name: 'iPad mini',
  amount: 1,
  product_id: 1,
  payment_id: 1,
};
const mockedUser = {
  name: 'Fulano Silva',
  token: 'b4a7e30e-3117-48f5-b20d-95c36f391078',
  user_id: 1,
  creditCard: null,
};

afterAll(async () => {
  connection.end();
});

describe('PUT /checkout', () => {
  beforeEach(async () => {
    await connection.query(
      'UPDATE product_sku SET sale_date = NULL, user_id = NULL, payment_id = NULL'
    );
  });

  test('Should return status code 401 if user is not signed in', async () => {
    const result = await agent.put('/checkout').send(mockedOrder);
    expect(result.status).toEqual(401);
    expect(result.body).toEqual({
      message: 'Faça o login antes de continuar.',
    });
  });
});
