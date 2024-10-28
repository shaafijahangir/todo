import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState([]); // To handle and display validation errors

  const navigate = useNavigate();

  const { username, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      if (res && res.data) {
        // Store the token in localStorage
        localStorage.setItem('token', res.data.token);
        console.log('User registered and logged in at:', res.data.createdAt); // Log user creation time
        navigate('/dashboard'); // Redirect to the dashboard after registration
      } else {
        console.error('Registration failed: No data returned');
      }
    } catch (err) {
      if (err.response && err.response.data.errors) {
        setErrors(err.response.data.errors); // Set validation errors
      } else {
        console.error('Error during registration:', err.response ? err.response.data : err.message);
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={onSubmit}>
        {/* Display validation errors if any */}
        {errors.length > 0 && (
          <ul>
            {errors.map((error, index) => (
              <li key={index} style={{ color: 'red' }}>
                {error.msg}
              </li>
            ))}
          </ul>
        )}
        <div>
          <label>Username</label>
          <input type="text" name="username" value={username} onChange={onChange} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={onChange} required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
