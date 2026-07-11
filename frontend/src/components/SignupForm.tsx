import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupApi } from "../apiCalls/signup";

export function SignupForm() {
    const navigate = useNavigate();
    const [username, SetUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [displaymessage,setDisplaymessage]= useState("");
    async function SignupFinal() {
        setDisplaymessage("");
        // input validation from front end 
        if (username == "") {
            setDisplaymessage("Please enter username");
            return;
        }
        if (email == "") {
            setDisplaymessage("Please enter email");
            return;
        }
        if (password == "") {
            setDisplaymessage("Please set password");
            return;
        }
        // api call making
        try {
            const result = await signupApi({
                email, username, password
            })
            setDisplaymessage(result.message);
            setTimeout(() => {
                navigate("/");
                
            }, 3000);
        } catch (error) {
            if(error instanceof Error){
                setDisplaymessage(error.message)
            }

        }

    }

    return (<div className="flex justify-center items-center min-h-[80vh] bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">


            <p className="text-center text-gray-500 mb-8">
                Signup to manage your expenses together
            </p>

            <div className="space-y-5">
                <input
                    onChange={(e) => { SetUsername(e.target.value) }}
                    type="text"
                    placeholder="Username"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    onChange={(e) => { setEmail(e.target.value) }}
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    onChange={(e) => { setPassword(e.target.value) }}
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {displaymessage&&<p className="text-red-500 text-sm mt-2">{displaymessage}</p>}
                <button onClick={SignupFinal} className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
                    Signup
                </button>
            </div>


        </div>
    </div>)
}