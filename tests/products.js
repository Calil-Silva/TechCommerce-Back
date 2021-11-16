import supertest from 'supertest';
import '../src/setup/setup.js';
import app from '../src/app.js';
import connection from '../src/database/database.js';
import { insertAllProducts } from '../src/factories/productsFactory.js';

const agent = supertest(app);

afterAll(async () => {
  await connection.query('DELETE FROM products');
  connection.end();
});

beforeAll(async () => {
  await connection.query(
    `
    drop table categories cascade;
    CREATE TABLE "categories" (
        "id" serial NOT NULL,
        "name" varchar(255) NOT NULL UNIQUE,
        "url_image" text NOT NULL,
        CONSTRAINT "categories_pk" PRIMARY KEY ("id")
    ) WITH (
    OIDS=FALSE);

    ALTER TABLE "products" ADD CONSTRAINT "products_fk1" FOREIGN KEY ("category_id") REFERENCES "categories"("id");

    INSERT INTO categories (name, url_image) VALUES ('Watch', 'https://s1.1zoom.me/big0/648/Apple_Clock_Watch_Apple_502952.jpg');

    INSERT INTO categories (name, url_image) VALUES ('AirPods', 'https://s2.glbimg.com/5KBEl01R5_6occgjE0vTUTTwyRU=/0x0:1306x1306/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/K/k/qVcT6nTRKDuibbd5wsng/apple-airpods-3rd-gen-hero-10182021.jpg');

    INSERT INTO categories (name, url_image) VALUES ('MacBook', 'https://www.apple.com/v/mac/home/bj/images/meta/mac__bfa414svyuc2_og.png?202111031714');

    INSERT INTO categories (name, url_image) VALUES ('Ipad', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-wifi-blue-202009_FMT_WHH?wid=1000&hei=1000&fmt=jpeg&qlt=95&.v=1599672435000');

    INSERT INTO categories (name, url_image) VALUES ('Iphone', 'https://i.zst.com.br/thumbs/12/38/36/1268435165.jpg');

    INSERT INTO categories (name, url_image) VALUES ('Acessories', 'https://photos5.appleinsider.com/archive/appleaccessories.jpg');`
  );

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
