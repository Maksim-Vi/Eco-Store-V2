import { sql_query } from "../../database_connection";
import { authenticated } from "../../utility/middlware";
import NextCors from 'nextjs-cors';

export default authenticated(async function getPopular(req, res) {
    
    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    switch (req.method) {
        case 'GET': {
            const tops = await sql_query('select * from tops').catch((err) => {
                res.status(500).json({ message: `popular.js GET req, SELECT desc: Something was wrong! ${err}` })
            }).catch((err)=>{
                return res.status(500).json({ message: `populars.js GET req, SELECT tops: Something was wrong! ${err}` })
            })

            let data = []
            if(tops && tops.length > 0){
                tops.forEach(top => {
                    data.push({id: top.id, text: top.text, image: top.image , isNew: false})
                });
            }
        
            return res.status(200).json(data);
        }
        case 'POST': {
            await sql_query('TRUNCATE TABLE tops').catch((err) => {
                res.status(500).json({ message: `popular.js DELETE req, DELETE desc: Something was wrong! ${err}` })
            })

            let INSERT = `INSERT INTO tops (id, image, text) VALUES ?`
            await sql_query(INSERT, [
                req.body.map(popular => [popular.id, popular.image, popular.text])
            ]).catch((err) => {
                res.status(500).json({ message: `popular.js POST req, INSERT desc: Something was wrong! ${err}` })
            })

            const tops = await sql_query('select * from tops').catch((err) => {
                res.status(500).json({ message: `popular.js GET req, SELECT desc: Something was wrong! ${err}` })
            })

            let data = []
            tops.forEach(top => {
                data.push({id: top.id, text: top.text, image: top.image , isNew: false})
            });

            return res.status(200).json({ messages: 'success add popular items', tops: data});
        }
        case 'DELETE': {
            await sql_query('TRUNCATE TABLE tops').catch((err) => {
                res.status(500).json({ message: `popular.js DELETE req, DELETE desc: Something was wrong! ${err}` })
            })

            return res.status(200).json({ messages: 'success delete all items popular' });
        }
        default: {
            return res.status(500).json({ message: `Sorry but you use ${req.method} request!` })
        }
    }
})