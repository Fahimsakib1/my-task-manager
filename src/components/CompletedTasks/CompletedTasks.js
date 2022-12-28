import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { toast } from 'react-hot-toast';



const CompletedTasks = () => {

    const task = useLoaderData();
    const { taskName, taskDescription, _id, userEmail, taskImage, isColpleted, taskPostedDate } = task


    const handleTaskNotComplete = (id, name) => {
        fetch(`http://localhost:5000/notCompleteTask/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            }

        })
            .then(res => res.json())
            .then(result => {
                if (result.modifiedCount > 0) {
                    toast.success(`You Made The Task ${taskName} Incomplete`)
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: `Something Went Wrong`,
                        text: 'Task Can Not Be Completed'
                    })
                }
            })
    }





    return (
        <div>
            <h1 className='text-center mt-4 mb-8 text-4xl font-bold text-blue-700'> Completed Tasks</h1>

            <div className=' mx-4 sm:mx-4 md:mx-0'>

                <div className="flex flex-col  border rounded-lg md:flex-row w-full sm:w-full md:w-3/4 lg:w-1/2   mb-4 mx-auto shadow-2xl bg-gray-100 ">
                    <img className="object-cover w-full h-64 md:h-auto md:w-56 p-2 rounded-2xl transition ease-in-out delay-150 hover:translate-y-1  hover:scale-105 duration-300" src={taskImage} alt="" />
                    <div className="p-4">
                        <div className='flex justify-around items-center gap-x-4 '>
                            <h5 className="mb-2 text-xl font-semibold tracking-tight text-white bg-green-800 px-2 py-1 rounded-lg">Task: {taskName}</h5>

                            <div className='flex flex-1 justify-end items-center gap-x-6 '>
                                <Link>
                                    <FaRegEdit className='text-3xl text-blue-700 font-bold' title='Edit Task'></FaRegEdit>
                                </Link>
                                <FaTrashAlt className='text-3xl flex justify-end text-red-600 font-bold' title='Delete Task'></FaTrashAlt>
                            </div>
                        </div>

                        <p className="mb-3 font-normal text-gray-900 ">{taskDescription}</p>

                        <div className='flex justify-around items-center md:flex-row sm:flex-col flex-col'>
                            <p className='font-semibold flex flex-1 justify-start'>Added By: {userEmail}</p>
                            <p className='font-semibold flex flex-1 justify-end mr-4'>Post Date: {taskPostedDate}</p>
                        </div>

                        <Link to='/myTasks'>
                            <button onClick={()=> handleTaskNotComplete(_id)}  type='submit' className='w-full py-[10px] font-semibold rounded-lg text-white mt-4  bg-red-800'>
                                Not Complete
                            </button>
                        </Link>

                    </div>
                </div>

            </div>


        </div>
    );
};

export default CompletedTasks;