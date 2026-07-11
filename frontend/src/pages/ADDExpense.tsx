import AddExpenseForm from "../components/AddExpense";
import Sidebar from "../components/SideBar";


export default function AddExpense() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <main className="flex-1 flex justify-center items-center p-8">
        <   AddExpenseForm />
      </main>
    </div>
  );
}