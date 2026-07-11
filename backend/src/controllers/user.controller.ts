import { Request, Response } from "express"
import { prisma } from "../../lib/prisma"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { check } from "zod"
dotenv.config();




export const signupController = async function (req: Request, res: Response) {
    try {
        const { email, username, password } = req.body;
        const checkUser = await prisma.user.findFirst({
            where: {
             OR: [  {email},{username}
            ]
            }
        })
        if(checkUser){
            return res.status(400).json({
                message : "User already exists"
            })
        }
       
        console.log("hitting server")
        // if user does not exist then this code will work
        if (!checkUser) {
            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await prisma.user.create({
                data: {
                    email,
                    username,
                    password: hashedPassword


                }
            })
            console.log("hittting server");
            res.status(200).json({ message: "signup is complete" })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "internal sever error"
        })



    }



}

export const loginController = async function (req: Request, res: Response) {
    const key = process.env.JWT_SECRET;

    if (!key) {
        return res.send("Signing key is missing in .env");
    }
    try {
        const { username, password } = req.body;
        // finding user 
        const result = await prisma.user.findUnique({
            where: {
                username: username
            }
        })
        if (!result) {
            return res.status(404).json({
                message: "user does not exist"
            })
        }
        // password checking
        const isMatch = await bcrypt.compare(password, result.password)
        if (!isMatch) {
            return res.status(404).json({
                message: "Password is incorrect"
            })
        }
        // token generating
        const token = jwt.sign({
            id: result.id
        }, key as string, {
            expiresIn: '1h'
        })

        //success message
        res.status(200).json({
            message: "you have loggend in successfully",
            token
        })

    } catch (error) {
        res.json({ message: error })
    }
}