import connection from '../database/database.js';

export async function insertUser(
  name,
  email,
  hashPassword,
  selectedCountry,
  birthDate
) {
  const countryId = (
    await connection.query(
      'INSERT INTO countries (name) VALUES ($1) RETURNING id;',
      [selectedCountry]
    )
  ).rows[0].id;

  await connection.query(
    'INSERT INTO users (name, email, password, country_id, birth_Date) VALUES ($1, $2, $3, $4, $5) RETURNING id;',
    [name, email, hashPassword, countryId, birthDate]
  );
}

export async function deleteUser() {
  await connection.query('DELETE FROM users');
}
