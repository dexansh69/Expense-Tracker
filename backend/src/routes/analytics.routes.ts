import { Analytics } from "../controllers/analytics.controller";
import authMiddleware from "../middlewares/authToken";
import express from "express"
const router = express.Router();
router.get("/analytics",authMiddleware,Analytics)

export default router;