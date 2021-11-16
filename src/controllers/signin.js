import { v4 as uuidV4 } from 'uuid';
import bcrypt from 'bcrypt';
import connection from '../database/database.js';

export default async function signin(req, res) {
  const { email, password: reqPassword } = req.body;

  try {
    const dbUser = await connection.query(
      'SELECT * FROM users WHERE email = $1;',
      [email]
    );

    const userNotRegistered = dbUser.rowCount === 0;
    const dbPassword = dbUser.rows[0]?.password;

    if (userNotRegistered) {
      return res.status(404).send({ message: 'Usuário ou senha incorretos.' });
    }

    const invalidPassword = !bcrypt.compareSync(reqPassword, dbPassword);

    if (invalidPassword) {
      return res.status(400).send({ message: 'Usuário ou senha incorretos.' });
    }

    const userAuthenticator = {
      name: dbUser.rows[0]?.name,
      token: uuidV4(),
    };

    userAuthenticator.user_id = (
      await connection.query('SELECT id FROM users WHERE name = $1;', [
        userAuthenticator.name,
      ])
    ).rows[0].id;

    const creditCard = await connection.query(
      'SELECT creditcard FROM users where id = $1;',
      [userAuthenticator.user_id]
    );

    if (creditCard.rowCount > 0) {
      // eslint-disable-next-line prefer-destructuring
      userAuthenticator.creditCard = JSON.parse(creditCard.rows[0].creditcard);
    }

    await connection.query(
      'INSERT INTO logged_users (token, user_id) VALUES ($1, $2);',
      [userAuthenticator.token, userAuthenticator.user_id]
    );

    return res.status(200).send(userAuthenticator);
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Ocorreu um erro inesperado, tente novamente' });
  }
}
