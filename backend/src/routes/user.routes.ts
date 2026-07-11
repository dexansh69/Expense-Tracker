import express from "express";
import { prisma } from "../../lib/prisma"
import bycrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { loginController, signupController } from "../controllers/user.controller";
import ValidateZod from "../middlewares/zodValidator";
import { loginSchema, signupSchema } from "../validators/zodSchema";
dotenv.config();
const router = express.Router();
const key  = process.env.JWT_SECRET;
if(!key){
    throw new Error("Signing key is missing in .env")
}

router.post("/signup",ValidateZod(signupSchema),signupController )
router.post("/login",ValidateZod(loginSchema),loginController)

export default router;