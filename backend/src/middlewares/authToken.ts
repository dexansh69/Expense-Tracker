import jwt, { JwtPayload } from "jsonwebtoken"
import dotenv from "dotenv";
import { Request,Response,NextFunction } from "express";
dotenv.config();
const authMiddleware = (req:Request,res:Response,next:NextFunction)=>{
   
    try {
    const key = process.env.JWT_SECRET;
    if(!key){
       return res.json({
        message : "Signing(jwt) key is missing "
       }) 
    }
    const authHeader = req.headers.authorization
    if(!authHeader){
        return res.json({message:"Token is missing"})
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token,key) as JwtPayload;
    (req as any).userId= decoded.id;
    next();
} catch (err) {
    return res.status(401).json({
        message: "Invalid token"
    });
}
}
export default authMiddleware;