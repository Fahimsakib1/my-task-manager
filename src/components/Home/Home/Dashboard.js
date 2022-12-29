import React from 'react';
import { AiOutlineAppstoreAdd, AiOutlineFileDone, AiOutlineEye } from 'react-icons/ai';
import { BsListTask } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';
import { MdDownloadDone } from 'react-icons/md';
import { Link } from 'react-router-dom';




const Dashboard = () => {
    return (
        <div className=''>
            <div className='flex justify-center items-center my-auto gap-x-16 mx-auto mt-20 md:mt-36 lg:flex-row flex-col lg:gap-y-0 gap-y-8 mb-20 '>

                <Link to='/addTasks' className="flex flex-col justify-center  p-6  rounded-2xl sm:px-8  w-3/4 sm:w-3/4 md:w-1/2 lg:w-auto shadow-2xl bg-gray-900 text-gray-100 lg:px-16" title='Add New Task'>
                    <div>
                        <AiOutlineAppstoreAdd className="text-white w-40 h-36 mx-auto rounded-md bg-amber-600 aspect-square"></AiOutlineAppstoreAdd>
                        <div className="space-y-4 text-center divide-y divide-gray-700">
                            <div className="my-2 space-y-1">
                                <h2 className="text-xl font-semibold sm:text-2xl ">ADD TASKS</h2>
                                <div className='flex items-center justify-center mt-4'>
                                    <IoMdAdd className='text-3xl mr-2'></IoMdAdd>
                                    <p className=" text-lg text-gray-400">New Task</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>

                <Link to='/myTasks' className="flex flex-col justify-center  p-6 shadow-md rounded-2xl sm:px-8 bg-gray-900 text-gray-100 w-3/4 sm:w-3/4 md:w-1/2 lg:w-auto lg:px-16" title='See Your Listed Tasks'>
                    <div >
                        <BsListTask className="text-white w-40 h-36 mx-auto rounded-md bg-teal-800 aspect-square"></BsListTask>
                        <div className="space-y-4 text-center divide-y divide-gray-700">
                            <div className="my-2 space-y-1">
                                <h2 className="text-xl font-semibold sm:text-2xl ">MY TASKS</h2>
                                <div className='flex items-center justify-center mt-4'>
                                    <AiOutlineEye className='text-3xl mr-2'></AiOutlineEye>
                                    <p className="text-lg text-gray-400">Listed Tasks</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>

                <Link to='/displayCompletedTasks' className="flex flex-col justify-center p-6 shadow-md rounded-2xl sm:px-8 bg-gray-900 text-gray-100 w-3/4 sm:w-3/4 md:w-1/2 lg:w-auto lg:px-12" title='All Completed Tasks'>
                    <div >
                        <AiOutlineFileDone className="w-40 h-36 mx-auto rounded-md bg-violet-900 aspect-square"></AiOutlineFileDone>
                        <div className="space-y-4 text-center divide-y divide-gray-700">
                            <div className="my-2 space-y-1">
                                <h2 className="text-lg font-semibold sm:text-2xl ">COMPLETED TASKS</h2>
                                <div className='flex items-center justify-center mt-4'>
                                    <MdDownloadDone className='text-3xl mr-2'></MdDownloadDone>
                                    <p className="text-lg text-gray-400">Tasks Done</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>

            </div>

        </div>
    );
};

export default Dashboard;