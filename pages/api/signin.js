import {compare} from 'bcrypt'
import { serialize } from 'cookie';
import { sign } from 'jsonwebtoken';
import { setCookie } from '../../components/common/session';
import { sql_query } from '../../database_connection';

export default async function SignIn (req, res) {
    if(req.method === 'POST'){
        const userData = await sql_query('select * from users where email = ?', req.body.email)
        let user = await userData[0]
        compare(req.body.password, user.password, function(err, result) {
            if(!err && result){
                let data = {
                    id:  user.id,
                    FirstName: user.FirstName,
                    LastName: user.LastName
                }
                var jwt = sign(data, process.env.jwtSecret, { expiresIn: '1d' });

                //setCookie('auth',jwt)
                // res.setHeader('Set-Cookie', serialize('auth', jwt, {
                //     httpOnly: true,
                //     secure: process.env.NODE_ENV !== 'development',
                //     sameSite: 'strict',
                //     maxAge: 3600,
                //     path: '/'
                // }))

                res.json({token: jwt, userId: user.id});
            }else {
                res.json({message: 'Sorry password is wrong!'});
            }
        });
    } else {
        res.status(500).json({message:`Sorry but you use ${req.method} request!`})
    }
}