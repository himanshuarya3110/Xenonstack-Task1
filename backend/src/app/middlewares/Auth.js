
import { verifyToken } from "../../utils/jwt.js"

import jwt from "jsonwebtoken"
const AppRole = [ "Admin"]
export const isAuth = (...roles)=> async (req, res, next)=>{


console.log(roles)

const token  = req.headers["authorization"]?.split("Bearer ")[1];
if(token) console.log(token)
    else res.status(401).json("token not found") 

const user = await verifyToken(token);
console.log(user)
if(!user) res.status(401).json("invaild token") 
req.user = {id:user.id , role:user?.role}
console.log("authenticated succes")
next();
    
}