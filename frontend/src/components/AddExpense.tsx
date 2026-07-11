import { useState } from "react";
import AddExpenseApi from "../apiCalls/addexpenseapi";


export default function AddExpenseForm() {
    const [title,setTitle]= useState("");
    const [amount,setAmount]=useState(0);
    const [description,setDescription]= useState("");
    const [category,setCategory]=useState("");
    const [date,setDate]=useState("");
    const [displaymessage,setDisplaymessage] = useState("")
    async function validation(){
        if(title == ""){
            setDisplaymessage("Title is empty")
        }
        if(amount<0){
            setDisplaymessage("Please check the amount again")
        }
        if(category == ""){
            setDisplaymessage("Select category");
        }
        if(date==""){
            setDisplaymessage("Select date")
        }
        try{
            const result = await AddExpenseApi({
                title,
                category,
                amount,
                description,
                date
            })

            setDisplaymessage(result.message)
        }catch(error){
            if(error instanceof Error){
                setDisplaymessage(error.message)
        }
        }

    }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Add Expense 💸
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Keep track of your daily spending
        </p>

        <div className="space-y-5">
          {/* Title */}
          <input
          onChange={(e)=>{setTitle(e.target.value)}}
            type="text"
            placeholder="Expense Title"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Amount */}
          <input
         onChange={(e)=>{setAmount(Number(e.target.value))}}
            type="number"
            placeholder="Amount (₹)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Category */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Category
            </label>

            <select onChange={(e)=>{setCategory(e.target.value)}}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option></option>
              <option>🍔 Food</option>
              <option>🏠 Home</option>
              <option>🏥 Health</option>
              <option>🛍️ Shopping</option>
              <option>📦 Miscellaneous</option>
              <option>✨ Other</option>
            </select>
          </div>

          {/* Date */}
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Date
            </label>

            <input
            onChange={(e)=>{setDate(e.target.value)}}
              type="date"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
          </div>

          {/* Notes */}
          <textarea 
          onChange={(e)=>{setDescription(e.target.value)}}
            placeholder="Add a note (optional)"
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        {displaymessage && <p className="text-red-500 text-sm mt-2">{displaymessage}</p>}
          {/* Button */}
          <button onClick={validation} className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-200 cursor-pointer">
            Add Expense
          </button>
        </div>
      </div>
    </div>
  );
}