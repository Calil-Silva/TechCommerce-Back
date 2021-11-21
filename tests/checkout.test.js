import supertest from 'supertest';
import '../src/setup/setup.js';
import app from '../src/app.js';
import connection from '../src/database/database.js';
import { deleteUser, insertUser } from '../src/factories/userFactory.js';
import { mockedUser } from '../src/mocks/userMock.js';
import { addNewSession } from '../src/factories/sessionsFactory.js';
import { insertAllCategories } from '../src/factories/categoriesFactory.js';

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
  await connection.query('DELETE FROM categories;');
  await connection.query('ALTER SEQUENCE categories_id_seq RESTART WITH 1;');
  await connection.query('DELETE FROM products;');
  await connection.query('ALTER SEQUENCE products_id_seq RESTART WITH 1;');
  connection.end();
});
beforeAll(async () => {
  await connection.query('DELETE FROM categories;');
  await connection.query('ALTER SEQUENCE categories_id_seq RESTART WITH 1;');
  await connection.query('DELETE FROM products;');
  await connection.query('ALTER SEQUENCE products_id_seq RESTART WITH 1;');
  await insertAllCategories();
  connection.query('INSERT INTO products (name, url_image, describe, category_id, price) VALUES (\'Apple WatchSE\', \'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/40-cell-alum-gold-sport-starlight-se?wid=2000&hei=2000&fmt=jpeg&qlt=95&.v=1630473753000\', \'Heavy on features. | Light on price. | Family Setup. Your family joined at the wrist. | Locate devices when you leave your iPhone behind. | Maps. Get turn-by-turn directions from Maps right on your wrist.\', 1, 279)');
  connection.query(`INSERT INTO product_sku (sku, products_id) VALUES (gen_random_uuid(), 1),
    (gen_random_uuid(), 1),
    (gen_random_uuid(), 1),
    (gen_random_uuid(), 1),
    (gen_random_uuid(), 1);`);
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
          name: 'Apple WatchSE',
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
