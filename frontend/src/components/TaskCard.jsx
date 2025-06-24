import React from "react";

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const getNextStatus = (status) => {
    if (status === "To Do") return "In Progress";
    if (status === "In Progress") return "Done";
    return null;
  };

  const getStatusBadge = (status) => {
    if (status === "To Do") return "secondary";
    if (status === "In Progress") return "warning";
    if (status === "Done") return "success";
  };

  const nextStatus = getNextStatus(task.status);

  return (
    <div className="card border-0 shadow-sm p-3 rounded-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0 text-truncate">{task.title}</h6>
        <span className={`badge bg-${getStatusBadge(task.status)}`}>
          {task.status}
        </span>
      </div>

      {nextStatus && (
        <button
          className="btn btn-sm btn-outline-primary rounded-3 w-100 fw-medium"
          onClick={() => onUpdate(task.id, nextStatus)}
        >
          Move to {nextStatus}
        </button>
      )}

      <button
        className="btn btn-sm btn-outline-danger w-100 mt-2 rounded-3"
        onClick={() => onDelete(task.id)}
      >
        Delete Task
      </button>
    </div>
  );
};

export default TaskCard;
