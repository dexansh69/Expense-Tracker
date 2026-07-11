import { useNavigate } from "react-router-dom";
import Sidebar from "../components/SideBar";
import TransactionsTable from "../components/Transactions";


export default function Transactions() {
    const navigate = useNavigate();
  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar/>

      <div className="flex-1 p-8">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Transactions 💸
            </h1>

            <p className="text-gray-500 mt-2">
              View and manage all your expenses.
            </p>
          </div>

          <button onClick={()=>{navigate("/addexpense")}} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition cursor-pointer">
            + Add Expense
          </button>

        </div>

        <TransactionsTable />

      </div>

    </div>
  );
}