import jwt from 'jsonwebtoken';
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
      email,
      token: jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '300s' })
    };
    return res.status(200).send(userAuthenticator);
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Ocorreu um erro inesperado, tente novamente' });
  }
}
