import React, { useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, Toaster } from 'react-hot-toast';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';
import Swal from 'sweetalert2';
import './AddTask.css'
import { useNavigate } from 'react-router-dom';
import SmallSpinner from '../Spinner/SmallSpinner/SmallSpinner';
import UseTitle from '../Title/UseTitle';
import ReCAPTCHA from "react-google-recaptcha";
import Cursor from 'react-cursor-follow';



const AddTask = () => {

    UseTitle('Add Task');

    const { user } = useContext(AuthContext);
    console.log("User From Add Task Page", user);

    const [loading, setLoading] = useState(false);


    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [error, setError] = useState('');
    const navigate = useNavigate();

    //imgbb key
    const imageHostKey = process.env.REACT_APP_imagebb_key;
    // console.log("Image Host Key", imageHostKey);





    const handleAddTasks = (data) => {

        // if(buttonVisible){
        //     return  Swal.fire(
        //         'Sorry!',
        //         'Button Disabled. Please Check the Captcha',
        //         'success'
        //     )
        // }


        console.log(data.name, data.email, data.photo[0], data.description);
        setError('');
        setLoading(true);

        const image = data.photo[0];
        const formData = new FormData();
        formData.append('image', image);
        console.log("Task Image", image);


        //code for getting the  time and date
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const currentTime = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
        const MonthDateYear = [month, day, year].join('-');
        const taskDate = MonthDateYear + ' ' + currentTime

        if (data.email === '') {
            Swal.fire(
                'Sorry!',
                'Login First To Add a Task!',
                'success'
            )
            return navigate('/login');
        }


        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {

                if (imageData.success) {
                    console.log("Image Link", imageData.data.url);

                    const taskInfo = {
                        taskName: data.name,
                        userEmail: data.email || 'No Email Added',
                        taskImage: imageData.data.url,
                        taskPostedDate: taskDate,
                        taskDescription: data.description,
                        isCompleted: false
                    }

                    fetch('https://task-manager-server-silk.vercel.app/addedTasks', {
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
                                setLoading(false);
                                reset();
                                navigate('/myTasks')
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
                else {
                    console.log("Error");
                    Swal.fire({
                        icon: 'error',
                        title: 'Image cant uploaded',
                        text: 'Try Again Properly'
                    })
                }
            })

    }

    //These Lines are for Captcha Only
    // const [buttonVisible, setButtonVisible] = useState(false);
    // function onChange() {
    //     setButtonVisible(true);
    // }





    return (
        <div>
            <section className=" px-2 py-6 text-gray-100 mt-3">
                <div className="w-full sm:w-full md:w-3/4 lg:w-1/2 mx-auto px-4 py-8 sm:px-4 md:px-8  rounded-2xl bg-gray-900 dark:bg-gray-900">

                    <span className="block mb-2 text-violet-400 lg:text-4xl md:text-4xl sm:text-2xl text-2xl text-center -mt-6">Daily Task Manager</span>

                    <form onSubmit={handleSubmit(handleAddTasks)} className="self-stretch space-y-3 ng-untouched ng-pristine ng-valid mt-4">

                        <div>
                            <label className="label">
                                <span className="text-start">Task Name</span>
                            </label>

                            <input type="text" {...register("name", { required: "Task Name is Required" })}
                                placeholder="Enter Task Name" className="w-full rounded-md focus:ring focus:ring-violet-400 border-gray-700 px-4 py-2 mt-2 text-black " />

                            {errors.name && <p className='text-red-600'>{errors.name?.message}</p>}

                        </div>

                        <div>
                            <label className="label">
                                <span className="text-start">Email</span>
                            </label>

                            {/* <input name='email' type="email" defaultValue={user?.email} readOnly placeholder="Enter Task Name" className="w-full rounded-md focus:ring focus:ring-violet-400 border-gray-700 px-4 py-2 mt-2  text-gray-500 font-bold" required /> */}

                            <input type="email" {...register("email", { required: "Email is Required.. Please Login" })}
                                placeholder="Enter Email"
                                defaultValue={user?.email ? user.email : ''}
                                className="w-full rounded-md  border-gray-700 px-4 py-2 mt-2  text-gray-500 font-bold" />
                            {/* {errors.email && <p className='text-red-600'>{errors.email?.message}</p>} */}
                        </div>

                        {/* <label className="block text-sm font-medium mb-2">Upload Task Image</label>
                        <div className="w-1/2 sm:w-1/2 md:w-full space-y-1 text-gray-100 ">
                            <div className="w-1/2 sm:w-1/2 md:w-full">
                                <input type="file"  {...register("photo", { required: "Photo is Required" })} className="px-3 sm:px-3 md:px-8 py-4 border-2 border-dashed rounded-md border-gray-700 text-gray-400 bg-gray-800 lg:ml-44 md:ml-20  ml-0 " required />
                            </div>
                        </div> */}


                        {/* <div className=" text-gray-100">
                            <input type="file"  {...register("photo", { required: "Photo is Required" })} className="px-3 sm:px-3 md:px-8 py-4 border-2 border-dashed rounded-md border-gray-700 text-gray-400 bg-gray-800 " required />
                        </div>
                        {errors.photo && <p className='text-red-600'>{errors.photo?.message}</p>} */}

                        <label className="block text-sm font-medium mb-2">Upload Task Image</label>
                        <input type="file" {...register("photo", { required: "Photo is Required" })} className="py-4 border-2 border-dashed rounded-md border-gray-600 text-gray-400 bg-gray-800 " required />
                        {errors.photo && <p className='text-red-600'>{errors.photo?.message}</p>}


                        <label className="block text-sm font-medium mb-2">Task Description</label>
                        <div>
                            <input type='text'  {...register("description", { required: "Task Description is Required" })} className="textarea  border-black w-full h-16  text-black rounded-lg px-4 py-2" placeholder="Add Task Description"></input>
                        </div>
                        {errors.description && <p className='text-red-600'>{errors.description?.message}</p>}


                        {/* <ReCAPTCHA
                            sitekey="6LfOF-4jAAAAAImjE8GZMCKHjVeEyOz0U2PKXvRK"
                            onChange={onChange}
                        /> */}


                        <button type="submit" className="w-full py-[10px] font-semibold rounded text-white   bg-gradient-to-r from-violet-900 to-pink-900  addTaskButton" >
                            {
                                loading ?
                                    <div className='flex justify-center items-center '>
                                        <SmallSpinner></SmallSpinner>
                                        <p className='ml-2'>Processing</p>
                                    </div>
                                    :
                                    <h1 className='uppercase'>Add Task</h1>
                            }
                        </button>

                        {/* <button type="submit" className={`w-full py-[10px] font-semibold rounded text-white    addTaskButton  ${buttonVisible ? `bg-gradient-to-r from-violet-900 to-pink-900 ` : `bg-gray-500`}`} disabled={!buttonVisible}>
                            {
                                loading ?
                                    <div className='flex justify-center items-center '>
                                        <SmallSpinner></SmallSpinner>
                                        <p className='ml-2'>Processing</p>
                                    </div>
                                    :
                                    <h1 className='uppercase'>Add Task</h1>
                            }
                        </button> */}


                    </form>
                </div>
            </section>

        </div>
    );
};

export default AddTask;