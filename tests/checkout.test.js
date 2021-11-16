import supertest from 'supertest';
import '../src/setup/setup.js';
import app from '../src/app.js';
import connection from '../src/database/database.js';
import { deleteUser, insertUser } from '../src/factories/userFactory.js';
import { mockedUser } from '../src/mocks/userMock.js';
import { addNewSession } from '../src/factories/sessionsFactory.js';

const agent = supertest(app);
const mockedOrder = [
  [
    {
      name: 'AirPods 2ndG',
      amount: 1,
    },
  ],
  {
    name: 'Fulano Silva',
    user_id: 1,
    creditCard: null,
  },
  {
    creditCardInfo: {
      cvc: '444',
      expirationDate: '1225',
      focus: 'cvc',
      name: mockedUser.name,
      number: '4111111111111111',
    },
    type: 'credit_card',
  },
];

afterAll(async () => {
  connection.end();
});

describe('PUT /checkout', () => {
  beforeEach(async () => {
    await connection.query(
      'UPDATE product_sku SET sale_date = NULL, user_id = NULL, payment_id = NULL'
    );

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
    await connection.query(
      'UPDATE product_sku SET sale_date = NULL, user_id = NULL, payment_id = NULL'
    );
    await deleteUser();
    await connection.query('DELETE FROM countries');
  });

  test('Should return status code 401 if user is not signed in', async () => {
    const result = await agent.put('/checkout').send(mockedOrder);
    expect(result.status).toEqual(401);
    expect(result.body).toEqual({
      message: 'Faça o login antes de continuar.',
    });
  });

  test('Should return status code 409 if informed products amount do not have total available', async () => {
    const userId = (await connection.query('SELECT id FROM users')).rows[0].id;
    const { token } = (await connection.query('SELECT token FROM logged_users'))
      .rows[0];
    const mockedOrderToken = [
      [
        {
          name: 'AirPods 2ndG',
          amount: 6,
        },
      ],
      {
        name: mockedUser.name,
        token,
        user_id: userId,
        creditCard: null,
      },
      {
        creditCardInfo: {
          cvc: '444',
          expirationDate: '1225',
          focus: 'cvc',
          name: mockedUser.name,
          number: '4111111111111111',
        },
        type: 'credit_card',
      },
    ];
    const result = await agent.put('/checkout').send(mockedOrderToken);
    expect(result.status).toEqual(409);
    expect(result.body).toHaveProperty('message');
  });

  test('Should return status code 200 if requested products are total available', async () => {
    const userId = (await connection.query('SELECT id FROM users')).rows[0].id;
    const { token } = (await connection.query('SELECT token FROM logged_users'))
      .rows[0];
    const mockedOrderToken = [
      [
        {
          name: 'AirPods 2ndG',
          amount: 1,
        },
      ],
      {
        name: mockedUser.name,
        token,
        user_id: userId,
        creditCard: null,
      },
      {
        creditCardInfo: {
          cvc: '444',
          expirationDate: '1225',
          focus: 'cvc',
          name: mockedUser.name,
          number: '4111111111111111',
        },
        type: 'credit_card',
      },
    ];
    const result = await agent.put('/checkout').send(mockedOrderToken);
    expect(result.status).toEqual(200);
  });
});
