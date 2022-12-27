import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';
import MyTasksList from './MyTasksList';

const MyTasks = () => {
    
    const { user } = useContext(AuthContext);
    
    const {data: tasks = [], isLoading} = useQuery({
        queryKey: ['tasks', user?.email],
        queryFn: () => fetch(`http://localhost:5000/tasks?email=${user?.email}`)
        .then(res => res.json())
    })

    if (isLoading) {
        return <div className="h-32 w-32 border-8 border-dashed rounded-full animate-spin border-blue-700 mx-auto mt-64"></div>
    }

    
    return (
        <div className='mb-12'>
            <h1 className='text-center text-xl sm:text-xl md:text-3xl my-8 text-blue-700 '>{user?.email} You Have Added {tasks?.length} Tasks</h1>

            {
                tasks.map(task => <MyTasksList task ={task} key ={task._id}></MyTasksList>)
            }
            
        </div>
    );
};

export default MyTasks;