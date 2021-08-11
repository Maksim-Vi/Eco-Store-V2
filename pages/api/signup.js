import { db, sql_query } from "../../database_connection";
import {hash} from 'bcrypt'

export default async function SignUp (req, res) {
    if(req.method === 'POST'){
        hash(req.body.password, 10, async function(err, hash) {
            const response = await db.query(
                `INSERT INTO users(FirstName, LastName, email, password) VALUES(?, ?, ?, ?)`,
                [req.body.FirstName,req.body.LastName,req.body.email,hash],
                (error, response) => {
                    console.log(error || response);
                    res.json({message: 'Sorry something was wrong!'});          
                }
            )
            await db.end()
            res.json(JSON.stringify(response));          
        });     
    } else {
        res.status(500).json({message:`Sorry but you use ${req.method} request!`})
    }
}