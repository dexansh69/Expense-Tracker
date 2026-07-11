import { useEffect, useState } from "react";
import Sidebar from "./SideBar";
import Budgetapi, { StatsApi } from "../apiCalls/Budget";
// MAIN FUNCTION
export default function Budget() {
    const [budget, setBudget] = useState("");
    const [displaymessage, setDisplaymessage] = useState("");
    const [remaining, setRemaining] = useState(0);
    const [spent, setSpent] = useState(0);
    const [budgetBackend, setBudgetBackend] = useState(0);
    // JUST ADDING THE BUDGET
    async function Addbudget() {
        try {
            const result = await Budgetapi(Number(budget));
            setDisplaymessage(result.message);

            StatsBudget();
            setBudget("");
        }
        catch (error) {
            if (error instanceof Error) {
                setDisplaymessage(error.message);
            }
        }
    }
    // STATS OF THE BUDGET PAGE NOTHING ELSE 
    async function StatsBudget() {
        try {
            const result = await StatsApi();

            setRemaining(result.remaining);
            setSpent(result.spent);
            setBudgetBackend(result.budget);


        }
        catch (error) {
            if (error instanceof Error) {
                setDisplaymessage(error.message);
            }
        }
    }
    useEffect(() => {
        StatsBudget();
    }, []);

    // 👇 YAHAN
    const percentage =
        budgetBackend > 0 ? Math.min((spent / budgetBackend) * 100, 100) : 0;
    return (
        <div className="flex bg-gray-100 min-h-screen">
            <Sidebar />

            <main className="flex-1 p-8">

                <h1 className="text-3xl font-bold text-gray-800 mb-8">
                    Budget
                </h1>

                <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow p-8">

                    <h2 className="text-2xl font-semibold mb-6">
                        Monthly Budget
                    </h2>

                    <label className="block text-gray-600 mb-2">
                        Enter Budget
                    </label>

                    <input value={budget}
                        onChange={(e) => { setBudget((e.target.value)) }}
                        type="number"
                        placeholder="Enter monthly budget..."
                        className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {displaymessage && <p className="text-red-500 text-sm mt-2">{displaymessage}</p>}
                    <button onClick={Addbudget} className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
                        Save Budget
                    </button>

                    <div className="mt-10">

                        <div className="flex justify-between mb-2">
                            <span className="text-gray-500">
                                Budget Usage
                            </span>

                            <span>
                                {spent}/{budgetBackend}
                            </span>
                        </div>

                        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="bg-blue-600 h-full rounded-full transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                            />
                        </div>

                    </div>

                    <div className="grid grid-cols-2 gap-6 mt-8">

                        <div className="bg-gray-50 rounded-xl p-5">

                            <p className="text-gray-500">
                                Remaining
                            </p>

                            <h3 className="text-2xl font-bold text-green-600 mt-2">
                                {remaining}
                            </h3>

                        </div>

                        <div className="bg-gray-50 rounded-xl p-5">

                            <p className="text-gray-500">
                                Spent
                            </p>

                            <h3 className="text-2xl font-bold text-red-500 mt-2">
                                {spent}
                            </h3>

                        </div>

                    </div>

                </div>

            </main>
        </div>
    );
}