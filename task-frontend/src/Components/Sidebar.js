import React, { useState } from "react";
import './Sidebar.css';
import Modal from "./Modal";
import CreateTaskModal from "./CreateTaskModal";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useStateValue } from "../state/context";
import { useNavigate } from "react-router-dom";

function Sidebar({ onMenuClick, onTaskCreated }) {

    const [{user}, dispatch] = useStateValue();
    const navigate = useNavigate();
    console.log(user);

    const [showModal, setShowModal] = useState(false);

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleTaskSubmit = (taskData) => {
        console.log('Task Created:', taskData);
        setShowModal(false);
        if(onTaskCreated) {
            onTaskCreated();
        }
    };

    const handleMenuClick = (view) => {
        onMenuClick(view);
    }

    const handleLogout = () => {
        dispatch({type: 'SET_USER', user: null});
        localStorage.removeItem('user');
        navigate('/');
    }

    return (
        <div className="sidebar">
            {user && ( // Conditionally render profile section
                <div className="profile-user-details">
                    <img 
                        className="profile-image" 
                        src={user.profileImg} 
                        alt="Profile-image"
                    />
                    <div className="profile-info">
                        <div className="profile-username">{user.username}</div>
                        <div className="profile-email">{user.emailId}</div>
                    </div>
                </div>
            )}
            <hr className="line-break"/>
            <nav>
                <ul className="list-group">
                    <li className="menu-options">
                        <button onClick={() => handleMenuClick('all-tasks')}>All Tasks</button>
                    </li>
                    <li className="menu-options">
                        <button onClick={() => handleMenuClick('completed-tasks')}>Completed Tasks</button>
                    </li>
                </ul>
            </nav>
            <hr className="line-break"/>
            <div className="create-task-btn">
                <button className="btn btn-primary" onClick={() => setShowModal(true)}><FontAwesomeIcon icon={faPlus} style={{color: "#ffffff"}} /> Create New Task</button>
            </div>
            <div className="logout-btn">
                <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </div>
            <Modal show={showModal} handleClose={handleModalClose}>
                <CreateTaskModal handleClose={handleModalClose} onTaskCreated={handleTaskSubmit} />
            </Modal>
        </div>
    );
}

export default Sidebar;