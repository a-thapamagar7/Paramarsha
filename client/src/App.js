import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import Register from "./Components/Register";
// import VideoChat from "./Components/VideoChat";
import './App.css';
// import LandingPage from "./Components/LandingPage";
import Homepage from "./Pages/Homepage/Homepage";
import CreateMockTest from "./Components/CreateMockTest";
import Mocktest from "./Components/Mocktest";
import InformationShowcase from "./Components/InformationShowcase";
import CreateCollege from "./Pages/Admin/Collleges/CreateCollege";
import AdminSubjects from "./Pages/Admin/Subjects/AdminSubjects";
import CreateCourse from "./Pages/Admin/Courses/CreateCourse";
import AdminCourses from "./Pages/Admin/Courses/AdminCourses";
import CreateUniversity from "./Pages/Admin/Universities/CreateUniversity";
import AdminUniversties from "./Pages/Admin/Universities/AdminUniversities";
import AdminColleges from "./Pages/Admin/Collleges/AdminColleges";
import ContentDetails from "./Components/ContentDetails";
import EPayment from "./Components/EPayment";
import VideoChat from "./Components/VideoChat";
import LobbyScreen from "./screens/Lobby";
import RoomPage from "./screens/Room";
import AdminDashboard from "./Components/AdminDashboard";
import AdminUsers from "./Pages/Admin/Users/AdminUsers";
import AdminPayments from "./Components/AdminPayments";
import AdminReviews from "./Components/AdminReviews";
import Quiz from "./Components/Quiz";
import ScheduleMeeting from "./Components/ScheduleMeeting";
import AdminMockTest from "./Components/AdminMockTest";
import ProtectedRoute from "./Components/ProtectedRoute";
import PaidMember from "./Components/PaidMenber";

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
        <Route path="/test" element={<PaidMember><Mocktest /></PaidMember>} />
        <Route path="/admin/subjects" element={<ProtectedRoute role="admin"><AdminSubjects /></ProtectedRoute>} />
        <Route path="/admin/courses" element={<ProtectedRoute role="admin"><AdminCourses /></ProtectedRoute>} />
        <Route path="/admin/universities" element={<ProtectedRoute role="admin"><AdminUniversties /></ProtectedRoute>} />
        <Route path="/admin/questions" element={<ProtectedRoute role="admin"><AdminMockTest /></ProtectedRoute>} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/payments" element={<ProtectedRoute role="admin"><AdminPayments /></ProtectedRoute>} />
        <Route path="/admin/colleges" element={<ProtectedRoute role="admin"><AdminColleges /></ProtectedRoute>} />
        <Route path="/admin/reviews" element={<ProtectedRoute role="admin"><AdminReviews /></ProtectedRoute>} />
        <Route path="/lobby/:id" element={<LobbyScreen />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
        <Route path="/video" element={<VideoChat />} />
        <Route path="/meeting" element={<PaidMember><ScheduleMeeting /></PaidMember>} />
        <Route path="/epay" element={
          <EPayment />} />
      </Routes>
    </div>
  );
};

export default App;