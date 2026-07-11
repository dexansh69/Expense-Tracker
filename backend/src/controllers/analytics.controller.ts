import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export async function Analytics(req: Request, res: Response) {
    const userId = (req as any).userId;
    const expenses = await prisma.expense.findMany({
        where: {
            spenderId: userId
        }
    })
    const totalSpend = expenses.reduce(
        (sum, expense) => sum + Number(expense.amount),
        0
    )
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const spendMonthly = expenses.reduce(
        (sumMonthly, expense) => {
            const expenseDate = new Date(expense.date);
            if (expenseDate.getMonth() == currentMonth && expenseDate.getFullYear() == currentYear) {
                sumMonthly = sumMonthly + Number(expense.amount)
            }

            return sumMonthly;

        }, 0
    )
    const spendYearly = expenses.reduce(
        (sumYearly, expense) => {
            const expenseDate = new Date(expense.date);
            if (expenseDate.getFullYear() == currentYear) {
                sumYearly = sumYearly + Number(expense.amount)
            }
            return sumYearly;
        }, 0
    )

    const categorySpend: Record<string, number> = expenses.reduce(
        (sum, expense) => {
            const category = expense.category;
            if (sum[category]) {
                sum[category] = sum[category] + Number(expense.amount)
            } else {
                sum[category] = Number(expense.amount);
            }
            return sum;
        }, {} as Record<string, number>
    )

    let favCategory = "";
    let amountCategory = 0;
    for (const [category, amount] of Object.entries(categorySpend)) {
        if (amountCategory < amount) {
            amountCategory = amount;
            favCategory = category;

        }
    }

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];
    const monthlySpend = {} as Record<string, number>;

    months.forEach(month => {
        monthlySpend[month] = 0;
    });
    const MonthlySpend_full = expenses.reduce(
        (sum, expense) => {
            const expenseDate = new Date(expense.date);
            const month = months[expenseDate.getMonth()]

            if (currentYear == expenseDate.getFullYear()) {

                sum[month] = sum[month] + Number(expense.amount)

            }
            return sum;
        }, monthlySpend
    )


    const round = (value: number) => Number(value.toFixed(2));
    Object.keys(MonthlySpend_full).forEach((month) => {
        MonthlySpend_full[month] = round(MonthlySpend_full[month]);
    });

    Object.keys(categorySpend).forEach((category) => {
        categorySpend[category] = round(categorySpend[category]);
    });
    res.json({
        message: "Here is your data man",
        totalSpend: round(totalSpend),
        spendMonthly: round(spendMonthly),
        spendYearly: round(spendYearly),
        MonthlySpend_full,
        categorySpend,
        favCategory,
        amountCategory: round(amountCategory)
    })
}