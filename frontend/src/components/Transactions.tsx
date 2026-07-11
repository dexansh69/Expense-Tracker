import { useEffect, useState } from "react";
import { ListExpenseApi } from "../apiCalls/addexpenseapi";
import TransactionRow from "./TransactionsRow";

interface Expense {
  id: number;
  title: string;
  category: string;
  amount: number;
  date: string;
}

export default function TransactionsTable() {
    
  const [filter, setFilter] = useState("");
  const [category, setCategory] = useState("");
  const [list, setList] = useState<Expense[]>([]);
  const [displaymessage, setDisplaymessage] = useState("");

  async function fetchExpenses() {
    try {
      const result = await ListExpenseApi();
      setList(result.result);
    } catch (error) {
      if (error instanceof Error) {
        setDisplaymessage(error.message);
      }
    }
  }

  useEffect(() => {
    fetchExpenses();
  }, []);

  const filteredList = list.filter((expense) => {
    const titleMatch =
      filter === "" ||
      expense.title.toLowerCase().includes(filter.toLowerCase());

    const categoryMatch =
      category === "" ||
      expense.category === category;

    return titleMatch && categoryMatch;
  });

  return (
    <>
      {/* Search + Filter */}

      <div className="bg-white rounded-2xl shadow p-5 mb-8">
        <div className="flex gap-4">
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            type="text"
            placeholder="Search by title..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl cursor-pointer outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="🍔 Food">🍔 Food</option>
            <option value="🏠 Home">🏠 Home</option>
            <option value="🏥 Health">🏥 Health</option>
            <option value="🛍️ Shopping">🛍️ Shopping</option>
            <option value="📦 Miscellaneous">📦 Miscellaneous</option>
            <option value="✨ Other">✨ Other</option>
          </select>
        </div>
      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow overflow-hidden">
        <div className="max-h-[calc(100vh-220px)] overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-gray-50 z-10">
              <tr className="text-left">
                <th className="px-6 py-4 font-semibold">Title</th>

                <th className="px-6 py-4 font-semibold">Category</th>

                <th className="px-6 py-4 font-semibold">Amount</th>

                <th className="px-6 py-4 font-semibold">Date</th>

                <th className="px-6 py-4 text-center font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredList.map((expense) => (
                <TransactionRow
                  key={expense.id}
                  props={expense}
                  fetchExpenses={fetchExpenses}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {displaymessage && (
        <p className="text-red-500 text-sm mt-3">{displaymessage}</p>
      )}
    </>
  );
}