import jwt from 'jsonwebtoken';
import dotenv from "dotenv"
dotenv.config()

export const generateAceessToken = async (payload) =>{

    const{userId , role} = payload
    const data = { 
        userId:userId,
        role:role
    }

    const accessToken= jwt.sign(

        data,

        env.JWT_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
    )
    return accessToken
    }
export const generateRefreshToken = async (payload )=>{
    const data = {
        id: payload.id,
        email: payload.email,
    }
    const refreshToken =  jwt.sign(data, process.env.JWT_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE })
    return refreshToken
}

export const verifyToken = async   (token)=>{
 
    const response  =   jwt.verify(token , process.env.JWT_SECRET)
  
    return response;
}
   
export  const verifyRefreshToken =  async (token , email) => {

let  response  ="";
 jwt.verify(token , process.env.JWT_SECRET , (err , decode) =>{

    // if(err || decode.email !== email) {
     
    //     throw new res(401).json("UNAUTHORIZED");
    // }
    const data = {id:decode.id, email:decode.email}
  
response =     jwt.sign(data
        ,
        process.env.JWT_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRE })
})

console.log(response)
return response;


}
