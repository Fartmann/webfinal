# WebFinal - Node.js & MongoDB Application
# By Adam Satyshev and Yuriy Mikhnevich
## **Project Overview**
This is a web application built using **Node.js, Express, and MongoDB**, deployed on **Render**. The application includes:
- A **CRUD API**
- **User authentication** (login & registration)
- **MongoDB Atlas integration**
- **To-Do List application**

---
## **Tech Stack**
- **Backend:** Node.js, Express.js, Mongoose
- **Database:** MongoDB Atlas
- **Frontend:** HTML, CSS, JavaScript
- **Deployment:** Render

---
## **Setup & Installation**
### 1) Clone the Repository
```sh
git clone https://github.com/your-username/webfinal.git
cd webfinal
```
### 2) Install Dependencies
```sh
npm install
```
### 3) Configure Environment Variables
Create a `.env` file in the root directory and add the following:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
### 4) Run Locally
```sh
npm start
```
Server should now be running at: **http://localhost:5000**

---
## **Deploying to Render**
### 1) Push Your Code to GitHub
```sh
git add .
git commit -m "Initial commit"
git push origin main
```
### 2) Deploy on Render
- Go to **[Render](https://render.com/)**
- Click **New Web Service**
- Connect to your GitHub repo
- Set the **Build Command:** `npm install`
- Set the **Start Command:** `node app.js`
- Click **Deploy**

### 3) Fix Common Issues
#### **1. Server Stuck on localhost:5000?**
Make sure your `app.js` includes:
```js
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

---
## **Features**
### CRUD API for Blog Posts
- `POST /api/posts` - Create a new post
- `GET /api/posts` - Retrieve all posts
- `GET /api/posts/:id` - Retrieve a single post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post

### User Authentication
- `POST /api/auth/register` - Register a user
- `POST /api/auth/login` - Login a user

### Task Manager
- `Ability to create, delete and update (if you are admin) tasks to complete`

---
## **License**
This project is licensed under the **MIT License**.

