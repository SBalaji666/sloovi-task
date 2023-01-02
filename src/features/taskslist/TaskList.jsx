import React from 'react';

const TaskList = ({ tasks, handleForm, selectTask, handleEdit }) => {
  const handleClick = task => {
    handleForm();
    handleEdit(true);
    selectTask(task);
  };

  return tasks.map(task => {
    return (
      <li
        className="form-control d-flex justify-content-between align-items-center"
        key={task.id}
      >
        <div className="d-flex align-items-center">
          <img className="me-2 w-25 rounded" src={`${task.user_icon}`} alt="" />
          <div>
            <span className="fw-bold name">{task.assigned_user}</span> <br />
            <span className="date">{task.task_date}</span>
          </div>
        </div>

        <div className="btn-group btn-group-sm">
          <span
            onClick={() => handleClick(task)}
            className="btn btn-outline-primary"
          >
            <i className="fas fa-edit "></i>
          </span>
          <span className="btn btn-outline-primary">
            <i className="fas fa-bell "></i>
          </span>
          <span className="btn btn-outline-primary">
            <i className="fas fa-check "></i>
          </span>
        </div>
      </li>
    );
  });
};

export default TaskList;
