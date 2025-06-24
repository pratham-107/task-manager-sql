import React from 'react';

const TaskCard = ({ task, onUpdate }) => {
  const getNextStatus = (status) => {
    if (status === 'To Do') return 'In Progress';
    if (status === 'In Progress') return 'Done';
    return null;
  };

  const nextStatus = getNextStatus(task.status);

  return (
    <div className="card shadow-sm p-2">
      <p className="mb-1">{task.title}</p>
      {nextStatus && (
        <button
          className="btn btn-sm btn-outline-success"
          onClick={() => onUpdate(task.id, nextStatus)}
        >
          Mark as {nextStatus}
        </button>
      )}
    </div>
  );
};

export default TaskCard;
