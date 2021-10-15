import {compare} from 'bcrypt'
import { sign } from 'jsonwebtoken';
import { sql_query } from '../../database_connection';

export default async function SignIn (req, res) {
    if(req.method === 'POST'){
        const userData = await sql_query('select * from users where email = ?', req.body.email).catch((err)=>{
            return res.status(500).json({ message: `signin.js POST req, Login is failed: Something was wrong! ${err}` })
        })
        
        if(!userData && userData === null) {
            return res.status(500).json({message:`signin.js POST req, Login is failed: Something was wrong!`, userData})
        }   

        let user = await userData[0]
        compare(req.body.password, user.password, function(err, result) {
            if(!err && result){
                let data = {
                    id:  user.id,
                    FirstName: user.FirstName,
                    LastName: user.LastName
                }
                let jwt = sign(data, process.env.jwtSecret, { expiresIn: '1d' });
                return res.status(200).json({token: jwt, userId: user.id});
            } else {
                return res.status(401).json({message: 'signin.js POST req, Login is failed: Something was wrong!', err, result});
            }
        });
    } else {
        return res.status(500).json({message:`Sorry but you use ${req.method} request!`})
    }
}