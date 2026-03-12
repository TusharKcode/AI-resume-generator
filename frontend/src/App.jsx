import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import ResumeBuilder from "./pages/resume/ResumeBuilder";
import './App.css'
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login"/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route
          path="/dashboard" 
          element={
            <ProtectedRoutes>
              <Dashboard/>
            </ProtectedRoutes>
          }
        />
        <Route
          path="/resume-builder" 
          element={
            <ProtectedRoutes>
              <ResumeBuilder/>
            </ProtectedRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
