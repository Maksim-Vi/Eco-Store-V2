import { sql_query } from "../../../database_connection";
import { authenticated } from "../../../utility/middlware";

export default authenticated(async function getLogin(req, res) {
    const userData = await sql_query('select * from users where id = ?', req.body.id)
    let user = await userData[0]
    res.json(user);
})