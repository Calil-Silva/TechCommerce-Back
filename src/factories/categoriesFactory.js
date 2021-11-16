import connection from '../database/database.js';

export async function insertAllCategories() {
  await connection.query(
    `
    INSERT INTO categories (name, url_image) VALUES ('Watch', 'https://s1.1zoom.me/big0/648/Apple_Clock_Watch_Apple_502952.jpg | https://wallpaperaccess.com/full/1568233.jpg'),
    ('AirPods', 'https://s2.glbimg.com/5KBEl01R5_6occgjE0vTUTTwyRU=/0x0:1306x1306/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/K/k/qVcT6nTRKDuibbd5wsng/apple-airpods-3rd-gen-hero-10182021.jpg | https://img.joomcdn.net/a47e3029d2e41376a9602673003d965c16a03db6_original.jpeg'),
    ('MacBook', 'https://www.apple.com/v/mac/home/bj/images/meta/mac__bfa414svyuc2_og.png?202111031714 | https://mundoconectado.com.br/uploads/chamadas/macbook-air-arm-2020-lancamento-capa1.jpg'),
    ('Ipad', 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-wifi-blue-202009_FMT_WHH?wid=1000&hei=1000&fmt=jpeg&qlt=95&.v=1599672435000 | https://geekupdated.com/wp-content/uploads/2021/09/Apple-iPad-mini-6-2021-release-specs.jpg'),
    ('Iphone', 'https://360view.hum3d.com/zoom/Apple/Apple_iPhone_X_Space_Gray_1000_0002.jpg | https://www.vivo.com.br/content/dam/vivo-sites/vivo-com-br/homepage/imagens/destaques/mundo-apple-iphone-se-943x832.jpg'),
    ('Acessories', 'https://photos5.appleinsider.com/archive/appleaccessories.jpg | https://www.getwox.com/wp-content/uploads/2020/09/MacBook-Accessories.png');
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
