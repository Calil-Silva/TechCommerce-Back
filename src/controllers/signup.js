import Joi from 'joi';
import bcrypt from 'bcrypt';
import { regexPatterns } from '../factories/patterns.js';
import connection from '../database/database.js';

export default async function signup(req, res) {
  const {
    name, selectedCountry, birthDate, email, password
  } = req.body;

  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    selectedCountry: Joi.string().min(3).required(),
    birthDate: Joi.date().required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(regexPatterns('password')).required(),
    confirmedPassword: Joi.ref('password'),
  });

  const hashedPassword = bcrypt.hashSync(password, 10);

  const { error: invalidRequest } = schema.validate(req.body);

  let countryId;

  try {
    if (invalidRequest) {
      return res.status(406).send({ message: invalidRequest.message });
    }

    const findUser = await connection.query(
      'SELECT * FROM users WHERE email = $1;',
      [email]
    );

    if (findUser.rowCount !== 0) {
      return res.status(400).send({ message: 'Usuário já cadastrado' });
    }

    const searchCountry = await connection.query(
      'SELECT * FROM countries WHERE name = $1;',
      [selectedCountry]
    );

    if (searchCountry.rowCount === 0) {
      const insertedCountry = await connection.query(
        'INSERT INTO countries (name) VALUES ($1) RETURNING id;',
        [selectedCountry]
      );
      countryId = insertedCountry.rows[0].id;
    } else {
      const countrySelected = await connection.query(
        'SELECT * FROM countries WHERE name = $1;',
        [selectedCountry]
      );
      countryId = countrySelected.rows[0].id;
    }

    await connection.query(
      'INSERT INTO users (name, birth_date, email, password, country_id) VALUES ($1, $2, $3, $4, $5);',
      [name, birthDate, email, hashedPassword, countryId]
    );

    return res.status(200).send({ message: 'Registro efetuado!' });
  } catch (error) {
    return res.status(500).send({
      message: 'Ocorreu um erro inesperado, tente novamente mais tarde.',
    });
  }
}
