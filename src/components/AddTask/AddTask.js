import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import './AddTask.css'



const AddTask = () => {

    const { user } = useContext(AuthContext);
    console.log("User From Add Task Page", user)


    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [error, setError] = useState('');

    //imgbb key
    const imageHostKey = process.env.REACT_APP_imagebb_key;
    // console.log("Image Host Key", imageHostKey);


    const handleAddTasks = (data) => {
        console.log(data.name, data.email, data.photo[0]);
        setError('');
        
        const image = data.photo[0];
        const formData = new FormData();
        formData.append('image', image);
        console.log("Task Image",image);


        //code for getting the review date
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const currentTime = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        const MonthDateYear = [month, day, year].join('-');
        const taskDate = MonthDateYear + ' ' + currentTime

        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(imageData => {
        
            if(imageData.success){
                console.log("Image Link", imageData.data.url);

                const taskInfo = {
                    taskName: data.name,
                    userEmail: data.email || 'No Email Added',
                    taskImage: imageData.data.url,
                    taskPostedDate: taskDate
                }

                fetch('http://localhost:5000/addedTasks', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(taskInfo)
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.acknowledged) {
                        Swal.fire(
                            'YAY !!',
                            'Task Added Successfully',
                            'success'
                        )
                        reset();
                    }
                    else {
                        Swal.fire({
                            icon: 'error',
                            title: `${data.message}`,
                            text: 'Try Again Properly'
                        })
                    }
                })
                

            }
            else{
                console.log("Error");
                Swal.fire({
                    icon: 'error',
                    title: 'Image cant uploaded',
                    text: 'Try Again Properly'
                })
            }
        })

    }



    return (
        <div>
            <section className=" px-2 py-6 text-gray-100 mt-8">
                <div className="w-full sm:w-full md:w-3/4 lg:w-1/2 mx-auto px-4 py-8 sm:px-4 md:px-8  rounded-2xl bg-gray-900">
                    
                    <span className="block mb-2 text-violet-400 lg:text-5xl md:text-4xl sm:text-3xl text-4xl text-center -mt-3">Task Manager</span>

                    <form onSubmit={handleSubmit(handleAddTasks)} className="self-stretch space-y-3 ng-untouched ng-pristine ng-valid mt-6">

                        <div>
                            <label className="label">
                                <span className="text-start">Task Name</span>
                            </label>

                            {/* <input name='taskName' type="text" placeholder="Enter Task Name" className="w-full rounded-md focus:ring focus:ring-violet-400 border-gray-700 px-4 py-2 mt-2 text-black" required /> */}

                            <input type="text" {...register("name", { required: "Task Name is Required" })}
                                placeholder="Enter Task Name" className="w-full rounded-md focus:ring focus:ring-violet-400 border-gray-700 px-4 py-2 mt-2 text-black " />

                            {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}

                        </div>

                        <div>
                            <label className="label">
                                <span className="text-start">Email</span>
                            </label>

                            {/* <input name='email' type="email" defaultValue={user?.email} readOnly placeholder="Enter Task Name" className="w-full rounded-md focus:ring focus:ring-violet-400 border-gray-700 px-4 py-2 mt-2  text-gray-500 font-bold" required /> */}

                            <input type="email" {...register("email", { required: "Email is Required" })}
                                placeholder="Enter Email"
                                defaultValue={user?.email && user.email} 
                                className="w-full rounded-md focus:ring focus:ring-violet-400 border-gray-700 px-4 py-2 mt-2  text-gray-500 font-bold" />
                        </div>


                        {/* <label className="label">
                            <span className="text-start">Upload Image</span>
                        </label> */}
                        {/* <div className="flex items-center justify-center w-full">
                            <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-500 border-dashed rounded-lg cursor-pointer dark:hover:bg-bray-800 bg-gray-800  hover:border-gray-500 hover:bg-gray-700">



                                <div className="flex flex-col items-center justify-center pt-6 pb-4 ">
                                    <svg aria-hidden="true" className="w-12 h-10  text-gray-400 mt-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p className="mb-10 text-lg text-gray-400 "><span className="font-semibold">Click To Upload Task Image</span></p>

                                </div>

                                <input id="dropzone-file" type="file" className="hidden" />
                            </label>
                        </div> */}

                        <label className="block mb-1 text-md  text-white" >Upload Image</label>

                        {/* <input className="block w-full text-lg text-gray-400 border border-gray-600 rounded-lg cursor-pointer bg-gray-700 focus:outline-none placeholder-gray-400 mb-4" id="large_size" type="file"></input> */}

                        <input type="file" {...register("photo", { required: "Photo is Required" })}
                            placeholder="Upload Product Photo" className="block w-full text-lg text-gray-400 border border-gray-600 rounded-lg cursor-pointer bg-gray-700 focus:outline-none placeholder-gray-400 mb-4" required/>

                        {errors.photo && <p className='text-red-600'>{errors.photo?.message}</p>}


                        <button type="submit" className="w-full py-[10px] font-semibold rounded text-white   bg-gradient-to-r from-violet-900 to-pink-900  addTaskButton">Add Task</button>


                    </form>
                </div>
            </section>
        </div>
    );
};

export default AddTask;