import { useNavigate } from "react-router-dom";

export default function Sidebar() {
    const navigate=useNavigate();
  return (
    <aside className="w-64 h-screen bg-white shadow-lg flex flex-col justify-between">
      {/* Logo */}
      <div>
        <div className="flex items-center gap-3 p-6 border-b">
          <img
            src="https://file.aiquickdraw.com/imgcompressed/img/compressed_c913ea40964229321e07863e249ca8e5.webp"
            alt="Logo"
            className="h-20 w-20 rounded-full object-cover"
          />

          <h1 className="text-xl font-bold text-gray-800">
            Expense Tracker
          </h1>
        </div>

        {/* Menu */}
        <div className="mt-6 px-4 space-y-2">
          <button onClick={()=>{navigate("/dashboard")}} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
            🏠 Dashboard
          </button>

          <button onClick={()=>{navigate("/transactions")}} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
            💸 Transactions
          </button>

          <button onClick={()=>{navigate("/addexpense")}} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
            ➕ Add Expense
          </button>

          <button onClick={()=>{navigate("/analytics")}} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
            📊 Analytics
          </button>

          <button onClick={()=>{navigate("/budget")}} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition">
            🎯 Budget
          </button>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t p-4">
        <button onClick={()=>{
            localStorage.clear();
            navigate("/")}} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition">
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}