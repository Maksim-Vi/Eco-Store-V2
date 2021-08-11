import { sql_query } from "../../../database_connection";

export default async function getTest (req, res) {
    switch(req.method){
        case 'GET':{
            let SELECT = ` 
                SELECT p.*, d.*, t.*
                FROM products AS p 
                LEFT JOIN descriptionproducts AS d ON p.DescProductId = d.id 
                LEFT JOIN descriptionproductstables AS t ON p.DescProductTableId = t.id
            `
            const response = await sql_query(SELECT)
            // const response = await sql_query('select * from test')
            // const response2 = await sql_query('select * from test2 where id = ?', response[0].desc)
            console.log(`ANSWER`, response );
            // let data = {
            //     id: response[0].id,
            //     name: response[0].name,
            //     desc: response[0].desc,
            //     image: response[0].image,
            //     description:{
            //         id: response2[0].id,
            //         name: response2[0].name,
            //         desc: response2[0].desc,
            //     }
            // }
            res.json(response)
            break 
        }
        case 'PUT':{
            break 
        }
        default:{
            res.status(500).json({message:`Sorry but you use ${req.method} request!`})
        }
    }
}