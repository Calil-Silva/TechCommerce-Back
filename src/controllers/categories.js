import connection from "../database/database.js";

export default async function categories (req, res) {

    try {
        const result = await connection.query(`
            SELECT *
            FROM categories;
        `)
        return res.status(200).send(result.rows);
    } catch (error) {
        return res.sendStatus(500);
    }
}   