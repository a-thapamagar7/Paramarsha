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
import InformationShowcase from "./Components/InformationShowcase";
import UniversityPage from "./Components/UniversityPage";
import CreateCollege from "./Components/CreateCollege";
import CreateSubject from "./Components/CreateSubject";
import UserList from "./Components/UserList";
import AdminSubjects from "./Components/AdminSubjects";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/hi" element={<InformationShowcase />} />
        <Route path="/createcollege" element={<CreateCollege />} />
        <Route path="/createsubject" element={<CreateSubject />} />
        <Route path="/bi" element={<UniversityPage />} />
        <Route path="/user" element={<UserList />} />
        <Route path="/mocktest" element={<CreateMockTest />} />
        <Route path="/test" element={<Mocktest />} />
        <Route path="/admin/subjects" element={<AdminSubjects />} />
      </Routes>
    </div>
  );
};

export default App;