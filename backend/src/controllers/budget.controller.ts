import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export async function Budgetcontroller(req: Request, res: Response) {
    const spenderId = (req as any).userId;
    const { budget } = req.body;

    try {
        const result = await prisma.user.update({
            where: {
                id: spenderId
            },
            data: {
                budget: budget
            }
        })

        res.json({
            message: "The budget is updated"
        })

    } catch (error) {
        if (!error) {
            return res.status(400).json({
                message: "Budget cannot be added"
            })
        }
        res.status(400).json({
            message: error
        })
    }
}
export async function BudgetStats(req: Request, res: Response) {
    const userId = (req as any).userId;
    try {
        const result = await prisma.user.findUnique({
            where: {
                id: userId
            }, include: {
                expenses: true
            }
        })
        if (!result) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        const budget = Number(result.budget ?? 0);
        const spent = result.expenses.reduce(
            (sum, expense) => sum + Number(expense.amount),
            0
        )

        const remaining = budget - spent;
        res.json({
            spent,
            budget,
            remaining

        })

    } catch (error) {
        if (!error) {
            return res.status(400).json({
                message: "Budget cannot be fetched"
            })
        }
        res.status(400).json({
            message: error
        })
    }
}