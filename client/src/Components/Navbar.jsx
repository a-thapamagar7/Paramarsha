import { useState } from "react";
import React from 'react';
import { useNavigate } from "react-router-dom"
import logo from "../Images/param.png"

const Navbar = () => {
    const navigate = useNavigate()
    return (
        <div className="spacegrotesk text-base grid grid-cols-12 items-center flex-row w-full h-20">
            <div className="grid col-span-8">
                <img src={logo} className="h-14"/>
            </div>
            <div className="grid col-span-1 cursor-pointer" onClick={() => navigate("/")}>Home</div>
            <div className="grid col-span-1 ">About</div>
            <div className="grid col-span-1 cursor-pointer" onClick={() => navigate("/login")}>Login</div>
            <div className="grid col-span-1 cursor-pointer" onClick={() => navigate("/register")}>Join Us</div>
        </div>
    );
}
 
export default Navbar;