# Task Tracker Web
This is a simple Task Tracking System built with [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/) using [MongoDB](https://www.mongodb.com/) as the database.

## Setup
1. **Clone the repository:**
git clone https://github.com/simran1002/Task-tracker-Web.git

## Navigate to the project directory:
cd task-management-system

## Install dependencies:
npm install

## Configure environment variables:
Create a .env file in the root of your project and provide the necessary environment variables:
env

## PORT=5000

MONGODB_URI=mongodb+srv://your-mongodb-uri

Adjust the values based on your preferences and MongoDB setup.

## Run the application:
npm start

The application will be accessible at http://localhost:5000 by default.

## API Endpoints
Create a new task with title and description:-
POST /tasks

Retrieve/View a list of all tasks:-
GET /tasks

Marks the task as completed:-
PUT /task-done

Update an existing task by task ID:-
PUT /tasks/:id

Delete a task by ID:-
DELETE /tasks/:id

Retrieve a particular task by passing Task ID as params:-
GET /tasks/:id

## User Authentication (Optional):

Implemented a basic user authentication (token-based).
Only authenticated users should be able to create, update, and delete tasks.
A user registration request includes a userName, email, password, and accountType.
A user can login via email and password to generate a token. 

The schema defines a MongoDB model using Mongoose which includes fields for taskId (unique string), title (string with a minimum length of 5 characters), description (string with a maximum length of 100 characters), assigned_user (string, required), due_date (Date), and status (string).
