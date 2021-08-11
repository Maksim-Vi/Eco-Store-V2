import { verify } from "jsonwebtoken";

export const authenticated = (fn) => async (req, res) => {  
  console.log(`ANSWER`,req.method);
  if(req.method === 'GET'){
    console.log(`ANSWER get reqest`,req.method);
    return await fn(req, res)
  } else {
    console.log(`ANSWER VERIFY`, req.headers.authorization);
    verify(req.headers.authorization, process.env.jwtSecret, async function(err, decoded) {
      if(!err && decoded){
        return await fn(req, res)
      }
      res.status(401).json({message: 'Sorry Token is invalid'})
    });
  }
 
}
  