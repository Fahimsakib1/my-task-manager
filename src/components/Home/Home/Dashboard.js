import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect } from 'react';
import { AiOutlineAppstoreAdd, AiOutlineFileDone, AiOutlineEye } from 'react-icons/ai';
import { BsListTask } from 'react-icons/bs';
import { IoMdAdd } from 'react-icons/io';
import { MdDownloadDone } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import Clock from 'react-live-clock';
import moment from 'moment';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Cursor from 'react-cursor-follow';
import { useState } from 'react';





const Dashboard = () => {

    //completed task
    const { user } = useContext(AuthContext)
    const { data: completeTasks = [] } = useQuery({
        queryKey: ['completeTasks', user?.email],
        queryFn: () => fetch(`https://task-manager-server-silk.vercel.app/displayCompletedTasks?email=${user.email}`)
            .then(res => res.json())
    })

    //my all added tasks
    const { data: tasks = [] } = useQuery({
        queryKey: ['tasks', user?.email],
        queryFn: () => fetch(`https://task-manager-server-silk.vercel.app/tasks?email=${user?.email}`)
            .then(res => res.json())
    })

    useEffect(() => {
        AOS.init({
            duration: 1000
        })
    }, [])









    //function and state for time
    const [time, setTime] = useState(getCurrentTime());
    useEffect(() => {
        const intervalID = setInterval(() => {
            setTime(getCurrentTime());
        }, 1000); // Update after every 1 second
        return () => {
            clearInterval(intervalID);
        };
    }, []);

    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        const meridian = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        const formattedMinutes = padZero(minutes);
        const formattedSeconds = padZero(seconds);

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds} ${meridian}`;
    }

    function padZero(num) {
        return num < 10 ? `0${num}` : num;
    }
































    return (
        <div className=''>

            <div className='relative group  w-[275px] sm:w-[260px] md:w-[310px] mx-auto text-center mt-12 mb-12' >
                <div className='absolute -inset-0.5 mt-4 rounded-xl blur bg-gradient-to-r from-pink-500 to-violet-600 opacity-70 group-hover:opacity-90 transition duration-300 '>
                </div>
                <button className='w-full py-2 text-center text-white text-2xl  bg-gray-900 dark:bg-gray-800 rounded-xl leading-none relative transition duration-300 ease-in-out delay-150 group-hover:-translate-y-0.5 group-hover:scale-102'>
                    {/* <Clock format={'HH:mm:ss A'} ticking={true} className='text-4xl md:text-[34px] text-center font-mono ' /> */}
                    <span className='text-4xl md:text-[34px] text-center font-mono '>{time}</span>
                    <h1 className=' mb-1 '>{moment().format('LL')}</h1>
                </button>
            </div>


            <div className='flex justify-center items-center my-auto gap-x-16 mx-auto  lg:flex-row flex-col lg:gap-y-0 gap-y-8 mb-20 animation' data-aos='zoom-in'>

                <Link to='/addTasks' className="flex flex-col justify-center  p-6  rounded-2xl sm:px-8  w-3/4 sm:w-3/4 md:w-1/2 lg:w-auto shadow-2xl bg-gray-900 dark:bg-gray-800 text-gray-100 lg:px-16 border-r-8 border-r-amber-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300" title='Add New Task'>
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

                <Link to='/myTasks' className="flex flex-col justify-center  p-6 shadow-md rounded-2xl sm:px-8 bg-gray-900 dark:bg-gray-800 text-gray-100 w-3/4 sm:w-3/4 md:w-1/2 lg:w-auto lg:px-16 border-r-8 border-r-teal-700 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300 " title='See Your Listed Tasks'>
                    <div >
                        <BsListTask className="text-white w-40 h-36 mx-auto rounded-md bg-teal-800 aspect-square"></BsListTask>
                        <div className="space-y-4 text-center divide-y divide-gray-700">
                            <div className="my-2 space-y-1">
                                <h2 className="text-xl font-semibold sm:text-2xl ">MY TASKS</h2>
                                <div className='flex items-center justify-center mt-4'>
                                    <AiOutlineEye className='text-3xl mr-2'></AiOutlineEye>
                                    <p className="text-lg text-gray-400">View Tasks</p>
                                    <p className='ml-4 py-2 rounded-full bg-teal-700 dark:bg-teal-800 px-4 text-md'>{tasks.length}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>


                <Link to='/displayCompletedTasks' className="flex flex-col justify-center p-6 shadow-md rounded-2xl sm:px-8 bg-gray-900 dark:bg-gray-800 text-gray-100 w-3/4 sm:w-3/4 md:w-1/2 lg:w-auto lg:px-12 border-r-8 border-r-violet-900   transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300" title='All Completed Tasks'>
                    <div >
                        <AiOutlineFileDone className="w-40 h-36 mx-auto rounded-md bg-violet-900 aspect-square"></AiOutlineFileDone>
                        <div className="space-y-4 text-center divide-y divide-gray-700">
                            <div className="my-2 space-y-1">
                                <h2 className="text-lg font-semibold sm:text-2xl ">COMPLETED TASKS</h2>
                                <div className='flex items-center justify-center mt-4'>
                                    <MdDownloadDone className='text-3xl mr-2'></MdDownloadDone>
                                    <p className="text-lg text-gray-400">Tasks Done</p>
                                    <p className='ml-4 py-2 rounded-full bg-violet-800 px-4 text-md'>{completeTasks.length}</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </Link>

            </div>
            {/* <Cursor
                pulse
                color='#4513d1'
                duration={0.3}
                size={40}
                opacity='0.6' >
            </Cursor> */}

        </div>
    );
};

export default Dashboard;