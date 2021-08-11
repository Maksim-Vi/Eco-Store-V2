import { sql_query } from "../../database_connection";
import { authenticated } from "../../utility/middlware";

export default authenticated(async function getUsers (req, res) {
    const response = await sql_query('select * from users')
    res.json(response);
})