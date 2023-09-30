import React from 'react';
import AddTask from '../../AddTask/AddTask';
import Dashboard from './Dashboard';
import UseTitle from '../../Title/UseTitle';

const Home = () => {
    
    UseTitle('Home');
    
    return (
        <div>
            {/* <AddTask></AddTask> */}
            <Dashboard></Dashboard>
        </div>
    );
};

export default Home;