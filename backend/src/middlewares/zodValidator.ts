import { z } from "zod";
import { Request,Response,NextFunction } from "express";
export default function ValidateZod(schema:z.ZodTypeAny){
    return (req:Request,res:Response,next:NextFunction)=>{

    const result = schema.safeParse(req.body);
    if (!result.success){
        return res.status(400).json({
            message : "Invalid Inputs",
            errors : result.error.issues
        })
    }
    req.body= result.data;
    next();

    }

}