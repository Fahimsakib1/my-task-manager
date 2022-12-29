import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';
import DisplayCompletedTasksCard from './DisplayCompletedTasksCard';

const DisplayCompletedTasks = () => {

    // const completeTasks = useLoaderData();
    // const { taskName, userEmail, taskImage, taskPostedDate, _id, taskDescription, isCompleted } = completeTasks

    const { user } = useContext(AuthContext)

    const { data: completeTasks = [], isLoading, refetch } = useQuery({
        queryKey: ['completeTasks', user?.email],
        queryFn: () => fetch(`https://task-manager-server-silk.vercel.app/displayCompletedTasks?email=${user.email}`)
            .then(res => res.json())
    })

    if (isLoading) {
        return <div className="h-32 w-32 border-8 border-dashed rounded-full animate-spin border-blue-700 mx-auto mt-64"></div>
    }



    return (
        <div>
            <h1 className='mt-8 text-3xl font-bold text-center text-green-700'>All Completed Tasks</h1>

            {/* <section className="py-6 sm:py-12">
                <div className="container p-6 mx-auto space-y-8">
                    <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
                        {
                            completeTasks.map(task => <DisplayCompletedTasksCard key={task._id} task={task}></DisplayCompletedTasksCard>)
                        }
                    </div>
                </div>
            </section> */}

            {
                completeTasks.length ?

                    <section className="py-6 sm:py-12">
                        <div className="container p-6 mx-auto space-y-8">
                            <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
                                {
                                    completeTasks.map(task => <DisplayCompletedTasksCard key={task._id} task={task}></DisplayCompletedTasksCard>)
                                }
                            </div>
                        </div>
                    </section>

                    :

                    <div className=' lg:mt-48 md:mt-96 sm:mt-60 mt-60'>
                        <h1 className='text-3xl sm:tex-3xl md:text-4xl lg:text-5xl text-center text-gray-600 font-semibold'>You Have Not Completed Any Task Yet!!</h1>
                        <Link to='/myTasks'>
                            <div className='text-center'>
                                <button className='text-xl sm:text-xl md:text-2xl lg:text-2xl text-center font-semibold bg-blue-600  px-16 py-1 rounded-lg text-white mt-8'>Back</button>
                            </div>
                        </Link>
                    </div>
            }

        </div>
    );
};

export default DisplayCompletedTasks;