import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';

const AddTask = () => {
    
    const {fahim} = useContext(AuthContext);
    console.log("User From Add Task Page", fahim)
    
    return (
        <div>
            <h1 className='text-4xl text-center p-4'>Hello, {fahim.name}</h1>
        </div>
    );
};

export default AddTask;