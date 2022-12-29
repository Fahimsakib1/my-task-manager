import React from 'react';
import { IoMdDoneAll } from 'react-icons/io';
import {MdDoneOutline} from 'react-icons/md';
import UseTitle from '../Title/UseTitle';



const DisplayCompletedTasksCard = ({ task }) => {

    
    UseTitle('Completed Tasks')
    
    const { taskName, userEmail, taskImage, taskPostedDate, _id, taskDescription, isCompleted } = task
    return (
        <div>
            <article className="flex flex-col bg-gray-700 text-white dark:bg-gray-800 rounded-xl">
                <a rel="noopener noreferrer" href="/" aria-label="Te nulla oportere reprimique his dolorum">
                    <img alt="" className="object-cover w-full h-52 bg-gray-500 rounded-lg" src={taskImage} />
                </a>
                <div className="flex flex-col flex-1 px-6 py-4">
                    <h3 className="flex-1 text-xl font-semibold leading-snug">{taskName}</h3>
                    <div>
                        <p className='text-gray-200 text-sm'>Posted By: {userEmail}</p>
                        <p className='text-gray-200 text-sm'>Posted On: {taskPostedDate}</p>
                    </div>
                </div>
                <div className='w-full py-[10px] font-semibold  text-white  bg-blue-800 dark:bg-green-800 rounded-md'>
                    <div className='flex justify-center items-center gap-x-1'>
                        <MdDoneOutline className='text-3xl'></MdDoneOutline>
                        <h1 className='text-xl'>Completed</h1>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default DisplayCompletedTasksCard;