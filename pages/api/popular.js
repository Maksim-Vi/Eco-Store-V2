import { sql_query } from "../../database_connection";

export default async function getPopular(req, res) {
    const tops = await sql_query('select * from tops')

    res.end(JSON.stringify(tops));
}