# MERN To-Do List Application

This project is a full-stack to-do list application built using the MERN stack (MongoDB, Express, React, and Node.js). It provides user authentication, task management, password reset, and email notifications.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Usage](#usage)
- [Contributing](#contributing)


---

## Features

- User authentication (registration, login)
- Task management (create, delete, retrieve tasks)
- Password reset with email notifications
- JWT-based authentication for secure access
- Task notifications via email

## Technologies Used

- **Frontend**: React, Axios
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
- **Email Service**: Nodemailer
- **Other Libraries**: bcrypt, dotenv, validator

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Devarsh-Garala/Todo-kaushalam.git
   cd Todo-kaushalam
   ```

2. **Install Backend Dependencies:**

   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies:**

   ```bash
   cd ../frontend
   npm install
   ```

## Environment Variables

To run this project, you’ll need to set up environment variables in the backend. Create a `.env` file in the `backend` folder and add:

```plaintext
MONGO_URI=mongodb+srv://202312047:Devarsh123@cluster0.mo76j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
PORT=8000
JWT_SECRET=thisisasecretkey

```

## API Endpoints

### User Routes

- **POST** `/register` - Register a new user
- **POST** `/login` - Log in a user
- **GET** `/getuser` - Get user profile (requires authentication)

### Task Routes

- **POST** `/addTask` - Add a new task (requires authentication)
- **GET** `/getTask` - Retrieve tasks for a user (requires authentication)
- **DELETE** `/removeTask` - Delete a specific task (requires authentication)

### Forgot Password Routes

- **POST** `/forgotPassword` - Request a password reset email
- **POST** `/resetPassword` - Reset user password using a token

## Usage

1. **Start the Backend Server:**

   ```bash
   cd backend
   npm start
   ```

2. **Start the Frontend Server:**

   ```bash
   cd frontend
   npm start
   ```

3. **Open the Application:**

   Visit [http://localhost:3000](http://localhost:3000) to access the app.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a pull request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

---

This README provides a structured overview of the project, setup instructions, and relevant information about the API endpoints and usage.
