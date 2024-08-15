import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../Images/param.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      GetUserInfo();
    }
  }, []);

  const GetUserInfo = async () => {
    if (localStorage.getItem("token")) {
      const response = await fetch("http://localhost:1447/api/user/details", {
        method: "GET",
        //sends the data in json format
        headers: {
          "x-access-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data.data) {
        setUserInfo(data.data);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("token"); // removes the token from local storage
    navigate("/login"); // redirect the user to the login page
  };

  return (
    <div className="spacegrotesk text-base grid grid-cols-12 items-center flex-row w-full h-20">
      <div className="grid col-span-6">
        <img
          onClick={() => {
            navigate("/");
          }}
          src={logo}
          className="h-14"
        />
      </div>
      <div className="flex col-span-6 flex-row justify-between">
        {userInfo && <div>Hello, {userInfo.firstName}</div>}
        {userInfo?.role === "admin" && (
          <div>
            <Link to={"/admin/dashboard"}>Admin Panel</Link>
          </div>
        )}
        <div className="cursor-pointer" onClick={() => navigate("/")}>
          Home
        </div>
        {localStorage.getItem("token") ? (
          <>
            <div
              className="cursor-pointer"
              onClick={() => navigate("/content/all")}
            >
              Discover
            </div>
            <div className="cursor-pointer" onClick={logout}>
              Logout
            </div>
          </>
        ) : (
          <>
            <div
              className="grid col-span-1 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </div>
            <div
              className="grid col-span-1 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Join Us
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
