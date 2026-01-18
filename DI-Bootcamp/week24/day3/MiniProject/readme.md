
Mini P.-Collaborative Storytelling App

Last Updated: October 10th, 2025

👩‍🏫 👩🏿‍🏫 What You’ll learn

    Authentication using Node.js, Express, Redux Toolkit and JWT
    Secure password storage with bcrypt
    CRUD operations with PostgreSQL
    React and TypeScript for building a frontend
    State management with Redux Toolkit
    Deployment using Render for frontend and backend
    Basic database design and relationships
    Making responsive designs
    Clean code practices


🎥 Helpul videos

    Full Stack + React + Node.js + PostgreSQL
    PERN Stack Course - Postgres, Express, React, and Node
    React Redux Toolkit Tutorials


📖 Useful Resources

    Introduction to JSON Web Tokens
    Redux Toolkit Docs
    You Might Not Need an Effect
    daisyUI
    Token Storage
    TypeScript Playground


🛠️ What you will create

A Collaborative Storytelling App. Users can log in, create, and collaborate on stories (posts). Advanced features include real-time editing, version control, and profile customization.

DALL·E 2025-01-01 13 13 28 - A colorful, illustrated scene depicting collaborative storytelling In the center of the image, an oversized open book floats on a screen, surrounded


IMPORTANT : READ ALL THE INSTRUCTIONS BEFORE YOU START THE PROJECT


Instructions

You’re going to use a monorepo setup: the backend and frontend source files will be in the same git repository. You should have a separate dependency file (package.json).


Mandatory Features


1. Project structure

You should have the backend and frontend directories for each part of this full stack project and a types directory for sharing TypeScript across your project.
Backend Setup

    Initialize a Node.js project with npm init.
    Install dependencies: express, pg, bcrypt, jsonwebtoken, dotenv, cors.
    Structure the backend:
        routes: For endpoints. Use Express Router to setup your routes and controllers in modular way.
        controllers: For receiving requests, user authentication and authorizing the operations, and sending responses.
        db: For database connection logic. Use a shared pool of connections for performance.
        models: For business logic such as committing a new entity into the database or getting all the entities from the database.
        helpers: various utility functions.
    Use dotenv for secrets (e.g., JWT secret, database URL) and .env files while developing locally. Check the application environment (production or development) and use the appropriate mechanism for loading the environment variables.
    Make sure that all errors are handled gracefully: the app should never crash when a user interacts with it, and should return a helpful message if an exception happens without revealing any technical details that could help a malicious user.
    Never trust the user input even if you validated it in the backend. For example, if you sanitize the user’s input on the frontend, do the same on the backend. Make sure your app is not susceptible to SQL injections! Better safe than sorry!


2. Authentication

You will be using a JSON web token based authentication solution. For requests that require authentication, you will have to pass the token as a part of the Authorization header. You should not store the token in localStorage and instead store it in-memory in your Redux store. On page reload you should use the refresh token (stored in an HTTP only cookie) that you also get upon logging in or signing up to get a new access token and then replay the failed requests for seamless experience for your users.


Registration:

    Hash passwords with bcrypt:

const bcrypt = require("bcrypt")
const saltRounds = 10
const hashedPassword = await bcrypt.hash(userPassword, saltRounds)


    Validate input (e.g., check for empty fields or invalid email) and store the user in the database:


if (!username || !email || !password) {
return res.status(400).json({ message: "All fields are required." })
}
// Save to database
await db.query(
"INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3)",
[username, email, hashedPassword],
)


    Display both validation errors and errors received from the backend (such as incorrect username or password). 


Login:

    Verify password with bcrypt.compare:


const isMatch = await bcrypt.compare(inputPassword, storedPasswordHash)
if (!isMatch) {
return res.status(401).json({ message: "Invalid credentials." })
}


    Generate JWT upon successful login:


const jwt = require("jsonwebtoken")
const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
expiresIn: "15m",
})
const refreshToken = jwt.sign(
{ userId: user.id },
process.env.REFRESH_SECRET,
{ expiresIn: "7d" },
)
res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
res.json({ accessToken })


    Protect routes with JWT middleware:


const authenticateToken = (req, res, next) => {
const token = req.headers["authorization"]
if (!token) return res.sendStatus(403)

jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
if (err) return res.sendStatus(403)
req.user = user
next()
})
}


    Refreshing Tokens and Replaying Requests:

const refreshAccessToken = (req, res) => {
const refreshToken = req.cookies.refreshToken
if (!refreshToken) return res.sendStatus(403)

jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, user) => {
if (err) return res.sendStatus(403)
const newAccessToken = jwt.sign(
{ userId: user.userId },
process.env.JWT_SECRET,
{ expiresIn: "15m" },
)
res.json({ accessToken: newAccessToken })
})
}

// Client-side logic for refreshing and retrying failed requests
const retryFailedRequest = async (originalRequest, refreshEndpoint) => {
try {
 // Request a new access token using the refresh endpoint
 const refreshResponse = await fetch(refreshEndpoint, {
method: "POST",
credentials: "include", // Include the HTTP-only refresh token
})

 if (refreshResponse.ok) {
const { accessToken } = await refreshResponse.json()
   // Update the authorization header for the original request
originalRequest.headers["Authorization"] = `Bearer ${accessToken}`
   // Retry the original request
const retryResponse = await fetch(
  originalRequest.url,
  originalRequest,
)
return retryResponse
 } else {
throw new Error("Unable to refresh access token.")
 }
} catch (err) {
console.error("Failed to retry request:", err)
throw err
}
}


    When in production, make sure that you set the secure option for your cookies.


Authorization

When a user sends a request to the backend, we should check whether they have the necessary permissions to perform the operation. For example, only the author of a story should be able delete it, while only the author and the collaborators should be able to edit it.

We can use middleware to check the user’s permissions before allowing them to access a route. Here’s an example of a middleware that checks if the user is the author of a story:


// src/middleware/authorize.ts
import { Request, Response, NextFunction } from "express"

const authorize = (req: Request, res: Response, next: NextFunction) => {
  const { user } = req
  const { storyId } = req.params

  // Check if the user is the author of the story
  if (user.id !== story.author_id) {
    return res
      .status(403)
      .json({ message: "You are not authorized to perform this action." })
  }

  next()
}


On the frontend we need to send the Authorization header with the token when we’re using endpoints that require authorization. If you’re using Redux for state management, you should add a function that adds the Authorization header to the request object before sending it to the backend.


3. Deployment

You should deploy the app on [Render.com] which is a cloud service with a generous free tier.

It’s very easy to deploy on Render. It will automatically redeploy every time you push into the repository.

    Backend:
        Deploy on Render.com:
    Log in to Render.com and create a new web service.
    Link your backend repository and specify the root directory for the backend.
    Set the Build Command to npm install && npm run build (if applicable) and the Start Command to node dist/index.js (or your server start file).
    Add environment variables for JWT_SECRET and DATABASE_URL under the Environment tab.
    Click Deploy and wait for the service to start.
    Test the backend endpoint once deployed to ensure it’s accessible.
    Make sure that you’re using the internal connection to the database to reduce latency.
    Frontend:
        Deploy on Render.com as a static site:
    Create a new Static Site on Render.
    Link your frontend repository and specify the root directory for the frontend part.
    Set the Build Command to npm install && npm run build and the Publish Directory to dist.
    Ensure the API base URL in your React app points to the deployed backend URL.
    Deploy and test the full-stack application for integration.


4. CRUD and REST

    You should have endpoints for common CRUD operations (create, read, update and delete) for all your entities. The endpoints should use the appropriate HTTP verbs. For example, creating a new entity (a user, a story, a comment etc.) should use the POST method while editing an existing entity should use the PATCH method etc.

Here’s the list of the required endpoints:

1. Authentication:

    POST /register: Registers a new user. Expects a username, email, and password in the request body. Returns a success message upon successful registration. On error it should return a 400 status code and a message explaining the error.

    POST /login: Logs in an existing user. Expects an email and password in the request body. Returns a JWT token if the login is successful.

2. Stories

    GET /stories: Fetches all stories. Requires a valid JWT in the Authorization header. You can redirect to a login page if the user is not authenticated.
    POST /stories: Creates a new story. Requires a title and content in the request body and a valid JWT.
    PATCH /stories/:id: Updates an existing story. Requires a valid JWT and ensures the authenticated user is the author of the story or is in the list of the collaborators on the story.
    DELETE /stories/:id: Deletes a story. Requires a valid JWT and ensures the authenticated user is the author.

3. Contributors:

    POST /contributors: Adds a contributor to a story. Requires the story_id and user_id in the request body.
    GET /contributors/:story_id: Fetches all contributors for a story. Requires a valid JWT.

    DELETE /contributors/:id: Removes a contributor from a story. Requires a valid JWT and ensures the authenticated user is the author of the story.

    Your endpoints should reply with appropriate status codes: e.g. 401 for an attempt to use a protected resource while logged out, 400 for requests with bad input (i.e., issuing a CURL request to one of your endpoint from the command line with empty input).


5. Database Design

Use PostgreSQL. Tables:

    Users: id, username, email (unique), password_hash.


CREATE TABLE Users (
id SERIAL PRIMARY KEY,
username VARCHAR(50) NOT NULL,
email VARCHAR(100) UNIQUE NOT NULL,
password_hash TEXT NOT NULL
);


    Stories: id, title, content, author_id, created_at, updated_at.


CREATE TABLE Stories (
id SERIAL PRIMARY KEY,
title VARCHAR(255) NOT NULL,
content TEXT NOT NULL,
author_id INT REFERENCES Users(id),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


    Contributors: id, story_id, user_id.


CREATE TABLE Contributors (
id SERIAL PRIMARY KEY,
story_id INT REFERENCES Stories(id),
user_id INT REFERENCES Users(id)
);


5. Frontend Development

For quicker development you can use a component framework such as daisyUI which is a tailwind CSS component library. It will allow you to quickly build a responsive design without having to write a lot of CSS.


Setting Up Redux with TypeScript in a Vite Project

Integrate Redux into a Vite project using TypeScript. You’ll work with Story and User models, ensuring everything is typed with TypeScript for type safety. This setup will help you manage your app’s state effectively.


1. Create a Vite Project with TypeScript

First, create a new Vite project using the TypeScript template. This will set up everything you need for a React project with TypeScript.


2. Install Redux and React-Redux

Next, install Redux Toolkit and React-Redux. These will be used to manage your application’s state.


3. Define the Redux Store with TypeScript

Set up your Redux store by creating slices to manage state for User and Story. Each slice will have actions that modify the state, such as adding or updating users and stories. Make sure to define the types for the state to take advantage of TypeScript’s type safety.


4. Provide the Redux Store to Your App

Incorporate the Provider component from react-redux in your main.tsx file to make the Redux store accessible throughout your app.


5. Access Redux State in Components

In your components, use useSelector to read state and useDispatch to dispatch actions. This allows you to interact with your app’s state and trigger changes based on user input or other events.


6. Run Your App

After setting up everything, run your app to see Redux in action. This will allow you to interact with the state you’ve set up and see how actions modify it.

Later on, you might incorporate actions for fetching data from APIs or sending data to a server. Redux Toolkit’s createAsyncThunk can help you handle asynchronous actions neatly, so your state management stays organized.


6. Project structure:

The project should follow the common project structure with the following directories in its src directory:

    app for components, hooks, pages etc.

    features for Redux slices

    Pages:

        Homepage: List all stories with a filter for user’s own stories.

        Story Viewer: Display story details and contributors. Add comments section.

        Login page: The user should be redirected here upon logout or when their token is expired and it was not possible to refresh it using the refresh token (because it either expired or is no longer present).

        Signup page: The registration page should be accessible from the login page and from the main page. Automatically login the user as soon as they sign up. The user should provide an email (user as the username) and password. Use a form here and send the data in a fetch request to your backend.

    Use Redux Toolkit for global state management. Create separate slices and for each of your features such as authentication (storing the current token to use it with requests etc.), stories (loading stories, editing stories locally before saving etc.).

    Make sure that the app is responsive across mobile and desktop. Use dark theme and allow switching the theme (many component libraries come with this by default).


7. State management

Use a Redux store to store global data such as the the user’s authentication status. You should have models for the common data types. For starters, you should have a User model that has the following fields: id, username, email, stories etc. You should have a Story model that has the following fields: id, title, content, author, contributors etc. Use TypeScript to prevent runtime errors!

Pay attention at how you synchronize data between the backend and the frontend. Avoid having more than one source of truth for the same data. For example, if you have a story that is being edited by a user, you should store the story in the Redux store and update it there. When the user saves the story, you should send the updated story to the backend.

Make use of Redux Dev Tools for testing your app.


8. Documentation

Any real world project has to have documentation. At the minimum, you should explain how to start your project, which scripts do what, which environment variables are necessary for using the app.


9. Deploy your project


General hints

    For developing locally, you might want to create a script that will initialize the tables for you. You can then quickly destroy the database on Render and then create a new one and quickly setup your tables if need be.
    For exploring the database with a GUI you can use a free app https://dbeaver.io/
    Don’t repeat yourself. For example, you should have a function that fetches all collaborators for a story from the database and then use it in multiple places in your code, such as when displaying the contributors of a story and when checking whether the edit is allowed (the author of the edit is in the list of the collaborators for the story).
    Avoid overusing useEffect. Read [this guide](https://react.dev/learn/you-might-not-need-an-effect){: .hi-vis target=”_blank”}.
    Make sure not to accidentally commit your secrets to GitHub, especially if you decide to make your repository public as it’s known for automated systems deployed by malicious actors to scan public repositories for exposed credentials.
    Use the debugger! It cannot be stressed more that debugger is the most useful tool in your toolbox. You can use the built-in debugger in your browser or you can setup your IDE of choice to debug inside of it.
    Use the Profiler in React Dev Tools to identify performance bottlenecks in your app.


More Info

    Duration: 2 days
    Starter template: Redux Vite template
