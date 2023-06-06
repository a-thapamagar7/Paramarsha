import { useState } from "react";
import React from 'react';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const loginUser = async (event) => {
        event.preventDefault()
        const response = await fetch("http://localhost:1447/api/login", {
            method: "POST",
            //sends the data in json format
            headers: {
                "Content-Type": "application/json"
            },
            //sends the states to the server
            body: JSON.stringify({
                email,
                password
            })
        })
        const data = await response.json();
        console.log(data)

        if (data.user) {
            localStorage.setItem("token", data.user)
            console.log(data.role)
            if(data.role === "admin") navigate("/admin/users")
            else {navigate("/")}
        } else {
            toast.error(data.message)
        }
    }
    return (
        <div className="loginBG items flex justify-center items-center">
            <ToastContainer/>
            <div className="login2BG flex shadow-xl" style={{ borderRadius: "11px" }}>
                <div className="login21BG w-1/2" style={{ borderTopLeftRadius: "11px", borderBottomLeftRadius: "11px" }}>
                </div>
                <div className="flex ml-16 flex-col justify-center">
                    <div className="w-64">
                        <span className="font-extrabold manrope" style={{ fontSize: "22px" }}>Welcome back, User </span>
                        <div className="spacegrotesk text-xs mb-5">Welcome back! Please enter your details.</div>
                            <form className="flex flex-col text-sm" onSubmit={loginUser}>
                                <input required className="inputBorder mb-1 w-full register-login-font spacegrotesk" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" /><br />
                                <input required className="inputBorder mb-1 w-full register-login-font spacegrotesk" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" /><br />
                                <div className="w-28 spacegrotesk mb-5 underline cursor-pointer" style={{ fontSize: "11px" }}>Forgot Password</div>
                                <button type="submit" className="spacegrotesk text-xs bg-black text-white w-full h-9 rounded-sm">Log in</button>
                            </form>
                            <div className="flex gap-0 justify-center mt-4">
                                <div className="spacegrotesk" style={{ fontSize: "11px" }}>Don’t have an account?</div>
                                <div onClick={() => { navigate("/register") }} className="spacegrotesk font-bold cursor-pointer ml-1 underline" style={{ fontSize: "10px" }}>Sign up for free</div>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login