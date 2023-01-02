import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { postUsers, updateUser, deleteUser } from './taskSlice';
import { USERS } from '../../constants/constants';

const TaskForm = props => {
  const { hideForm, selectedTask, editForm, handleEdit, clearTask } = props;

  const [description, setDescription] = useState(selectedTask?.task_msg || '');
  const [date, setDate] = useState(selectedTask?.task_date || '');
  const [time, setTime] = useState(selectedTask?.task_time || '');
  const [user, setUser] = useState(selectedTask?.assigned_user || '');

  const dispatch = useDispatch();

  const clearFields = () => {
    setDescription('');
    setDate('');
    setTime('');
    setUser('');
  };

  const handleClear = e => {
    e.preventDefault();

    clearFields();
    hideForm();
    clearTask();
    handleEdit(false);
  };

  const handleDelete = () => {
    dispatch(deleteUser(selectedTask));

    clearFields();
    hideForm();
    clearTask();
    handleEdit(false);
  };

  const canSave = [description, user, date, time].every(Boolean);

  const handleForm = () => {
    if (canSave) {
      const newTask = {
        assigned_user: user,
        task_msg: description,
        task_date: date,
        task_time: time,
        user_icon: USERS[1].icon,
      };

      dispatch(postUsers(newTask));

      clearFields();
      hideForm();
    } else {
      alert('please fill all the fields');
    }
  };

  const handleFormEdit = () => {
    if (canSave) {
      const EditedTask = {
        id: +selectedTask.id,
        assigned_user: user,
        task_msg: description,
        task_date: date,
        task_time: time,
      };

      dispatch(updateUser(EditedTask));

      clearFields();
      clearTask();
      hideForm();
    } else {
      alert('please fill all the fields');
    }
  };

  return (
    <form
      className="text-dark p-3 "
      style={{ background: 'rgba(225 225 225)' }}
    >
      <div className="form-group mb-3">
        <label htmlFor="description" className="form-label">
          Task Description
        </label>
        <input
          type="text"
          className="form-control form-control-sm"
          placeholder="Follow up"
          id="description"
          name="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      <div className="row mb-3">
        <div className="form-group col-6">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            className="form-control form-control-sm"
            type="date"
            name="date"
            id="date"
            value={date}
            onChange={e => setDate(e.target.value)}
          />
        </div>

        <div className="form-group col-6">
          <label htmlFor="time" className="form-label">
            Time
          </label>
          <input
            className="form-control form-control-sm"
            type="time"
            name="time"
            id="time"
            value={time}
            onChange={e => setTime(e.target.value)}
          />
        </div>
      </div>

      <div className="form-group mb-3">
        <label htmlFor="user" className="form-label">
          Assign User
        </label>
        <select
          name="user"
          id="user"
          className="form-select form-select-sm"
          value={user}
          onChange={e => setUser(e.target.value)}
        >
          <option value="choose...">Choose...</option>
          {USERS.map(user => (
            <option key={user.user_id} value={user.name}>
              {user.name}
            </option>
          ))}
        </select>
      </div>

      <div className="buttons d-flex justify-content-between">
        {editForm && (
          <span onClick={handleDelete} className="btn text-danger ">
            &times;
          </span>
        )}

        <div className="ms-auto">
          <button
            type="button"
            onClick={handleClear}
            className="btn btn-transparent me-2"
          >
            cancel
          </button>

          {!editForm && (
            <button
              type="button"
              onClick={handleForm}
              className="btn btn-success btn-sm px-4 add-save"
            >
              save
            </button>
          )}

          {editForm && (
            <button
              type="button"
              className="btn btn-success btn-sm px-4 edit-save"
              onClick={handleFormEdit}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
