import connection from '../database/database.js';

export async function insertAllProducts() {
  await connection.query(
    `
    INSERT INTO products(name, url_image, describe, category_id, price) VALUES('iPad mini', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-mini-select-cell-purple-202109_FMT_WHH?wid=1000&hei=1000&fmt=jpeg&qlt=95&.v=1629840713000', 'Mega Power | Mini sized | With all-day battery life, iPad is ready to work or play for as long as you need it.| The 8MP Wide camera on the back of iPad captures sharp, vivid images and video.| With Gigabit‑class LTE, you can connect even when you can’t access Wi‑Fi.', 4, 499);
    `
  );
}

export async function base() {
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
}
