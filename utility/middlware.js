import { verify } from "jsonwebtoken";
import NextCors from 'nextjs-cors';

export const authenticated = (fn) => async (req, res) => {
  let isCrm = req.headers.iscrm ? req.headers.iscrm : false
  
  await NextCors(req, res, {
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  if(req.method === 'GET' && !isCrm){
    return await fn(req, res)
  } else {
    verify(req.headers.authorization, process.env.jwtSecret, async function(err, decoded) {
      if(!err && decoded){
        return await fn(req, res)
      } else {
        console.log(`VERIFY is invalid`);
        return res.json({isAuch: false , message: 'Sorry Token is invalid'})
      }
    });
  }
}
  
export const checkisVerifyToken = (token) => {
  let isVer = false
  verify(token, process.env.jwtSecret, async function(err, decoded) {
    if(!err && decoded){
      isVer = true
    } else {
      isVer = false
    }
  });
  return  isVer
}