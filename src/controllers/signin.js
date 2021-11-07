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
      return res.status(400).send({ message: 'Usuário ou senha incorretos.' });
    }

    const invalidPassword = !bcrypt.compareSync(reqPassword, dbPassword);

    if (invalidPassword) {
      return res.status(400).send({ message: 'Usuário ou senha incorretos.' });
    }

    const userAuthenticator = {
      name: dbUser.rows[0]?.name,
      token: uuidV4(),
    };

    return res.status(202).send(userAuthenticator);
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Ocorreu um erro inesperado, tente novamente' });
  }
}
