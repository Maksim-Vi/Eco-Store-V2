import { verify } from "jsonwebtoken";

export const authenticated = (fn) => async (req, res) => {  
  if(req.method === 'GET'){
    return await fn(req, res)
  } else {
    verify(req.headers.authorization, process.env.jwtSecret, async function(err, decoded) {
      if(!err && decoded){
        console.log(`ANSWER VERIFY is good`);
        return await fn(req, res)
      }
      console.log(`ANSWER VERIFY is invalid`);
      res.status(401).json({message: 'Sorry Token is invalid'})
    });
  }
 
}
  