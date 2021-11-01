import { sql_query } from "../../../../database_connection";
import NextCors from 'nextjs-cors';

export default async function getPopularById(req, res) {

    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    switch (req.method) {
        case 'PUT': {
            let UPDATE = 'UPDATE tops SET image = ?, text = ? WHERE id = ?'

            await sql_query(UPDATE,[req.body.image, req.body.text, req.body.id
            ]).catch((err)=>{
                return res.status(500).json({ message: `popular/index.js PUT req, UPDATE desc: Something was wrong! ${err}` })
            })

            return res.status(200).json({ messages: 'success' });
        }
        case 'DELETE': {
            let DELETE = `DELETE FROM tops WHERE id = ?`

            await sql_query(DELETE,[req.query.id]).catch((err)=>{
                return res.status(500).json({ message: `popular/index.js DELETE req, DELETE desc: Something was wrong! ${err}` })
            })

            const tops = await sql_query('select * from tops').catch((err) => {
                return res.status(500).json({ message: `popular.js GET req, SELECT desc: Something was wrong! ${err}` })
            })

            let data = []
            tops.forEach(top => {
                data.push({id: top.id, text: top.text, image: top.image , isNew: false})
            });

            return res.status(200).json({ messages: 'success add popular items', tops: data});
        }
        default: {
            return res.status(500).json({ message: `Sorry but you use ${req.method} request!` })
        }
    }
}