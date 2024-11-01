import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(''); // For displaying login errors
  const [loading, setLoading] = useState(false); // Show loading state during login

  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading state
    setError(''); // Clear previous errors

    try {
      console.log('Submitting form data:', formData); // Log form data for debugging
      
      const res = await axios.post(
        'http://localhost:5000/api/auth/login',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );
      
      console.log('Login response:', res.data); // Log response from server

      // Check if token is present in the response
      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token); // Store the token in localStorage
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        setError('Login failed. No token received.'); // Set error if no token
      }
      
    } catch (err) {
      console.error('Login error:', err); // Log error for debugging
      
      // Set an error message based on response or fallback to network error
      if (err.response) {
        setError(err.response.data.msg || 'Login failed. Please check your credentials.');
      } else if (err.request) {
        setError('Network error. Please check if the server is running.');
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        {/* Display error if login fails */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        {/* Display loading indicator */}
        {loading && <p>Loading...</p>}
        
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>Login</button>
      </form>
    </div>
  );
}

export default Login;
