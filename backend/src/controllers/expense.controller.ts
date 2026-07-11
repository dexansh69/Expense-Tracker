
import { prisma } from "../../lib/prisma"
import { Request, Response } from "express";

// ADD EXPENSE
export async function AddExpense(req: Request, res: Response) {
    const { title, category, amount, description, date } = req.body;
    const userId = (req as any).userId;
    try {

        const result = await prisma.expense.create({
            data: {
                title,
                category,
                amount,
                description,
                date: new Date(date),
                spenderId: userId
            }
        })
        res.json({
            message: "Expense added successfully"
        })
    } catch (error) {
        if (!error) {
            return res.status(400).json({
                message: "Expense cannot be added"
            })
        }
        res.status(400).json({
            message: error
        })
    }

}


// LIST OF EXPENSE

export async function listExpense(req: Request, res: Response) {
    const userId = (req as any).userId;
    try {
        const result = await prisma.expense.findMany({
            where: {
                spenderId: userId
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        res.json({
            message: " Here is your list",
            result
        })
    } catch (error) {
        res.status(400).json({
            message: "There are no expenses"
        })
    }

}
// DELETE EXPENSE
export async function deleteExpense(req: Request, res: Response) {
    const expenseId = Number(req.params.id);
    const userId = (req as any).userId;
    const find = await prisma.expense.findUnique({
        where: {
            id: expenseId
        }
    })
    if (!find?.spenderId == userId) {
        return res.status(403).json({
            message: "unauthorized"
        })
    }
    const result = await prisma.expense.delete({
        where: {
            id: expenseId
        }
    })
    if (!result) {
        res.status(404).json({
            message: "Expense does not exist"
        })
    }
    res.json({
        message: "Expense deleted"
    })

}
// UPDATE EXISTING EXPENSE
export async function editExpense(req: Request, res: Response) {
    const expenseId = Number(req.params.id);
    const { title, category, amount, description, date } = req.body;
    const userId = (req as any).userId;
    try {
        const find = await prisma.expense.findUnique({
            where: {
                id: expenseId
            }
        })
        if (!find?.spenderId == userId) {
            return res.status(403).json({
                message: "unauthorized"
            })
        }
        const result = await prisma.expense.update({
            where: {
                id: expenseId
            }, data: {
                title,
                category,
                amount,
                description,
                date: new Date(date)

            }

        })
        if (!result) {
            return res.status(400).json({ message: "expense not found" })
        }
        res.json({ message: "edited successfully" })
    } catch (error) {
        res.status(400).json({
            message: "It cannot be updated"
        })
    }
}

// Getting a single id expense


export async function GetExpenseController(req: Request, res: Response) {
    const userId = (req as any).userId;
    const expenseId = Number(req.params.id);

    try {
        const expense = await prisma.expense.findUnique({
            where: {
                id: expenseId
            }
        });

        if (!expense) {
            return res.status(404).json({
                message: "Expense not found"
            });
        }

        // Security Check
        if (expense.spenderId !== userId) {
            return res.status(403).json({
                message: "Unauthorized"
            });
        }

        return res.json({
            expense
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}