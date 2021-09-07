import { verify } from "jsonwebtoken";

export const authenticated = (fn) => async (req, res) => {
  let isCrm = req.headers.iscrm ? req.headers.iscrm : false
  
  if(req.method === 'GET' && !isCrm){
    return await fn(req, res)
  } else {
    verify(req.headers.authorization, process.env.jwtSecret, async function(err, decoded) {
      if(!err && decoded){
        console.log(`VERIFY is good`);
        return await fn(req, res)
      } else {
        console.log(`VERIFY is invalid`);
        return res.status(401).json({message: 'Sorry Token is invalid'})
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