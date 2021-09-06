import { sql_query } from "../../database_connection";

export default async function getPopular(req, res) {
    switch (req.method) {
        case 'GET': {
            const tops = await sql_query('select * from tops').catch((err) => {
                res.status(500).json({ message: `popular.js GET req, SELECT desc: Something was wrong! ${err}` })
            })

            return res.end(JSON.stringify(tops));
        }
        case 'POST': {
            let INSERT = `INSERT INTO tops (image, text) VALUES ?`

            await sql_query(INSERT, [
                req.body.map(popular => [popular.image, popular.text])
            ]).catch((err) => {
                res.status(500).json({ message: `popular.js POST req, INSERT desc: Something was wrong! ${err}` })
            })

            const tops = await sql_query('select * from tops').catch((err) => {
                res.status(500).json({ message: `popular.js GET req, SELECT desc: Something was wrong! ${err}` })
            })

            return res.status(200).json({ messages: 'success add popular items', tops: tops});
        }
        case 'DELETE': {
            await sql_query('TRUNCATE TABLE tops').catch((err) => {
                return res.status(500).json({ message: `popular.js DELETE req, DELETE desc: Something was wrong! ${err}` })
            })

            return res.status(200).json({ messages: 'success delete all items popular' });
        }
        default: {
            return res.status(500).json({ message: `Sorry but you use ${req.method} request!` })
        }
    }

}