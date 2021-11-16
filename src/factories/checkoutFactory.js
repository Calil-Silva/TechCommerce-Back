import connection from '../database/database.js';

export async function insertAllSku() {
  await connection.query(
    `CREATE EXTENSION "pgcrypto";
    INSERT INTO product_sku (sku, products_id) VALUES (gen_random_uuid(), 1),
    (gen_random_uuid(), 1),
    (gen_random_uuid(), 1),
    (gen_random_uuid(), 1),
    (gen_random_uuid(), 1);
    `
  );
}
