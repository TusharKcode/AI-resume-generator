import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { registerUser } from "../../services/authService.js";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name:"",
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
      await registerUser(formData);
      alert("Registration successful")
      navigate("/login")
    } catch (error) {
      console.error(error);
      alert("Registration failed");
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          name='name'
          placeholder='Name'
          required
          onChange={handleChange}
        />
        <br /><br />
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
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Register;