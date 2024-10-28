import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
  });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskData, setEditingTaskData] = useState({
    title: '',
    description: '',
    dueDate: '',
  });
  const navigate = useNavigate();

  // Fetch tasks when the component loads
  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'x-auth-token': token,
        },
      };
      try {
        const res = await axios.get('http://localhost:5000/api/tasks', config);
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTasks();
  }, []);

  // Add a new task
  const addTask = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    try {
      const res = await axios.post('http://localhost:5000/api/tasks', newTask, config);
      setTasks([...tasks, res.data]); // Add new task to list
      setNewTask({ title: '', description: '', dueDate: '' }); // Clear inputs
    } catch (err) {
      console.error(err);
    }
  };

  // Handle input changes for the new task
  const onChangeNewTask = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  // Handle input changes for the editing task
  const onChangeEditTask = (e) => {
    setEditingTaskData({ ...editingTaskData, [e.target.name]: e.target.value });
  };

  // Delete a task
  const deleteTask = async (id) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, config);
      setTasks(tasks.filter((task) => task._id !== id)); // Remove deleted task
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = async (id) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${id}/complete`, {}, config);
      setTasks(tasks.map((task) => (task._id === id ? res.data : task)));
    } catch (err) {
      console.error(err);
    }
  };

  // Set a task to be edited
  const editTask = (task) => {
    setEditingTaskId(task._id);
    setEditingTaskData({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
    });
  };

  // Update a task
  const updateTask = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'x-auth-token': token,
      },
    };

    try {
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${editingTaskId}`,
        editingTaskData,
        config
      );
      setTasks(tasks.map((task) => (task._id === editingTaskId ? res.data : task))); // Update the task in the list
      setEditingTaskId(null);
      setEditingTaskData({ title: '', description: '', dueDate: '' });
    } catch (err) {
      console.error(err);
    }
  };

  // Logout the user
  const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <div>
      <h2>Task Dashboard</h2>

      {/* Logout Button */}
      <button onClick={logout}>Logout</button>

      {/* Form to add new task */}
      <div>
        <input
          type="text"
          name="title"
          value={newTask.title}
          onChange={onChangeNewTask}
          placeholder="New task title"
        />
        <input
          type="text"
          name="description"
          value={newTask.description}
          onChange={onChangeNewTask}
          placeholder="Task description"
        />
        <input
          type="date"
          name="dueDate"
          value={newTask.dueDate}
          onChange={onChangeNewTask}
          placeholder="Due date"
        />
        <button onClick={addTask}>Add Task</button>
      </div>

      {/* Display the list of tasks */}
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {editingTaskId === task._id ? (
              <>
                {/* Edit Mode */}
                <input
                  type="text"
                  name="title"
                  value={editingTaskData.title}
                  onChange={onChangeEditTask}
                  placeholder="Edit title"
                />
                <input
                  type="text"
                  name="description"
                  value={editingTaskData.description}
                  onChange={onChangeEditTask}
                  placeholder="Edit description"
                />
                <input
                  type="date"
                  name="dueDate"
                  value={editingTaskData.dueDate}
                  onChange={onChangeEditTask}
                  placeholder="Edit due date"
                />
                <button onClick={updateTask}>Update</button>
                <button onClick={() => setEditingTaskId(null)}>Cancel</button>
              </>
            ) : (
              <>
                {/* Display Task */}
                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                  {task.title} - {task.description} - Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
                <button onClick={() => toggleTaskCompletion(task._id)}>
                  {task.completed ? 'Undo' : 'Complete'}
                </button>
                <button onClick={() => deleteTask(task._id)}>Delete</button>
                <button onClick={() => editTask(task)}>Edit</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskDashboard;
