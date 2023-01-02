import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import TaskForm from './TaskForm';
import TaskList from './TaskList';

const Task = () => {
  const tasks = useSelector(state => state.tasks.tasks);

  const [formState, setFormState] = useState(false);
  const [editState, setEditState] = useState(false);
  const [select, setSelect] = useState(null);

  const handleForm = () => {
    setFormState(prevState => !prevState);
  };

  const handleEdit = state => {
    setEditState(state);
  };

  const getSelectedTask = task => {
    setSelect(task);
  };

  const clearSelectedTask = () => {
    setSelect(null);
  };

  return (
    <>
      <div className="rounded rounded-1 col-md-5  col-10 py-5">
        <div className="input-group ">
          <input
            type="text"
            className="form-control rounded-0 "
            value={`Task ${tasks.length}`}
            readOnly
          />
          <button
            type="button"
            className="input-group-text  rounded-0 fs-5"
            onClick={() => {
              setFormState(true);
              handleEdit(false);
            }}
          >
            &#43;
          </button>
        </div>

        {formState && (
          <TaskForm
            tasks={tasks}
            selectedTask={select}
            editForm={editState}
            hideForm={handleForm}
            clearTask={clearSelectedTask}
            handleEdit={handleEdit}
          />
        )}

        <ul className="list-unstyled">
          {!formState && (
            <TaskList
              tasks={tasks}
              handleForm={handleForm}
              selectTask={getSelectedTask}
              handleEdit={handleEdit}
            />
          )}
        </ul>
      </div>
    </>
  );
};

export default Task;
