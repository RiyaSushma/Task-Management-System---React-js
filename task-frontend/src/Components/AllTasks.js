import React, { useState, useEffect } from "react";
import "./AllTasks.css";
import { useStateValue } from "../state/context";

const AllTasks = ({ taskUpdated }) => {
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState(false);
  const [deleteView, setDeleteView] = useState(false);
  const [{ user }] = useStateValue();
  const [taskUpdateList, setTaskUpdateList] = useState(null);
  const [taskDelete, setTaskDelete] = useState(null);
  const [updateTask, setUpdatedTask] = useState(null);
  const [updatedView, setUpdatedView] = useState(false);
  const [viewTask, setViewTask] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
  });

  const fetchTasks = async () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      console.log(storedUser);
      const userId = storedUser ? storedUser.userId : user?.userId;
      const response = await fetch(
        `http://localhost:8000/task/api/tasks/user/${userId}`
      );
      const responseJson = await response.json();
      const taskIds = responseJson.tasks;

      const tasksDetailsPromises = taskIds.map(async (taskId) => {
        const taskResponse = await fetch(
          `http://localhost:8000/task/api/tasks/${taskId}`
        );
        const taskJson = await taskResponse.json();
        return taskJson.task;
      });
      const tasksDetails = await Promise.all(tasksDetailsPromises);
      console.log(tasksDetails);
      const validTasks = tasksDetails.filter((task) => task !== undefined);
      setTasks(validTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const handleView = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:8000/task/api/tasks/${taskId}`
      );
      const responseJson = await response.json();
      console.log(responseJson);
      setViewTask(responseJson.task);
      setView(true);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
    console.log("View task:", taskId);
  };

  const handleDelete = async () => {
    try {
      if (!taskDelete) return; // No task to delete
      const response = await fetch(
        `http://localhost:8000/task/api/tasks/${taskDelete}`,
        {
          method: "DELETE",
        }
      );
      const responseJson = await response.json();
      if (responseJson.success) {
        setTasks(tasks.filter((task) => task._id !== taskDelete));
        alert("Task deleted successfully");
        setDeleteView(false);
        setTaskDelete(null);
      } else {
        alert("Error deleting task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdate = async (e) => {
    try {
      const response = await fetch(
        `http://localhost:8000/task/api/tasks/${taskUpdateList._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskUpdateList),
        }
      );
      const responseJson = await response.json();
      if (responseJson.success) {
        alert("Task updated successfully");
      } else {
        alert("Error updating task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
    setUpdatedView(false);
    setTaskUpdateList(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskUpdateList((prevData) => ({
        ...prevData,
        [name] : value,
    }));
  };

  return (
    <div className="tasks-container">
      <h2>Tasks</h2>
      <table className="tasks-table">
        <thead>
          <tr>
            <th className="title">Title</th>
            <th className="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task._id}>
                <td>{task.title}</td>
                <td>
                  <button
                    className="btn btn-light"
                    onClick={() => {
                      handleView(task._id);
                    }}
                  >
                    View
                  </button>
                  <button
                    className="btn btn-light"
                    onClick={() => {
                      setTaskUpdateList(task);
                      setUpdatedView(true);
                    }}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-light"
                    onClick={() => {
                      setDeleteView(true);
                      setTaskDelete(task._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No tasks available</td>
            </tr>
          )}
        </tbody>
      </table>
      {view && (
        <div className="modal modal-container" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-box" role="document">
            <div className="modal-content modal-content-container">
              <div className="modal-header">
                <h5 className="modal-title">Task</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setView(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Title: {viewTask.title}</p>
                <p>Description: {viewTask.description}</p>
                <p>
                  Status:{" "}
                  {viewTask.status.charAt(0).toUpperCase() +
                    viewTask.status.slice(1)}
                </p>
                <p>
                  Priority:{" "}
                  {viewTask.priority.charAt(0).toUpperCase() +
                    viewTask.priority.slice(1)}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {deleteView && (
        <div className="modal modal-container" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Task</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setDeleteView(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure?</p>
                <div className="modal-btn">
                  <button
                    className="btn btn-warning"
                    onClick={() => handleDelete()}
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setDeleteView(false)}
                    className="btn btn-warning"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {updatedView && (
        <div className="modal modal-container" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-box" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Update Task</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setUpdatedView(false)}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form className="form-container" onSubmit={handleUpdate}>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      className="input-container"
                      type="text"
                      id="title"
                      name="title"
                      value={taskUpdateList.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      className="input-container"
                      id="description"
                      name="description"
                      value={taskUpdateList.description}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <select
                    className="form-select input-container"
                    aria-label="Default select example"
                    name="status"
                    onChange={handleChange}
                    value={taskUpdateList.status}
                  >
                    <option value="todo">Todo</option>
                    <option value="in progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                  <select
                    className="form-select input-container"
                    aria-label="Default select example"
                    name="priority"
                    onChange={handleChange}
                    value={taskUpdateList.priority}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="urgent">Urgent</option>
                  </select>
                  <button className="btn btn-primary" type="submit">
                    Update Task
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTasks;
