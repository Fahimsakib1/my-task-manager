import React, { useContext, useState } from 'react';
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IoMdDoneAll } from 'react-icons/io';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';



const MyTasksList = ({ task, handleDeleteTask }) => {

    const { taskName, userEmail, taskImage, taskPostedDate, _id, taskDescription, isCompleted } = task;

    const { user } = useContext(AuthContext);
    const { data: tasks = [], isLoading, refetch } = useQuery({
        queryKey: ['tasks', user?.email],
        queryFn: () => fetch(`http://localhost:5000/tasks?email=${user?.email}`)
            .then(res => res.json())
    })

    if (isLoading) {
        return <div className="h-32 w-32 border-8 border-dashed rounded-full animate-spin border-blue-700 mx-auto mt-64"></div>
    }
    refetch();


    const handleCompleteTask = (id, name) => {
        fetch(`http://localhost:5000/completeTask/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            }

        })
            .then(res => res.json())
            .then(result => {
                if (result.modifiedCount > 0) {
                    Swal.fire(
                        `Congratulations!!`,
                        'Your Task is Complete',
                        'success'
                    )
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: `Something Went Wrong`,
                        text: 'Try Again Properly'
                    })
                }
            })
    }




    return (
        <div className=' mx-4 sm:mx-4 md:mx-0'>

            <div className="flex flex-col  border rounded-lg md:flex-row w-full sm:w-full md:w-3/4 lg:w-1/2   mb-4 mx-auto shadow-2xl bg-gray-100 ">
                <img className="object-cover w-full h-64 md:h-auto md:w-56 p-2 rounded-2xl transition ease-in-out delay-150 hover:translate-y-1  hover:scale-105 duration-300" src={taskImage} alt="" />
                <div className="p-4">
                    <div className='flex justify-around items-center gap-x-4 '>
                        <h5 className="mb-2 text-2xl font-semibold tracking-tight text-white bg-gradient-to-r from-violet-900 to-orange-800 px-2 py-1 rounded-lg">Task: {taskName}</h5>

                        <div className='flex flex-1 justify-end items-center gap-x-6 '>
                            <Link to={`/task/${_id}`}>
                                <FaRegEdit className='text-3xl text-blue-700 font-bold' title='Edit Task'></FaRegEdit>
                            </Link>
                            <FaTrashAlt onClick={() => handleDeleteTask(_id, taskName)} className='text-3xl flex justify-end text-red-600 font-bold' title='Delete Task'></FaTrashAlt>
                        </div>
                    </div>

                    <p className="mb-3 font-normal text-gray-900 ">{taskDescription}</p>

                    <div className='flex justify-around items-center md:flex-row sm:flex-col flex-col'>
                        <p className='font-semibold flex flex-1 justify-start'>Added By: {userEmail}</p>
                        <p className='font-semibold flex flex-1 justify-end mr-4'>Post Date: {taskPostedDate}</p>
                    </div>

                    {
                        isCompleted === true ?

                            <button type='submit' className='w-full py-[10px] font-semibold rounded text-white mt-4  bg-gradient-to-r from-green-800 to-green-900'>
                                <div className='flex justify-center items-center gap-x-2'>
                                    <IoMdDoneAll className='text-2xl'></IoMdDoneAll>
                                    <h1>Task Completed</h1>
                                </div>
                            </button>
                            :
                            <Link to={`/completeTask/${_id}`}>
                                <button onClick={() => handleCompleteTask(_id, taskName)} type='submit' className='w-full py-[10px] font-semibold rounded text-white mt-4  bg-gradient-to-r from-purple-900 to-violet-900'>
                                    Complete Task
                                </button>
                            </Link>

                    }

                </div>
            </div>

        </div>
    );
};

export default MyTasksList;