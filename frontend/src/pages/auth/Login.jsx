import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { loginUser } from "../../services/authService.js";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email:"",
    password:""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData, [e.target.value]: e.target.value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      await loginUser(formData);
      alert("Login successful")
      navigate("/dashboard")
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name='email'
          placeholder='Email'
          required
          onChange={handleChange}
        />
        <br /><br />
        <input
          type="password"
          name='password'
          placeholder='Password'
          required
          onChange={handleChange}
        />
        <br /><br />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login;