import { db, sql_query } from "../../database_connection";
import {hash} from 'bcrypt'
import NextCors from 'nextjs-cors';

export default async function SignUp (req, res) {
    await NextCors(req, res, {
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
    if(req.method === 'POST'){
        hash(req.body.password, 10, async function(err, hash) {
            const response = await sql_query(
                `INSERT INTO users(FirstName, LastName, email, password) VALUES(?, ?, ?, ?)`,
                [req.body.FirstName,req.body.LastName,req.body.email,hash],
            )

            if(!response){
                return res.status(401).json({message: 'Sorry something was wrong!'});       
            } 

            return res.status(200).json({message: 'create success'});    
        });     
    } else {
        res.status(500).json({message:`Sorry but you use ${req.method} request!`})
    }
}