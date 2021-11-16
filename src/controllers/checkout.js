/* eslint-disable no-await-in-loop */
import connection from '../database/database.js';

export default async function checkout(req, res) {
  const purchaseInfo = req.body;
  const paymentInfo = purchaseInfo.splice([purchaseInfo.length - 1], 1)[0];
  const userInfo = purchaseInfo.splice([purchaseInfo.length - 1], 1)[0];
  const orderInfo = purchaseInfo[0];
  const orderInfoAmounts = orderInfo.map(({ amount }) => amount);
  const orderNames = orderInfo.map(({ name }) => name);
  const order = [];
  let stockMessage = 'Atenção! Produtos disponiveis:';
  let count = 0;

  try {
    const orderInfoIds = (
      await connection.query('SELECT id FROM products WHERE name = ANY ($1);', [
        orderNames,
      ])
    ).rows.map(({ id }) => id);

    orderInfoIds.forEach((id, index) => {
      order.push({
        id,
        amount: orderInfoAmounts[index],
      });
    });

    const dbLoggedUser = await connection.query(
      'SELECT * FROM logged_users WHERE token = $1;',
      [userInfo.token]
    );

    const dbToken = dbLoggedUser?.rows[0]?.token;

    if (!dbToken) {
      return res
        .status(401)
        .send({ message: 'Faça o login antes de continuar.' });
    }

    if (dbToken !== userInfo.token) {
      return res.status(400).send({ message: 'Erro desconhecido' });
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const [index, value] of order.entries()) {
      const availableStock = await connection.query(
        'select * from product_sku where sale_date IS NULL and products_id = $1;',
        [value.id]
      );
      if (
        availableStock.rowCount < value.amount &&
        availableStock.rowCount > 0
      ) {
        count += 1;
        stockMessage += `
              - ${availableStock.rowCount} ${orderInfo[index].name}
              `;
      }
      if (availableStock.rowCount === 0) {
        count += 1;
        stockMessage += `
              - Sem estoque disponível para ${orderInfo[index].name};
              `;
      }
      if (availableStock.rowCount >= value.amount) {
        stockMessage += `
              - Disponibilidade total pra ${orderInfo[index].name};
              `;
      }
    }

    if (count > 0) {
      return res.status(409).send({ message: stockMessage });
    }

    const paymentId = (
      await connection.query('SELECT id FROM payment_method WHERE name = $1;', [
        paymentInfo.type,
      ])
    ).rows[0].id;

    order.forEach(async ({ id, amount }) => {
      await connection.query(
        `
        WITH rows AS (
            SELECT id FROM product_sku WHERE (products_id = $3 and sale_date IS NULL) LIMIT $2
        )
          UPDATE product_sku SET sale_date=NOW(), user_id=$1, payment_id=$4 WHERE EXISTS (SELECT * FROM rows WHERE product_sku.id = rows.id);`,
        [userInfo.user_id, amount, id, paymentId]
      );
    });

    if (paymentInfo.type === 'credit_card') {
      await connection.query(
        'UPDATE users SET creditcard = $1 WHERE id = $2;',
        [paymentInfo.creditCardInfo, userInfo.user_id]
      );
    }

    return res.status(200).send(purchaseInfo);
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Um erro inesperado ocorreu, tente novamente.' });
  }
}
