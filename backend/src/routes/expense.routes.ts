import express from "express";
import authMiddleware from "../middlewares/authToken";
import ValidateZod from "../middlewares/zodValidator";
import { expenseSchema } from "../validators/zodSchema";
import {AddExpense, deleteExpense, editExpense, GetExpenseController, listExpense} from "../controllers/expense.controller";

const router = express.Router();
router.post("/add",authMiddleware,ValidateZod(expenseSchema),AddExpense);
router.get("/list",authMiddleware,listExpense)
router.delete(`/delete/:id`,authMiddleware,deleteExpense)
router.patch(`/edit/:id`,authMiddleware,editExpense)
router.get("/edit/:id",authMiddleware,GetExpenseController)
export default router;