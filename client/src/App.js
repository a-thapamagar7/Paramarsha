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
import CreateCollege from "./Components/CreateCollege";
import AdminSubjects from "./Components/AdminSubjects";
import CreateCourse from "./Components/CreateCourse";
import AdminCourses from "./Components/AdminCourses";
import CreateUniversity from "./Components/CreateUniversity";
import AdminUniversties from "./Components/AdminUniversities";
import AdminColleges from "./Components/AdminColleges";
import ContentDetails from "./Components/ContentDetails";
import EPayment from "./Components/EPayment";
import VideoChat from "./Components/VideoChat";
import LobbyScreen from "./screens/Lobby";
import RoomPage from "./screens/Room";
import AdminDashboard from "./Components/AdminDashboard";
import AdminUsers from "./Components/AdminUsers";
import AdminPayments from "./Components/AdminPayments";
import AdminReviews from "./Components/AdminReviews";
import Quiz from "./Components/Quiz";
import ScheduleMeeting from "./Components/ScheduleMeeting";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/info/:name" element={<ContentDetails />} />
        <Route path="/content/:topic" element={<InformationShowcase />} />
        <Route path="/admin/courses/add" element={<CreateCourse />} />
        <Route path="/admin/colleges/add" element={<CreateCollege />} />
        <Route path="/admin/colleges/add/:id" element={<CreateCollege />} />
        <Route path="/admin/courses/update/:id" element={<CreateCourse />} />
        <Route path="/admin/universities/add" element={<CreateUniversity />} />
        <Route path="/admin/universities/add/:id" element={<CreateUniversity />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/mocktest" element={<CreateMockTest />} />
        <Route path="/test" element={<Mocktest />} />
        <Route path="/epay" element={<EPayment />} />
        <Route path="/admin/subjects" element={<AdminSubjects />} />
        <Route path="/admin/courses" element={<AdminCourses />} />
        <Route path="/admin/universities" element={<AdminUniversties />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/payments" element={<AdminPayments />} />
        <Route path="/admin/colleges" element={<AdminColleges />} />
        <Route path="/admin/reviews" element={<AdminReviews />} />
        <Route path="/lobby" element={<LobbyScreen />} />
        <Route path="/meeting" element={<ScheduleMeeting />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
        <Route path="/video" element={<VideoChat />} />
      </Routes>
    </div>
  );
};

export default App;