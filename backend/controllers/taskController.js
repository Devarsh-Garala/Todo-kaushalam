import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js";
import { createTransport } from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const sendMail = (email, subject, title, description) => {
  var transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  var mailOptions = {
    from: "alok.yadav6000@gmail.com",
    to: email,
    subject: subject,
    html: `<h1>Task added successfully</h1><h2>Title: ${title}</h2><h3>Description: ${description}</h3>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const addTask = async (req, res) => {
  const { title, description, priority, dueDate } = req.body;
  const userId = req.user.id;
  const user = await userModel.find({ _id: userId });
  const newTask = new taskModel({
    title,
    description,
    completed: false,
    userId,
    priority,
    dueDate,
  });
  newTask
    .save()
    .then(() => {
      sendMail(user[0].email, "Task Added", title, description);
      console.log(`Task added successfully - Status: 200 - Title: ${title}`);
      return res.status(200).json({ message: "Task added successfully" });
    })
    .catch((error) => {
      console.log(`Failed to add task - Status: 500 - Error: ${error.message}`);
      return res.status(500).json({ message: error.message });
    });
};

const removeTask = (req, res) => {
  const { id } = req.body;
  console.log("id: ", id);
  taskModel
    .findByIdAndDelete(id)
    .then(() => {
      console.log(`Task deleted successfully - Status: 200 - ID: ${id}`);
      res.status(200).json({ message: "Task deleted successfully" });
    })
    .catch((error) => {
      console.log(
        `Failed to delete task - Status: 501 - Error: ${error.message}`
      );
      res.status(501).json({ message: error.message });
    });
};

const editTask = async (req, res) => {
  try {
    // Get task ID from URL params instead of request body
    const taskId = req.params.id;
    const { title, description, completed, priority, dueDate } = req.body;

    console.log("Editing task with ID:", taskId);
    console.log("Request body:", req.body);

    // Validate taskId format
    if (!taskId.match(/^[0-9a-fA-F]{24}$/)) {
      console.log(`Invalid task ID format - Status: 400 - ID: ${taskId}`);
      return res.status(400).json({ message: "Invalid task ID format" });
    }

    const task = await taskModel.findById(taskId);

    if (!task) {
      console.log(`Task not found - Status: 404 - ID: ${taskId}`);
      return res.status(404).json({ message: "Task not found" });
    }

    // Since requireAuth middleware is not used in route, we need to handle unauthorized access differently
    // You may want to add requireAuth middleware to the route instead
    if (req.user && task.userId !== req.user.id) {
      console.log(`Unauthorized edit attempt - Status: 401 - ID: ${taskId}`);
      return res
        .status(401)
        .json({ message: "Not authorized to edit this task" });
    }

    const updatedTask = await taskModel.findByIdAndUpdate(
      taskId,
      { title, description, completed, priority, dueDate },
      { new: true }
    );

    console.log(`Task updated successfully - Status: 200 - ID: ${taskId}`);
    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
  } catch (error) {
    console.log(
      `Failed to update task - Status: 500 - Error: ${error.message}`
    );
    res.status(500).json({ success: false, message: error.message });
  }
};

const getTask = (req, res) => {
  taskModel
    .find({ userId: req.user.id })
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(501).json({ message: error.message }));
};

export { addTask, getTask, removeTask, editTask };
