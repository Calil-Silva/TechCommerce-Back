import { v4 as uuidV4 } from 'uuid';
import connection from '../database/database.js';

export async function addNewSession() {
  const data = {
    id: (await connection.query('SELECT * FROM users')).rows[0].id,
    token: uuidV4(),
  };

  await connection.query(
    'INSERT INTO logged_users (token, user_id) VALUES ($1, $2);',
    [data.token, data.id]
  );

  return data;
}

export const userAuthentication = async () => {
  const dbData = await connection.query('SELECT * FROM logged_users;');

  const authenticarion = {
    user_id: dbData.rows[0].user_id,
    token: dbData.rows[0].token,
  };

  return authenticarion;
};
