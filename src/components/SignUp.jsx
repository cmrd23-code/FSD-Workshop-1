import React from 'react'
import { useState } from "react";
import axios from "axios";
const url = "http://localhost:3000/";
const SignUp = () => {
const [formData, setFormData] = useState({
  id: "",
  name: "",
  email: "",
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(`${url}create`,formData);

    console.log(response.data);
    alert("Signup successful!");

    setFormData({
      name: "",
      email: "",
      password: "",
    });
  } catch (error) {
    console.error(error);
    alert("Signup failed");
  }
};

return (
  <form onSubmit={handleSubmit}>
    <h2>Sign Up</h2>

    <input
      type="number"
      name="id"
      placeholder="ID"
      value={formData.id}
      onChange={handleChange}
    />
<br></br>
    <input
      type="text"
      name="name"
      placeholder="Name"
      value={formData.name}         
      onChange={handleChange}
    />
<br></br>
    <input
      type="text"
      name="email"
      placeholder="Email"
      value={formData.email}
      onChange={handleChange}
    />
    <br></br>
    <button type="submit">Sign Up</button>
  </form>
);
  
}

export default SignUp