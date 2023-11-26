# Task Management System
This is a simple Task Management System application built with [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/) using [MongoDB](https://www.mongodb.com/) as the database.

## Setup
1. **Clone the repository:**
git clone https://github.com/simran1002/task-management-system.git

Navigate to the project directory:
cd task-management-system

Install dependencies:
npm install

Configure environment variables:
Create a .env file in the root of your project and provide the necessary environment variables:
env
Copy code
PORT=3000
MONGODB_URI=mongodb+srv://your-mongodb-uri
Adjust the values based on your preferences and MongoDB setup.

Run the application:
npm start
The application will be accessible at http://localhost:3000 by default.

API Endpoints
Create a new task:
POST /tasks

Retrieve a list of all tasks:
GET /tasks

Retrieve a single task by ID:
GET /tasks/:id

Update an existing task:
PUT /tasks/:id

Delete a task by ID:
DELETE /tasks/:id
