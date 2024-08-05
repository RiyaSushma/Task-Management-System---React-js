import React, { useState } from 'react';
import './CreateTaskModal.css';
import { useStateValue } from '../state/context';
import { useNavigate } from 'react-router-dom';

const CreateTaskForm = ({ handleClose, onTaskCreated }) => {
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        status: '',
        priority: '',
    });

    const [{user}, dispatch] = useStateValue();
    const [{todos}] = useStateValue();
    const navigate = useNavigate();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData({
            ...taskData,
            [name]: value,
        });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const storedUser = JSON.parse(localStorage.getItem('user'));
        console.log(storedUser);
        const userId = storedUser ? storedUser.userId : user?.userId;
        console.log(JSON.stringify({title: taskData.title, description: taskData.description, priority: taskData.priority, status: taskData.status, userId: userId }));
        const response = await fetch("http://localhost:8000/task/api/tasks", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${storedUser.authToken}`,
            },
            body: JSON.stringify({title: taskData.title, description: taskData.description, priority: taskData.priority, status: taskData.status, userId: userId })
        });

        const responseJson = await response.json();
        if(!responseJson.success) {
            alert("Enter valid task");
        } else {

            if (onTaskCreated) {
                onTaskCreated();
            }

            dispatch({
                type: 'ADD_TODO',
                user: responseJson.task,
            });

            localStorage.setItem("taskData", JSON.stringify(todos));
            const task = JSON.parse(localStorage.getItem("taskData"));
            console.log("hello task: ", task);
            console.log(responseJson.task);
            handleClose();
            navigate('/home');
        }
    };

    return (
        <form className="form-container" onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={taskData.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={taskData.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <select className="form-select" aria-label="Default select example" name="status" onChange={handleChange}>
                <option selected value="" disabled>Select Status</option>
                <option value="todo">Todo</option>
                <option value="in progress">In Progress</option>
                <option value="completed">Completed</option>
            </select>
            <select className="form-select" aria-label="Default select example" name="priority" onChange={handleChange}>
                <option selected value="" disabled>Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="urgent">Urgent</option>
            </select>
            <button className='btn btn-primary' type="submit">Create Task</button>
        </form>
    );
};

export default CreateTaskForm;
