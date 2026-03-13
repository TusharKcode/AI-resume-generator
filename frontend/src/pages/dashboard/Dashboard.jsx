import React from 'react'
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService.js";
import { createResume } from '../../services/resumeService.js';

function Dashboard() {
  const navigate = useNavigate();

  const handleCreateResume = async () => {
    try {
      const data = await createResume({
        title:"Untitled Resume",
        template:"default"
      });
      navigate(`/resume-builder/${data.resumeId}`)
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogout = () => {
    logoutUser();
    navigate("/login")
  }

  return (
    <div style={{padding:"30px"}}>
      <h1>Welcome to AI Resume Generator Dashboard</h1>
      <br />
      <button onClick={handleCreateResume}>
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