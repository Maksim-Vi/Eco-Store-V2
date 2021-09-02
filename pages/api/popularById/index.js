import { sql_query } from "../../database_connection";

export default async function getPopularById(req, res) {
    switch (req.method) {
        case 'POST': {

        }
        case 'PUT': {

        }
        case 'DELETE': {

        }
        default: {
            return res.status(500).json({ message: `Sorry but you use ${req.method} request!` })
        }
    }
    
}