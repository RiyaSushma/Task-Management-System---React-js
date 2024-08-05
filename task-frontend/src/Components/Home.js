import React, { useState } from "react";
import './Home.css';
import Sidebar from "./Sidebar";
import AllTasks from "./AllTasks";
import CompletedTasks from "./CompletedTasks";

function Home() {

    const [activeView, setActiveView] = useState('all-tasks');
    const [taskUpdated, setTaskUpdated] = useState(false);

    const handleTaskUpdated = () => {
        setTaskUpdated(prev => !prev);
    };

    const renderContent = () => {
        switch(activeView) {
            case 'all-tasks':
                return <AllTasks/>
            case 'completed-tasks': 
                return <CompletedTasks/>
        }
    };

    return (
        <div className='home-container'>
            <div className='sidebar-container'>
                <Sidebar onMenuClick={ setActiveView } onTaskCreated={handleTaskUpdated}/>
            </div>
            <div className='dashboard-container'> 
                {renderContent()}
            </div>
        </div>
    );
}

export default Home;