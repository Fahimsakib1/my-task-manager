import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';
import MyTasksList from './MyTasksList';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';





const MyTasks = () => {

    const { user } = useContext(AuthContext);

    const { data: tasks = [], isLoading, refetch } = useQuery({
        queryKey: ['tasks', user?.email],
        queryFn: () => fetch(`https://task-manager-server-silk.vercel.app/tasks?email=${user?.email}`)
            .then(res => res.json())
    })

    if (isLoading) {
        return <div className="h-32 w-32 border-8 border-dashed rounded-full animate-spin border-blue-700 mx-auto mt-64"></div>
    }


    const handleDeleteTask = (id, name) => {
        const agree = window.confirm(`Are You sure you want to delete the Task ${name}`);
        console.log(agree)
        if (agree) {
            fetch(`https://task-manager-server-silk.vercel.app/deleteTask/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        refetch();
                        Swal.fire(
                            'Done!',
                            `Task ${name} Deleted Successfully`,
                            'success'
                        )
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops... Something Went Wrong',
                            text: `Can not Delete Task ${name}`
                        })
                    }
                })
        }
    }




    return (
        <div className='mb-12'>
            {/* {
                user?.email ?
                    <h1 className='text-center text-xl sm:text-xl md:text-3xl my-8 text-blue-700 '>{user?.email} You Have Added {tasks?.length} Tasks</h1>
                    :
                    <div className=' lg:mt-64 md:mt-96 sm:mt-60 mt-60'>
                        <h1 className='text-3xl sm:tex-3xl md:text-5xl lg:text-5xl text-center text-gray-600 font-semibold'>You have to Login to see your added tasks</h1>
                    </div>
            }

            {
                tasks.map(task => <MyTasksList task={task} key={task._id} handleDeleteTask={handleDeleteTask}></MyTasksList>)
            } */}

            <div>
                {
                    tasks.length ?

                        <div>
                            {
                                user?.email ?
                                    <h1 className='text-center text-xl sm:text-xl md:text-3xl my-8 text-blue-700 '>{user?.email} You Have Added {tasks?.length} Tasks</h1>
                                    :
                                    <div className=' lg:mt-64 md:mt-96 sm:mt-60 mt-60'>
                                        <h1 className='text-3xl sm:tex-3xl md:text-5xl lg:text-5xl text-center text-gray-600 font-semibold'>You have to Login to see your added tasks</h1>
                                    </div>
                            }

                            {
                                tasks.map(task => <MyTasksList task={task} key={task._id} handleDeleteTask={handleDeleteTask}></MyTasksList>)
                            }
                        </div>
                        :
                        <div className=' lg:mt-48 md:mt-96 sm:mt-60 mt-60'>
                            <h1 className='text-3xl sm:tex-3xl md:text-5xl lg:text-5xl text-center text-gray-600 font-semibold'>{user?.email} You Have Not Added Any Task</h1>
                            <Link to='/addTasks'>
                                <h1 className='text-xl sm:tex-xl md:text-3xl lg:text-3xl text-center font-semibold text-blue-600 mt-4'>Add Task</h1>
                            </Link>
                        </div>
                }
            </div>

        </div>
    );
};

export default MyTasks;