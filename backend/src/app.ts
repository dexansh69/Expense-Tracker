import express from "express";
import cors from "cors";
import userRoutes from  "./routes/user.routes"
import expenseRouter from "./routes/expense.routes"
import budgetRouter from "./routes/budget.routes"
import AnalyticsRouter from "./routes/analytics.routes"
const app = express();
app.use(express.json())
app.use(cors())
app.use("/api/auth",userRoutes);
app.use("/api/expense",expenseRouter);
app.use("/api",budgetRouter);
app.use("/api",AnalyticsRouter)
export default app;
