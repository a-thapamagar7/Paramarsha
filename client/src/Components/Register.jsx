import { useState } from "react";
import React from 'react';
import { useNavigate } from "react-router-dom"

const Register = () => {

    const navigate = useNavigate()

    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState({})

    const registerUser = async (event) => {
        event.preventDefault()
        const response = await fetch("http://localhost:1447/api/register", {
            method: "POST",
            //sends the data in json format
            headers: {
                "Content-Type": "application/json"
            },
            //sends the states to the server
            body: JSON.stringify({
                fName,
                lName,
                email,
                password
            })
        })

        const data = await response.json()
        console.log(data)
        if (data.status === "success") {
            navigate("/login")
        }
        else{
            const newError = {...error}
            newError.style = "text-xs text-red-700 mt-2 text-center"
            newError.message = data.message
            setError(newError)
        }

    }
    return (
        <div className="loginBG items flex justify-center items-center">
            <div className="login2BG flex shadow-xl" style={{ borderRadius: "11px" }}>
                <div className="login21BG w-1/2" style={{ borderTopLeftRadius: "11px", borderBottomLeftRadius: "11px" }}>
                </div>
                <div className="flex ml-16 flex-col justify-center">
                    <div className="w-64">
                        <span className="font-extrabold manrope" style={{ fontSize: "22px" }}>Create your account</span>
                        <div className="spacegrotesk text-xs mb-5">Please pay for premium membership</div>
                        <form className="flex flex-col gap-y-4 text-sm" onSubmit={registerUser}>
                            <input className="inputBorder w-full register-login-font spacegrotesk" type="text" value={fName} onChange={(e) => setFName(e.target.value)} placeholder="First Name" />
                            <input className="inputBorder w-full register-login-font spacegrotesk" type="text" value={lName} onChange={(e) => setLName(e.target.value)} placeholder="Last Name" />
                            <input className="inputBorder w-full register-login-font spacegrotesk" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                            <input className="inputBorder w-full register-login-font spacegrotesk" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                            <input className="inputBorder w-full register-login-font spacegrotesk" type="password" placeholder="Confirm Password" />
                            <button type="submit" className="mt-2 spacegrotesk text-xs bg-black text-white w-full h-9 rounded-sm">Register</button>
                        </form>
                        <div className="flex gap-0 justify-center mt-4">
                            <div className="spacegrotesk" style={{ fontSize: "11px" }}>Already have an account?</div>
                            <div onClick={() => { navigate("/login") }} className="spacegrotesk font-bold cursor-pointer ml-1 underline" style={{ fontSize: "10px" }}>Log in</div>
                            
                        </div>
                        <div className={error.style}>{error.message}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register