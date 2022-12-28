import React, { useState } from 'react';
import SmallSpinner from '../Spinner/SmallSpinner/SmallSpinner';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useLoaderData, useNavigate } from 'react-router-dom';




const UpdateTask = () => {

    const task = useLoaderData();
    const { taskName, taskDescription, _id, userEmail, taskImage } = task

    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    //imgbb key
    const imageHostKey = process.env.REACT_APP_imagebb_key;


    //code for getting the  time and date
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const currentTime = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    const MonthDateYear = [month, day, year].join('-');
    const taskUpdateDate = MonthDateYear + ' ' + currentTime



    const handleUpdateTasks = (data) => {
        console.log(_id, data.name, data.description, taskImage);
        setLoading(true);
        const image = data.photo[0];
        const formData = new FormData();
        formData.append('image', image);

        let newUpdatedImage;

        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                if (imageData.success) {
                    console.log(imageData.data.url);
                    newUpdatedImage = imageData.data.url;
                    console.log(newUpdatedImage);

                    // const updatedTaskInfo = {
                    //     taskName: data.name,
                    //     taskDescription: data.description,
                    //     taskPostedDate: taskUpdateDate,
                    //     taskImage: imageData.data.url || taskImage,
                    // }

                    // fetch(`http://localhost:5000/task/${_id}`, {
                    //     method: 'PUT',
                    //     headers: {
                    //         'content-type': 'application/json',
                    //     },
                    //     body: JSON.stringify(updatedTaskInfo)
                    // })
                    // .then(res => res.json())
                    // .then(result => {
                    //     if (result.modifiedCount > 0) {
                    //         Swal.fire(
                    //             `Your Task is Updated From`,
                    //             'Go To My Tasks to See The Added Tasks',
                    //             'success'
                    //         )
                    //         setLoading(false);
                    //         reset();
                    //     }
                    //     else {
                    //         Swal.fire({
                    //             icon: 'error',
                    //             title: `${data.message}`,
                    //             text: 'Try Again Properly'
                    //         })
                    //         setLoading(false);
                    //     }
                    // })
                }
            })

        const updatedTaskInfo = {
            taskName: data.name,
            taskDescription: data.description,
            taskPostedDate: taskUpdateDate,
            taskImage: newUpdatedImage || taskImage,
        }

        fetch(`http://localhost:5000/task/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(updatedTaskInfo)
        })
            .then(res => res.json())
            .then(result => {
                if (result.modifiedCount > 0) {
                    Swal.fire(
                        `Your Task is Updated From`,
                        'Go To My Tasks to See The Added Tasks',
                        'success'
                    )
                    setLoading(false);
                    reset();
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: `${data.message}`,
                        text: 'Try Again Properly'
                    })
                    setLoading(false);
                }
            })

    }






    return (
        <div>
            <section className=" px-2 py-6 text-gray-100 mt-3">
                <div className="w-full sm:w-full md:w-3/4 lg:w-1/2 mx-auto px-4 py-8 sm:px-4 md:px-8  rounded-2xl bg-gray-900">

                    <span className="block mb-2 text-violet-400 lg:text-4xl md:text-4xl sm:text-3xl text-3xl text-center -mt-6">Update Task</span>

                    <form onSubmit={handleSubmit(handleUpdateTasks)} className="self-stretch space-y-3 ng-untouched ng-pristine ng-valid mt-4">

                        <div>
                            <label className="label">
                                <span className="text-start">Update Task Name</span>
                            </label>

                            <input type="text" defaultValue={taskName} {...register("name", { required: "Task Name is Required" })}
                                placeholder="Updated Task Name" className="w-full rounded-md focus:ring focus:ring-violet-400 border-gray-700 px-4 py-2 mt-2 text-gray-700 " />

                            {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}

                        </div>


                        <label className="block text-sm font-medium mb-2">Update Task Description</label>
                        <div>
                            <textarea defaultValue={taskDescription}  {...register("description", { required: "Task Description is Required" })} className="textarea  border-black w-full h-16  text-gray-700 rounded-lg px-4 py-2" placeholder="Add Task Description"></textarea>
                        </div>
                        {errors.description && <p className='text-red-600'>{errors.description?.message}</p>}


                        <label className="block text-sm font-medium mb-2">Upload Task Image</label>
                        <div className="w-1/2 sm:w-1/2 md:w-full space-y-1 text-gray-100 ">
                            <div className="w-1/2 sm:w-1/2 md:w-full">
                                <input type="file"  {...register("photo", { required: "Photo is Required" })} className="px-3 sm:px-3 md:px-8 py-4 border-2 border-dashed rounded-md border-gray-700 text-gray-400 bg-gray-800" />
                            </div>
                        </div>
                        {errors.photo && <p className='text-red-600'>{errors.photo?.message}</p>}


                        <button type="submit" className="w-full py-[10px] font-semibold rounded text-white   bg-gradient-to-r from-pink-900 to-violet-900  addTaskButton">
                            {
                                loading ?
                                    <div className='flex justify-center items-center '>
                                        <SmallSpinner></SmallSpinner>
                                        <p className='ml-2'>Processing</p>
                                    </div>
                                    :
                                    <h1 className='uppercase'>Update Task</h1>
                            }
                        </button>


                    </form>
                </div>
            </section>
        </div>
    );
};

export default UpdateTask;