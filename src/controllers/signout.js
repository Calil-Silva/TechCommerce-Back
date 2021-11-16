import connection from '../database/database.js';

export default async function signout(req, res) {
  const { token } = req.body;

  try {
    const deletedUser = await connection.query(
      'DELETE FROM logged_users WHERE token = $1;',
      [token]
    );

    if (deletedUser) {
      return res.status(202).send({ message: 'successfully logged out' });
    }
    return res.status(404).send({ message: 'Tente novamente.' });
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Um erro inesperado ocorreu, tente mais tarde.' });
  }
}
