# Todo App

## Overview
A full-stack to-do list application built using the MERN (MongoDB, Express, React, Node.js) stack. This app allows users to register, log in, and manage their tasks with a simple interface. The tasks are stored in MongoDB, and the backend API is secured using JWT authentication.

## Features
* User authentication with JWT (JSON Web Token)
* CRUD operations for managing tasks
  * Add, edit, delete, and mark tasks as complete
* Tasks are tied to individual users
* Responsive and interactive frontend built with React
* Protected routes to prevent unauthorized access to the dashboard
* Backend API built with Node.js and Express.js
* MongoDB database connection for task storage
* Deployment-ready for Render

## Project Structure
```
├── client                 # Frontend (React app)
│   ├── public            # Public files for the Frontend
│   └── src               # React source files
│       ├── components    # React components (Login, Register, TaskDashboard)
│       ├── pages         # Page components (Home, Dashboard)
│       ├── services      # Axios configurations for API calls
│       └── App.js        # Main React app entry point
├── server                # Backend (Express API)
│   ├── config           # MongoDB connection config
│   ├── middleware       # JWT middleware
│   ├── models           # Mongoose schemas (User, Task)
│   ├── routes           # API routes (auth, tasks)
│   └── server.js        # Main backend entry point
├── package.json         # Dependencies and scripts for the project
└── README.md           # Project documentation
```

## Prerequisites
Before you begin, ensure you have the following installed on your local machine:
* Node.js
* MongoDB
* Git

## Installation and Setup

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/todo-app.git
cd todo-app
```

### 2. Install Dependencies
For the Backend:
```bash
cd server
npm install
```

For the Frontend:
```bash
cd client
npm install
```

### 3. Set Up Environment Variables
In the `server` directory, create a `.env` file with the following contents:
```bash
MONGO_URI=mongodb+srv://username:<password>@cluster.mongodb.net/todo-app?retryWrites=true
JWT_SECRET=yourSecretKey
PORT=5000
```

### 4. Running the Application
Running the Backend:
```bash
cd server
npm run dev
```

Running the Frontend:
```bash
cd client
npm start
```

The backend will run on `http://localhost:5000`, and the frontend will run on `http://localhost:3000`

## API Endpoints

### Auth Endpoints
* POST `/api/auth/register`: Register a new user
* POST `/api/auth/login`: Log in a user

### Task Endpoints
* GET `/api/tasks`: Get all tasks for the logged-in user
* POST `/api/tasks`: Create a new task
* PUT `/api/tasks/:id`: Update an existing task
* DELETE `/api/tasks/:id`: Delete a task

## Deployment to Render

### 1. Create a Render Account
Sign up for a free account at [render.com](https://render.com)

### 2. Configure Backend Service
1. Create a new Web Service
2. Connect your GitHub repository
3. Configure the service:
   * Name: `todo-app-backend`
   * Environment: `Node`
   * Build Command: `npm install`
   * Start Command: `node server.js`
   * Add environment variables:
     * `MONGO_URI`
     * `JWT_SECRET`

### 3. Configure Frontend Static Site
1. Create a new Static Site
2. Connect your GitHub repository
3. Configure the build:
   * Build Command: `npm install && npm run build`
   * Publish Directory: `build`
   * Add environment variable:
     * `REACT_APP_API_URL`: Your backend service URL

### 4. Update CORS Configuration
In your backend `server.js`, update CORS to allow requests from your Render frontend domain:
```javascript
app.use(cors({
  origin: 'https://your-frontend-url.render.com'
}));
```

## Technologies Used
* Frontend: React.js, Axios
* Backend: Node.js, Express.js, JWT (JSON Web Tokens)
* Database: MongoDB (via Mongoose)
* Authentication: JWT (JSON Web Tokens)
* Hosting: Render

## Troubleshooting

### Common Issues
* CORS errors: Make sure CORS is properly configured in your backend to allow requests from your Render frontend domain
* MongoDB connection errors: Double-check your MongoDB URI in your environment variables
* Render deployment errors: Ensure all required environment variables are set in your Render dashboard

## Future Improvements
* Implement user profiles and task categories
* Add a due date reminder feature using notifications
* Enhance UI/UX with a design system like Material-UI or Tailwind CSS
* Allow users to set task priorities and sort tasks by deadline or importance

## License
This project is licensed under the MIT License.
