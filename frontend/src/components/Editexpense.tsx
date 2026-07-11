import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EditExpenseApi, SingleExpense } from "../apiCalls/addexpenseapi";

export default function EditExpenseForm() {
    console.log("component rendered")
    const { id } = useParams();
    const navigate = useNavigate();
console.log(id);
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    useEffect(() => {
        async function fetchExpense() {
            try {
                const result = await SingleExpense(Number(id));

                setTitle(result.expense.title);
                setAmount(Number(result.expense.amount));
                setCategory(result.expense.category);
                setDate(result.expense.date.split("T")[0]);
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
            }
        }

        fetchExpense();
    }, [id]);

    async function EditExpense() {
        try {
            const result = await EditExpenseApi(Number(id), {
                title,
                amount,
                category,
                description,
                date,
            });

            alert(result.message);

            navigate("/transactions");
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">

                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
                    Edit Expense 💸
                </h2>

                <p className="text-center text-gray-500 mb-8">
                    Update your expense
                </p>

                <div className="space-y-5">

                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        placeholder="Expense Title"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        type="number"
                        placeholder="Amount (₹)"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Category</option>
                        <option value="🍔 Food">🍔 Food</option>
                        <option value="🏠 Home">🏠 Home</option>
                        <option value="🏥 Health">🏥 Health</option>
                        <option value="🛍️ Shopping">🛍️ Shopping</option>
                        <option value="📦 Miscellaneous">📦 Miscellaneous</option>
                        <option value="✨ Other">✨ Other</option>
                    </select>

                    <input
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        type="date"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        onChange={(e) => { setDescription(e.target.value) }}
                        placeholder="Add a note (optional)"
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={EditExpense}
                        className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
                    >
                        Edit Expense
                    </button>

                </div>

            </div>
        </div>
    );
}