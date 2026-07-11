import { useNavigate } from "react-router-dom";
import Sidebar from "./SideBar";
import { StatsApi } from "../apiCalls/Budget";
import { useEffect, useState } from "react";
import { ListExpenseApi } from "../apiCalls/addexpenseapi";

import AnalyticsAPI from "../apiCalls/anayltics";
import type { AnalyticsData } from "./analytics/types/analytics";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

interface Expense {
    id: number;
    title: string;
    category: string;
    amount: number;
    date: string;
}


export default function Dashboard() {
    const navigate = useNavigate();


    const [remaining, setRemaining] = useState(0);
    const [spent, setSpent] = useState(0);
    const [list, setList] = useState<Expense[]>([]);
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
    const COLORS = [
        "#3B82F6",
        "#10B981",
        "#F59E0B",
        "#EF4444",
        "#8B5CF6",
        "#06B6D4",
    ];
    async function fetchExpenses() {
        try {
            const result = await ListExpenseApi();
            setList(result.result);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }
    async function fetchAnalytics() {
        try {
            const result = await AnalyticsAPI();
            setAnalytics(result);
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }
    async function StatsBudget() {
        try {
            const result = await StatsApi();

            setRemaining(result.remaining);
            setSpent(result.spent);



        }
        catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }
    useEffect(() => {
        StatsBudget();
        fetchExpenses();
        fetchAnalytics();
    }, [])
    const transactionFour = list.slice(0, 4);
    const data = analytics
        ? Object.entries(analytics.categorySpend).map(([name, value]) => ({
            name,
            value,
        }))
        : [];
    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />

            <main className="flex-1 p-8 overflow-y-auto">

                {/* Header */}

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Dashboard
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Track your spending at a glance.
                    </p>
                </div>

                {/* Cards */}

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

                    <div className="bg-white rounded-2xl shadow p-6">
                        <p className="text-gray-500 text-sm">
                            Total Expense
                        </p>

                        <h2 className="text-3xl font-bold mt-3">
                            ₹{spent}
                        </h2>
                    </div>


                    <div className="bg-white rounded-2xl shadow p-6">
                        <p className="text-gray-500 text-sm">
                            Budget Left
                        </p>

                        <h2 className="text-3xl font-bold mt-3 text-green-600">
                            ₹{remaining}
                        </h2>
                    </div>

                    <div className="bg-white rounded-2xl shadow p-6">
                        <p className="text-gray-500 text-sm">
                            Transactions
                        </p>

                        <h2 className="text-3xl font-bold mt-3">
                            {list.length}
                        </h2>
                    </div>

                </div>

                {/* Overview */}

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

                    {/* Mini Pie */}

                    <div className="bg-white rounded-2xl shadow p-6">

                        <div className="flex justify-between items-center mb-5">
                            <h2 className="text-xl font-semibold">
                                Spending Overview
                            </h2>

                            <button onClick={() => { navigate("/analytics") }} className="text-blue-600 text-sm hover:underline">
                                Analytics →
                            </button>
                        </div>

                        <div className="h-72">

                            <ResponsiveContainer width="100%" height="100%">

                                <PieChart>

                                    <Pie
                                        data={data}
                                        dataKey="value"
                                        nameKey="name"
                                        outerRadius={90}
                                    >
                                        {data.map((_, index) => (
                                            <Cell
                                                key={index}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>

                                    <Tooltip
                                        formatter={(value: number) => [`₹${value}`, "Amount"]}
                                    />

                                </PieChart>

                            </ResponsiveContainer>

                        </div>

                    </div>

                    {/* Recent Transactions */}

                    <div className="xl:col-span-2 bg-white rounded-2xl shadow p-6">

                        <div className="flex justify-between items-center mb-5">

                            <h2 className="text-xl font-semibold">
                                Recent Transactions
                            </h2>

                            <button onClick={() => { navigate("/transactions") }} className="text-blue-600 hover:underline">
                                View All
                            </button>

                        </div>

                        <div className="overflow-hidden rounded-xl border">

                            <table className="w-full">

                                <thead className="bg-gray-50">

                                    <tr className="text-left">

                                        <th className="px-6 py-4 font-semibold">
                                            Title
                                        </th>

                                        <th className="px-6 py-4 font-semibold">
                                            Category
                                        </th>

                                        <th className="px-6 py-4 font-semibold">
                                            Amount
                                        </th>

                                        <th className="px-6 py-4 font-semibold">
                                            Date
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {transactionFour.map((expense) => (
                                        <tr key={expense.id} className="border-t">
                                            <td className="px-6 py-4">{expense.title}</td>
                                            <td className="px-6 py-4">{expense.category}</td>
                                            <td className="px-6 py-4 text-red-500">₹{expense.amount}</td>
                                            <td className="px-6 py-4">
                                                {new Date(expense.date).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </main>
        </div>
    );
}