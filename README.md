# Task Manager - MERN + MySQL

A full-stack task management app built using the MERN stack with MySQL for database management. It allows users to register, log in, create tasks, update their status, and delete them securely.

## 🔗 Live Demo

- **Frontend (Vercel):** [task-manager-sql.vercel.app](https://task-manager-sql.vercel.app)
- **Backend (Render):** [task-manager-backend-i346.onrender.com](https://task-manager-backend-i346.onrender.com)

## 📂 GitHub Repository

[https://github.com/pratham-107/task-manager-sql](https://github.com/pratham-107/task-manager-sql)

## ✨ Features

- 👤 User authentication using JWT
- 📝 Add new tasks
- 🔁 Update task status: To Do → In Progress → Done
- 🗑️ Delete tasks
- 🔒 Protected routes with secure token storage
- 💻 Responsive UI with Bootstrap 5
- 🎨 Animations using AOS

## 🛠 Tech Stack

| Technology   | Purpose                    |
|--------------|----------------------------|
| React        | Frontend UI                |
| Express.js   | Backend REST API           |
| Node.js      | Runtime Environment        |
| MySQL        | Relational Database        |
| Sequelize    | ORM for MySQL              |
| Bootstrap    | Styling                    |
| AOS          | Scroll animations          |
| JWT          | Authentication             |

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pratham-107/task-manager-sql.git
   ```

2. **Backend setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env  # create your environment file with DB credentials
   npx sequelize-cli db:migrate
   npm start
   ```

3. **Frontend setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

## 🤝 License

This project is open-source and free to use.
