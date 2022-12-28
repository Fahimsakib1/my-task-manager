import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import DisplayCompletedTasksCard from './DisplayCompletedTasksCard';

const DisplayCompletedTasks = () => {

    // const completeTasks = useLoaderData();
    // const { taskName, userEmail, taskImage, taskPostedDate, _id, taskDescription, isCompleted } = completeTasks

    const { data: completeTasks = [], isLoading, refetch } = useQuery({
        queryKey: ['completeTasks'],
        queryFn: () => fetch('http://localhost:5000/displayCompletedTasks')
            .then(res => res.json())
    })

    if (isLoading) {
        return <div className="h-32 w-32 border-8 border-dashed rounded-full animate-spin border-blue-700 mx-auto mt-64"></div>
    }

    return (
        <div>
            <h1 className='mt-4 text-3xl font-bold text-center text-green-700'>All Completed Tasks</h1>

            <section className="py-6 sm:py-12">
                <div className="container p-6 mx-auto space-y-8">
                    <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
                        {
                            completeTasks.map(task => <DisplayCompletedTasksCard key={task._id} task={task}></DisplayCompletedTasksCard>)
                        }
                    </div>
                </div>
            </section>

        </div>
    );
};

export default DisplayCompletedTasks;