import connection from '../database/database.js';

export default async function products(req, res) {
  const { categoryID } = req.query;

  if (categoryID < 1 || categoryID > 6) {
    return res.status(400).send({ message: 'Category id out of range.' });
  }
  if (!categoryID) {
    return res.status(400).send({ message: 'Query category id not defined.' });
  }
  try {
    const result = await connection.query(`
      SELECT *
      FROM products
      WHERE category_id = $1
    `, [categoryID]);
    return res.status(200).send(result.rows);
  } catch (error) {
    return res.sendStatus(500);
  }
}
