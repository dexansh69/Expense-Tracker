import { useNavigate } from "react-router-dom";
import { DeleteExpenseApi } from "../apiCalls/addexpenseapi";


interface Expense {
  id: number;
  title: string;
  category: string;
  amount: number;
  date: string;
}

interface TransactionRowProps {
  props: Expense;
  fetchExpenses: () => Promise<void>;
}

export default function TransactionRow({
  props,
  fetchExpenses,
}: TransactionRowProps) {
    const navigate = useNavigate();
  async function DeleteExpense() {
    try {
      const result = await DeleteExpenseApi(props.id);

      console.log(result.message);

      await fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  }
 

  return (
    <tr className="border-t hover:bg-gray-50 transition">
      <td className="px-6 py-5 font-medium">{props.title}</td>

      <td className="px-6 py-5">
        <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm">
          {props.category}
        </span>
      </td>

      <td className="px-6 py-5 font-semibold text-red-500">
        ₹{props.amount}
      </td>

      <td className="px-6 py-5">{props.date}</td>

      <td className="px-6 py-5">
        <div className="flex justify-center gap-3">
          <button onClick={()=>{navigate(`/editexpense/${props.id}`)}} className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-200 cursor-pointer">
            ✏ Edit
          </button>

          <button
            onClick={DeleteExpense}
            className="bg-red-100 text-red-600 px-4 py-2 rounded-lg hover:bg-red-200 cursor-pointer"
          >
            🗑 Delete
          </button>
        </div>
      </td>
    </tr>
  );
}