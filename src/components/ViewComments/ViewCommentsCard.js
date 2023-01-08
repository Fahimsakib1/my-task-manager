import { useQuery } from '@tanstack/react-query';
import React from 'react';

const ViewCommentsCard = ({ singleComment }) => {

    const { _id, taskName, comment, commentDate, taskMainID, taskImage } = singleComment;



    return (
        <div>

            <li>
                <article>
                    <div className=" px-4 py-2 rounded-xl  my-4 bg-gray-100 dark:bg-gray-800 w-full sm:w-full md:w-3/4 lg:w-1/2 mx-auto flex justify-around items-center gap-x-8 shadow-2xl md:flex-row flex-col transition ease-in-out delay-150 hover:translate-y-1  hover:scale-105 duration-300 hover:my-4">
                        <div>
                            <img alt="" className="w-full h-auto md:w-36 md:h-28 rounded-md" src={taskImage} />
                        </div>
                        <div className='flex-1 '>
                            <time className="font-semibold">Date: {commentDate}</time>
                            <p className=" text-white rounded-3xl py-2 px-4 text-lg bg-gradient-to-r from-violet-900 to-red-900 mt-2"> {comment}</p>
                        </div>
                        
                    </div>
                </article>

            </li>
        </div>
    );
};

export default ViewCommentsCard;