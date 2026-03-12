import React from 'react'
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService.js";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/login")
  }
  return (
    <div style={{padding:"30px"}}>
      <h1>Welcome to AI Resume Generator Dashboard</h1>
      <br />
      <button onClick={() => navigate("/resume-builder")}>
        Create new resume
      </button>
      <br />
      <button onClick={handleLogout}>
        Logout
      </button>
      <br />
    </div>
  )
}

export default Dashboard