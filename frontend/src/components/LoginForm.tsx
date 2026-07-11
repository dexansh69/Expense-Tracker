import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../apiCalls/signup";

export default function LoginForm() {
    const [username, Setusername] = useState("");
    const [password, setPassword] = useState("");
    const [displaymessage, setDisplaymessage] = useState("");
    const navigate = useNavigate();
    async function validation() {
        if (username == "") {
            setDisplaymessage("Please enter username")
        }
        if (password == "") {
            setDisplaymessage("Enter password")
        }
        try {
            const result = await loginApi({
                username,
                password
            })
            // now setting the token
            const token = result.token;
            localStorage.setItem("token", token);
            setTimeout(() => {
                navigate("/dashboard");
                
            }, 3000);
            setDisplaymessage(result.message)
        } catch (error) {
            if (error instanceof Error) {
                setDisplaymessage(error.message)
            }
        }
    }
    return (
        <div className="flex justify-center items-center min-h-[80vh] bg-gray-50">
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
                    Welcome Back 👋
                </h2>

                <p className="text-center text-gray-500 mb-8">
                    Login to manage your expenses
                </p>

                <div className="space-y-5">
                    <input
                        onChange={(e) => { Setusername(e.target.value) }}
                        type="text"
                        placeholder="Username"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        onChange={(e) => { setPassword(e.target.value) }}
                        type="password"
                        placeholder="Password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {displaymessage && <p className="text-red-500 text-sm mt-2">{displaymessage}</p>}
                    <button
                        onClick={validation}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
                        Login
                    </button>
                </div>

                <p className="text-center text-gray-500 mt-6">
                    Don't have an account?{" "}
                    <span onClick={() => { navigate("/signup") }} className="text-blue-600 font-medium cursor-pointer hover:underline">
                        Sign Up
                    </span>
                </p>
            </div>
        </div>
    );
}