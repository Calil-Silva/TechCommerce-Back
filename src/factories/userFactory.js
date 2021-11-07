import connection from '../database/database.js';

export async function insertUser(name, email, hashPassword) {
  await connection.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id;',
    [name, email, hashPassword]
  );
}

export async function deleteUser() {
  await connection.query('DELETE FROM users');
}
