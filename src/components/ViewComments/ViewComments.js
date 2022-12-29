import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import UseTitle from '../Title/UseTitle';
import ViewCommentsCard from './ViewCommentsCard';

const ViewComments = () => {

    const comments = useLoaderData();
    console.log(comments);
    UseTitle('Comments')


    return (
        <div>
            {/* <h1 className='text-4xl text-center mt-4'>All Comments: {comments.length}</h1> */}


            {
                comments.length ?

                    <div>
                        <ul className="p-4 lg:p-8 ">
                            {
                                comments.map(singleComment => <ViewCommentsCard key={singleComment._id} singleComment={singleComment}></ViewCommentsCard>)
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