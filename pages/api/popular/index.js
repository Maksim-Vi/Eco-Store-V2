import { sql_query } from "../../database_connection";

export default async function getPopularById(req, res) {
    switch (req.method) {
        case 'POST': {
           // let INSERT = `INSERT INTO tops (image, text) VALUES ?`

            console.log(`ANSWER`,  req.body);

            // await sql_query(INSERT, [req.body.image, req.body.text]).catch((err) => {
            //     res.status(500).json({ message: `popular.js POST req, INSERT desc: Something was wrong! ${err}` })
            // })

            // const tops = await sql_query('select * from tops').catch((err) => {
            //     res.status(500).json({ message: `popular.js GET req, SELECT desc: Something was wrong! ${err}` })
            // })

            // return res.status(200).json({ messages: 'success add popular items', tops: tops});
            return res.status(200).json({ messages: 'success' });
        }
        case 'PUT': {
            return res.status(200).json({ messages: 'success' });
        }
        case 'DELETE': {
            return res.status(200).json({ messages: 'success' });
        }
        default: {
            return res.status(500).json({ message: `Sorry but you use ${req.method} request!` })
        }
    }
    
}