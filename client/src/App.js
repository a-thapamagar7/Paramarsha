import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import Register from "./Components/Register";
// import VideoChat from "./Components/VideoChat";
import './App.css';
// import LandingPage from "./Components/LandingPage";
import Homepage from "./Components/Homepage";
import CreateMockTest from "./Components/CreateMockTest";
import Mocktest from "./Components/Mocktest";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/mocktest" element={<CreateMockTest />} />
        <Route path="/test" element={<Mocktest />} />
      </Routes>
    </div>
  );
};

export default App;