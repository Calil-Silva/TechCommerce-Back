import connection from '../database/database.js';

export async function insertAllCategories() {
  await connection.query(
    `
    INSERT INTO categories (name, url_image) VALUES ('Watch', 'https://s1.1zoom.me/big0/648/Apple_Clock_Watch_Apple_502952.jpg'),
    ('AirPods', 'https://s2.glbimg.com/5KBEl01R5_6occgjE0vTUTTwyRU=/0x0:1306x1306/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/K/k/qVcT6nTRKDuibbd5wsng/apple-airpods-3rd-gen-hero-10182021.jpg'),
    ('MacBook', 'https://www.apple.com/v/mac/home/bj/images/meta/mac__bfa414svyuc2_og.png?202111031714'),
    ('Ipad', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-wifi-blue-202009_FMT_WHH?wid=1000&hei=1000&fmt=jpeg&qlt=95&.v=1599672435000'),
    ('Iphone', 'https://i.zst.com.br/thumbs/12/38/36/1268435165.jpg');
    ('Acessories', 'https://photos5.appleinsider.com/archive/appleaccessories.jpg');
    `
  );
}
export async function resetTableCategories() {
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
    `
  );
}
