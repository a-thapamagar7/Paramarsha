import { useState } from "react";
import React from 'react';
import { useNavigate } from "react-router-dom"
import logo from "../Images/param.png"



const Navbar = () => {

    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("token"); // removes the token from local storage
        navigate("/login"); // redirect the user to the login page
    }

    return (
        <div className="spacegrotesk text-base grid grid-cols-12 items-center flex-row w-full h-20">
            <div className="grid col-span-8">
                <img onClick={()=>{navigate("/")}} src={logo} className="h-14"/>
            </div>
            <div className="flex col-span-4 flex-row justify-between">
                <div className="cursor-pointer" onClick={() => navigate("/")}>Home</div>
                {(localStorage.getItem("token"))?
                (
                    <>
                        <div className="cursor-pointer" onClick={() => navigate("/content/all")}>Discover</div>
                        <div className="cursor-pointer" onClick={logout}>Logout</div>
                    </>
                    
                )
                :
                (
                    <>
                        <div className="grid col-span-1 cursor-pointer" onClick={() => navigate("/login")}>Login</div>
                        <div className="grid col-span-1 cursor-pointer" onClick={() => navigate("/register")}>Join Us</div>
                    
                    </>  
                )}
            </div>
            
        </div>
    );
}
 
export default Navbar;