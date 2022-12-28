import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const ViewComments = () => {

    const comments = useLoaderData();
    console.log(comments);
    return (
        <div>
            {/* <h1 className='text-4xl text-center mt-4'>All Comments: {comments.length}</h1> */}


            {
                comments.length ?

                    <div>
                        <ul className="p-4 lg:p-8 ">
                            {
                                comments.map(comment => <li key={comment._id}>

                                    <article>
                                        <div className=" px-4 py-2 rounded-xl hover:bg-gray-800 hover:text-white my-4 bg-gray-100 w-full sm:w-full md:w-3/4 lg:w-1/2 mx-auto flex justify-around items-center gap-x-8 shadow-2xl md:flex-row flex-col transition ease-in-out delay-150 hover:translate-y-1  hover:scale-105 duration-300 hover:my-4">
                                            <div>
                                                <img alt="" className="w-full h-auto md:w-36 md:h-28 rounded-md" src={comment.taskImage} />
                                            </div>
                                            <div className='flex-1 '>
                                                <div className='flex lg:flex-row md:flex-col flex-col'>
                                                    <p className="text-lg font-semibold">User: {comment.userEmail}</p>
                                                    <time className="lg:flex-1 flex lg:justify-end font-semibold">Date: {comment.commentDate}</time>
                                                </div>
                                                <p className=" text-white rounded-lg py-2 px-4 text-lg bg-gradient-to-r from-violet-900 to-red-900 mt-2"> {comment.comment}</p>
                                            </div>
                                        </div>
                                    </article>

                                </li>)
                            }
                        </ul>

                        <Link to='/myTasks'>
                            <div className='text-center mt-2 lg:-mt-6'>
                                <button className='py-[10px] font-semibold rounded-lg text-white bg-blue-700 hover:bg-blue-800 mb-8 px-16'>
                                    <h1 className='text-xl'>Back</h1>
                                </button>
                            </div>
                        </Link>
                    </div>
                    :
                    <div className=' lg:mt-48 md:mt-96 sm:mt-60 mt-60'>
                        <h1 className='text-3xl sm:tex-3xl md:text-5xl lg:text-5xl text-center text-gray-600 font-semibold'>No Comment Added For This Task</h1>
                        <Link to='/myTasks'>
                            <h1 className='text-xl sm:tex-xl md:text-3xl lg:text-3xl text-center font-semibold text-blue-600 mt-4'>Add Comment</h1>
                        </Link>
                    </div>
            }


        </div>
    );
};

export default ViewComments;