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
            {
                user?.email ?
                <h1 className='text-center text-xl sm:text-xl md:text-3xl my-8 text-blue-700 '>{user?.email} You Have Added {tasks?.length} Tasks</h1>
                :
                <div className=' lg:mt-64 md:mt-96 :mt-96 sm:mt-60 mt-60'> 
                    <h1 className='text-3xl sm:tex-3xl md:text-5xl lg:text-5xl text-center text-gray-600'>You have to Login to see your added tasks</h1>
                </div>
            }

            {
                tasks.map(task => <MyTasksList task ={task} key ={task._id}></MyTasksList>)
            }
            
        </div>
    );
};

export default MyTasks;