import React, { useContext, useState } from 'react';
import { FaTrashAlt, FaRegEdit, FaRegCommentDots } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IoMdDoneAll } from 'react-icons/io';
import { TfiCommentAlt } from 'react-icons/tfi';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';
import { toast } from 'react-hot-toast';
import UseTitle from '../Title/UseTitle';
import SmallSpinner from '../Spinner/SmallSpinner/SmallSpinner';
import { BiCommentAdd } from 'react-icons/bi';




const MyTasksList = ({ task, handleDeleteTask }) => {

    UseTitle('Task List');

    const [open, setOpen] = useState(false);
    const [allComments, setAllComments] = useState([]);

    const [loading, setLoading] = useState(false);
    const { taskName, userEmail, taskImage, taskPostedDate, _id, taskDescription, isCompleted } = task;


    const { user } = useContext(AuthContext);
    const { data: tasks = [], isLoading, refetch } = useQuery({
        queryKey: ['tasks', user?.email],
        queryFn: () => fetch(`https://task-manager-server-silk.vercel.app/tasks?email=${user?.email}`)
            .then(res => res.json())
    })


    const displayHiddenSection = (id, name) => {
        setOpen(!open);
        console.log("Task Name", name);
        console.log("Task ID", id);
        fetch(`https://task-manager-server-silk.vercel.app/comments/${id}`)
            .then(res => res.json())
            .then(data => {
                console.log("Fetched data ", data);
                setAllComments(data);
            })
    }


    //Delete Comment 
    const handleDeleteComment = (id) => {
        console.log("Comment ID:", id);
        const agree = window.confirm('Are You sure you want to delete this Comment');
        if (agree) {
            fetch(`https://task-manager-server-silk.vercel.app/deleteComment/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount > 0) {
                        toast.success('Comment deleted successfully');
                        setOpen(false)
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops... Something Went Wrong',
                            text: 'Can not Delete The Comment'
                        })
                    }
                })
        }

    }



    if (isLoading) {
        return <div className="h-32 w-32 border-8 border-dashed rounded-full animate-spin border-blue-700 mx-auto mt-64"></div>
    }
    refetch();


    //code for getting the  time and date
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const currentTime = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const MonthDateYear = [month, day, year].join('-');
    const commentDate = MonthDateYear + ' ' + currentTime


    const handleCompleteTask = (id, name) => {
        fetch(`https://task-manager-server-silk.vercel.app/completeTask/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            }

        })
            .then(res => res.json())
            .then(result => {
                if (result.modifiedCount > 0) {
                    toast.success('Your Task is Completed')
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

    const handleCommentAdd = (event) => {
        event.preventDefault();
        setLoading(true);
        console.log(_id, taskName)
        console.log(event.target.comment.value);

        const commentInfo = {
            task: taskName,
            taskImage: taskImage,
            comment: event.target.comment.value,
            commentDate: commentDate,
            taskMainID: _id,
            taskDescription: taskDescription,
            isCompleted: isCompleted,
            userEmail: userEmail
        }

        fetch('https://task-manager-server-silk.vercel.app/addComment', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(commentInfo)
        })
            .then(res => res.json())
            .then(result => {
                if (result.acknowledged) {
                    toast.success('Thanks For Your Comment')
                    setLoading(false);
                    event.target.reset();
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: `Something went wrong`,
                        text: 'Try Again Properly'
                    })
                    setLoading(false);
                }
            })

    }




    return (
        <div className=' mx-4 sm:mx-4 md:mx-0'>

            <div className="flex flex-col dark:border dark:border-amber-700 rounded-lg md:flex-row w-full sm:w-full md:w-full lg:w-3/4   mb-6 mx-auto shadow-2xl bg-gray-100 md:px-4 px-0 dark:bg-gray-800 ">
                <img className="object-cover w-full h-64 md:h-auto md:w-56 p-2 rounded-2xl transition ease-in-out delay-150 hover:translate-y-1  hover:scale-105 duration-300" src={taskImage} alt="" />
                <div className="p-4">
                    <div className='flex justify-around items-center gap-x-6 '>
                        {
                            isCompleted ?

                                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-white px-3 py-1 rounded-lg bg-gradient-to-r from-green-800 to-green-800">Task: {taskName}</h5>
                                :
                                <h5 className="mb-2 text-2xl font-semibold tracking-tight text-white bg-gradient-to-r from-violet-900 to-orange-800 px-2 py-1 rounded-lg">Task: {taskName}</h5>

                        }

                        <div className='flex flex-1 justify-end items-center gap-x-6 '>
                            <Link to={`/task/${_id}`}>
                                <FaRegEdit className='text-3xl text-blue-700 font-bold' title='Edit Task'></FaRegEdit>
                            </Link>
                            <FaTrashAlt onClick={() => handleDeleteTask(_id, taskName)} className='text-3xl flex justify-end text-red-600 font-bold' title='Delete Task'></FaTrashAlt>
                        </div>
                    </div>

                    <p className='font-semibold text-xs mb-1 px-1'>Post Date: {taskPostedDate}</p>
                    <p className="font-normal text-gray-900 dark:text-white">{taskDescription}</p>

                    {
                        isCompleted &&
                        <div className=''>

                            <form onSubmit={handleCommentAdd} className='my-2 flex-1 flex justify-between items-center gap-x-3 mt-4 md:flex-row flex-col lg:gap-y-0 gap-y-2'>
                                <textarea name='comment' className="textarea border-2 border-gray-400 w-full h-16  text-gray-700 rounded-lg px-4 py-2 focus:ring focus:ring-violet-400 " placeholder="Add Comment" required></textarea>

                                <button type='submit' className='font-semibold rounded text-white py-2 px-3  bg-blue-800'>
                                    {
                                        loading ?
                                            <div className='flex justify-center items-center '>
                                                <SmallSpinner></SmallSpinner>
                                                <p className='ml-2'>Adding</p>
                                            </div>
                                            :
                                            <div className='flex justify-center items-center gap-x-2'>
                                                <BiCommentAdd className='text-xl mt-1'></BiCommentAdd>
                                                <h1 className=''>Comment</h1>
                                            </div>
                                    }
                                </button>
                            </form>

                            {/* <Link to={`/comments/${_id}`}>
                                <div className='w-full md:w-1/2 mx-auto bg-gradient-to-r from-violet-900 to-orange-800 py-2 text-white rounded-lg flex justify-center items-center gap-x-2 mt-3'>
                                    <FaRegCommentDots className='text-xl mt-1'></FaRegCommentDots>
                                    <h1 className='text-md'>See All Comments</h1>
                                </div>
                            </Link> */}

                            {
                                open ?
                                    <div onClick={() => displayHiddenSection(_id, taskName)} className='w-full md:w-1/2 mx-auto bg-gradient-to-r from-violet-900 to-orange-900 py-2 text-white rounded-lg flex justify-center items-center gap-x-2 mt-3 cursor-pointer mb-2'>
                                        <FaRegCommentDots className='text-xl mt-1'></FaRegCommentDots>
                                        <h1 className='text-md'>Hide Comments</h1>
                                    </div>
                                    :
                                    <div onClick={() => displayHiddenSection(_id, taskName)} className='w-full md:w-1/2 mx-auto bg-gradient-to-r from-violet-900 to-orange-900 py-2 text-white rounded-lg flex justify-center items-center gap-x-2 mt-3 cursor-pointer mb-2'>
                                        <FaRegCommentDots className='text-xl mt-1'></FaRegCommentDots>
                                        <h1 className='text-md'>See All Comments</h1>
                                        {/* <h1 className='text-md'>See All Comments <span className='px-3 py-1 rounded-full bg-white text-black ml-8'>{allComments.length}</span></h1> */}
                                    </div>
                            }

                            {
                                open &&
                                <div>

                                    {
                                        allComments.length ?
                                            <div>
                                                {
                                                    allComments.map(singleComment =>
                                                        <div key={singleComment._id} className=''>
                                                            <p className="font-semibold text-xs mb-2 dark:text-amber-600">Date: {singleComment.commentDate}</p>
                                                            <div className='flex justify-between items-center gap-x-4'>
                                                                <div>
                                                                    <p className=" rounded-3xl py-2 px-4 text-md bg-white text-black shadow-lg mb-4 dark:bg-gray-700 dark:text-white"> {singleComment.comment}</p>
                                                                </div>
                                                                <div>
                                                                    <FaTrashAlt onClick={() => handleDeleteComment(singleComment._id)} className='text-2xl text-red-600 font-bold -mt-3' title='Delete Comment'></FaTrashAlt>
                                                                </div>
                                                            </div>
                                                        </div>)
                                                }
                                            </div>

                                            :

                                            <div>
                                                <p className='text-xl text-center text-gray-600 font-semibold mt-2'>No Comment Added</p>
                                            </div>
                                    }
                                </div>
                            }

                        </div>
                    }

                    {
                        isCompleted === true ?

                            <button type='submit' className='w-full py-[10px] font-semibold rounded text-white mt-4  bg-gradient-to-r from-green-800 to-green-700'>
                                <div className='flex justify-center items-center gap-x-2'>
                                    <IoMdDoneAll className='text-2xl'></IoMdDoneAll>
                                    <h1>Task Completed</h1>
                                </div>
                            </button>
                            :
                            <Link to={`/completeTask/${_id}`}>
                                <button onClick={() => handleCompleteTask(_id, taskName)} type='submit' className='w-full py-[10px] font-semibold rounded text-white mt-4  bg-gradient-to-r from-purple-800 to-violet-900'>
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