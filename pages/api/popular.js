import { sql_query } from "../../database_connection";

export default async function getPopular(req, res) {
    switch (req.method) {
        case 'GET': {
            const tops = await sql_query('select * from tops')

            return res.end(JSON.stringify(tops));
        }
        default: {
            return res.status(500).json({ message: `Sorry but you use ${req.method} request!` })
        }
    }
    
}