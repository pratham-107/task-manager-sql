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
  const API_BASE = "https://task-manager-backend-i346.onrender.com/api";

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchTasks();
    }
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_BASE}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err.message);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await axios.post(
        `${API_BASE}/tasks`,
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      fetchTasks();
    } catch (err) {
      console.error("Error adding task:", err.message);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `${API_BASE}/tasks/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (err) {
      console.error("Error updating status:", err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_BASE}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err.message);
    }
  };

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
        <h2 className="mb-0 fw-bold">Task Dashboard</h2>
        <button
          className="btn btn-outline-danger fw-semibold"
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
          className="form-control rounded-3"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="btn btn-primary rounded-3 fw-semibold" type="submit">
          Add Task
        </button>
      </form>

      {/* Task Columns */}
      <div className="row">
        {Object.keys(groupedTasks).map((status) => (
          <div className="col-md-4 mb-4" key={status}>
            <div className="card shadow-sm rounded-4 border-0">
              <div className="card-body">
                <h5 className="card-title text-center fw-bold">{status}</h5>
                <div className="d-flex flex-column gap-3 mt-3">
                  {groupedTasks[status].map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onUpdate={updateStatus}
                      onDelete={deleteTask}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
