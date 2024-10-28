import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Use Routes instead of Switch
import Login from './pages/Login';  // Correct path for your pages folder
import Register from './pages/Register';  // Correct path for your pages folder
import TaskDashboard from './pages/TaskDashboard';  // Correct path for TaskDashboard
import ProtectedRoute from './components/ProtectedRoute';  // Correct path for ProtectedRoute

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Protected Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><TaskDashboard /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
