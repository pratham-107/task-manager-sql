import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TaskCard from "../components/TaskCard";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const token = localStorage.getItem("token");

  // 🔐 Route protection
  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchTasks();
    }
  }, []);

  // 📥 Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err.message);
    }
  };

  // ➕ Add task
  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.error("Error adding task:", err.message);
    }
  };

  // 🔁 Update status
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (err) {
      console.error("Error updating status:", err.message);
    }
  };

  // Group tasks by status
  const groupedTasks = {
    "To Do": [],
    "In Progress": [],
    Done: [],
  };

  tasks.forEach((task) => {
    groupedTasks[task.status].push(task);
  });

  return (
    <div className="container mt-5" data-aos="fade-up">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Task Dashboard</h2>
        <button
          className="btn btn-danger"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>

      {/* Add Task Form */}
      <form onSubmit={addTask} className="mb-4 d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="btn btn-primary" type="submit">
          Add Task
        </button>
      </form>

      {/* Task Columns */}
      <div className="row">
        {["To Do", "In Progress", "Done"].map((status) => (
          <div className="col-md-4" key={status}>
            <h4 className="text-center">{status}</h4>
            <div className="d-flex flex-column gap-2">
              {groupedTasks[status].map((task) => (
                <TaskCard key={task.id} task={task} onUpdate={updateStatus} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
