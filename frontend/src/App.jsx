import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import ResumeBuilder from "./pages/resume/ResumeBuilder";
import './App.css'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/resume-builder" element={<ResumeBuilder/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
