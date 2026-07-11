import { Budgetcontroller, BudgetStats } from "../controllers/budget.controller";
import authMiddleware from "../middlewares/authToken";
import express from "express"
const router = express.Router();
router.patch("/budget",authMiddleware,Budgetcontroller);
router.get("/stats",authMiddleware,BudgetStats)

export default router;