import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src="https://file.aiquickdraw.com/imgcompressed/img/compressed_c913ea40964229321e07863e249ca8e5.webp"
            alt="Logo"
            className="h-12 w-12 rounded-full object-cover"
          />

          <h1 className="text-2xl font-bold text-gray-800">
            Expense Tracker
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-8 text-gray-700 font-medium">
          <button className="cursor-pointer hover:text-blue-600 transition">
            Home
          </button>

          <button onClick={()=>{navigate("/features")}}className="cursor-pointer hover:text-blue-600 transition">
            Features
          </button>

          <button onClick={()=>{navigate("/about")}} className="cursor-pointer hover:text-blue-600 transition">
            About
          </button>
        </div>

        {/* Auth Buttons */}
        <div  className="flex items-center gap-4">
          <button onClick={()=>{navigate("/")}} className="cursor-pointer px-5 py-2 rounded-lg border border-blue-600 text-blue-600 font-medium hover:bg-blue-50 transition">
            Login
          </button>

          <button onClick={()=>{navigate("/signup")}} className="cursor-pointer px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}