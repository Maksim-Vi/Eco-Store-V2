import { sql_query } from "../../../database_connection";
import { authenticated } from "../../../utility/middlware";
import NextCors from 'nextjs-cors';

export default authenticated(async function getLogin(req, res) {

    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    const userData = await sql_query('select * from users where id = ?', req.body.id)
    let user = await userData[0]
    res.json(user);
})