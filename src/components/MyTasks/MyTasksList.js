import React from 'react';
import { FaTrashAlt, FaRegEdit } from 'react-icons/fa';





const MyTasksList = ({ task }) => {

    const { taskName, userEmail, taskImage, taskPostedDate } = task

    return (
        <div className=' mx-4 sm:mx-4 md:mx-0'>
            {/* <div className="bg-gray-800 text-gray-50 my-4">
                <div className="container grid grid-cols-12 mx-auto bg-gray-900">
                    <div className="bg-no-repeat bg-cover bg-gray-700 col-span-full lg:col-span-4" >
                        <img  src={taskImage} className='w-56 h-48 rounded-md' alt="" />
                    </div>
                    
                    <div className="flex flex-col p-6 col-span-full row-span-full lg:col-span-8 lg:p-10">
                    
                        <h1 className="text-3xl font-semibold">Task: {taskName}</h1>
                        <p className="flex-1 pt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, reprehenderit adipisci tempore voluptas laborum quod.</p>

                        <div className="flex items-center justify-between pt-2">
                            <div className="flex space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-400">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path>
                                </svg>
                                <span className="self-center text-sm">Email: {userEmail}</span>
                            </div>
                            <span className="text-xs">{taskPostedDate}</span>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="flex flex-col  border rounded-lg md:flex-row w-full sm:w-full md:w-3/4 lg:w-1/2   mb-4 mx-auto shadow-2xl bg-gray-100">
                <img className="object-cover w-full h-96 md:h-52 md:w-56 p-2 rounded-2xl" src={taskImage} alt="" />
                <div className="p-4">
                    <div className='flex justify-around items-center gap-x-4 '>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Task: {taskName}</h5>
                        <div className='flex flex-1 justify-end items-center gap-x-6 '>
                            <FaRegEdit className='text-3xl text-blue-700 font-bold' title='Edit Task'></FaRegEdit>
                            <FaTrashAlt className='text-3xl flex justify-end text-red-600 font-bold' title='Delete Task'></FaTrashAlt>
                        </div>
                    </div>
                    <p className="mb-3 font-normal text-gray-900 ">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                    <div className='flex justify-around items-center md:flex-row sm:flex-col flex-col'>
                        <p className='font-normal'>Added By: {userEmail}</p>
                        <p className='font-normal'>Post Date: {taskPostedDate}</p>
                    </div>

                    <button type='submit' className='w-full py-[10px] font-semibold rounded text-white mt-4  bg-gradient-to-r from-purple-900 to-violet-900'>
                        Completed Task
                    </button>

                </div>
            </div>

        </div>
    );
};

export default MyTasksList;