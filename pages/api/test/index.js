import { sql_query } from "../../../database_connection";
import { formateDataReviews } from "../../../utility/utils";
import NextCors from 'nextjs-cors';

export default async function getTest(req, res) {
    
    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    switch (req.method) {
        case 'GET': {
            let reviews = await sql_query('select * from reviews').catch((err) => {
                return res.status(500).json({ message: `reviews.js GET req, SELECT desc: Something was wrong! ${err}` })
            })

            let reviewsData = formateDataReviews(reviews)

            return res.status(200).json({ messages: 'success', test:reviewsData });
        }
        default: {
            return res.status(500).json({ message: `Sorry but you use ${req.method} request!` })
        }
    }
}