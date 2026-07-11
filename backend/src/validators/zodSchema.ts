import {z} from "zod"
export const signupSchema = z.object({
    email : z.string(),
    username : z.string(),
    password : z.string()
})
export const loginSchema = z.object({
    username : z.string(),
    password : z.string()
})

export const expenseSchema = z.object({
    title : z.string(),
  category:z.string(),
  amount: z.number() ,
  description : z.string().optional(), 
  date : z.string(),

})