import supertest from 'supertest';
import '../src/setup/setup.js';
import app from '../src/app.js';
import connection from '../src/database/database.js';
import { insertAllCategories, InsertAllCategories, resetTableCategories } from '../src/factories/categoriesFactory.js';
import { base } from '../src/factories/productsFactory.js';

const agent = supertest(app);

afterAll(async () => {
  resetTableCategories();
  insertAllCategories();
  connection.end();
});

beforeAll(async () => {
  base();
});

describe('Route GET /categories', () => {
  test('should return 200 when everything goes well. ', async () => {
    const result = await agent.get('/categories');

    expect(result.status).toEqual(200);
  });

  test('should return a array objects when everything goes well. ', async () => {
    const result = await agent.get('/categories');
    const expected = [
      {
        name: 'Watch',
        url_image: 'https://s1.1zoom.me/big0/648/Apple_Clock_Watch_Apple_502952.jpg'
      },
      {
        name: 'AirPods',
        url_image: 'https://s2.glbimg.com/5KBEl01R5_6occgjE0vTUTTwyRU=/0x0:1306x1306/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/K/k/qVcT6nTRKDuibbd5wsng/apple-airpods-3rd-gen-hero-10182021.jpg'
      },
      {
        name: 'MacBook',
        url_image: 'https://www.apple.com/v/mac/home/bj/images/meta/mac__bfa414svyuc2_og.png?202111031714'
      },
      {
        name: 'Ipad',
        url_image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-wifi-blue-202009_FMT_WHH?wid=1000&hei=1000&fmt=jpeg&qlt=95&.v=1599672435000'
      },
      {
        name: 'Iphone',
        url_image: 'https://i.zst.com.br/thumbs/12/38/36/1268435165.jpg'
      },
      {
        name: 'Acessories',
        url_image: 'https://photos5.appleinsider.com/archive/appleaccessories.jpg'
      }
    ];
    expect(result.body).toMatchObject(expected);
  });
});
