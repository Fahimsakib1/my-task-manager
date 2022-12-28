import React, { useContext, useState } from 'react';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../../images/MainLogo-no-bg.png';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import './Header1.css';
import Swal from 'sweetalert2';
import { BsSun, BsMoon } from 'react-icons/bs';


const Header1 = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, signOutUser, theme, ThemeChange } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogoutUser = () => {
        signOutUser()
            .then(() => {
                navigate('/login')
            })
            .catch(error => {
                console.error(error.message)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Logout Failed',
                })
            })
    }

    // const handleThemeSwitch = () => {
    //     ThemeChange();
    // }



    return (
        <div className='sticky top-0 z-50'>
            <div className="px-4 py-3 mx-auto  md:px-24 lg:px-8 bg-gray-800 text-white">

                <div className="relative flex items-center justify-between ">

                    {/* Large Devices */}
                    <Link
                        to="/"
                        aria-label="Company"
                        title="Company"
                        className="inline-flex items-center"
                    >
                        <img className='w-16 h-16 rounded-full' src={logo} alt="" />
                        <span className="ml-1 text-2xl font-semibold tracking-wide text-white uppercase hover:text-amber-500 transition ease-in delay-150   hover:scale-105 duration-300">
                            Daily Tasks
                        </span>
                    </Link>

                    {
                        user?.email &&
                        <div className='py-1 bg-gradient-to-r from-violet-900 to-pink-900 px-8 rounded-md hidden lg:block transition ease-in-out delay-150 hover:-translate-y-2  duration-300 animate-bounce'>
                            <h1 className='flex justify-start text-xl text-white'>Hi, {user?.email}</h1>
                        </div>
                    }

                    <ul className="flex items-center hidden space-x-8 lg:flex">


                        <NavLink to='/' className={({ isActive }) => isActive ? 'active' : undefined}></NavLink>
                        <NavLink to='/addTasks' className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400 hover:text-orange-400">Add Tasks</NavLink>
                        <NavLink to='/myTasks' className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400 hover:text-orange-400">My Tasks</NavLink>
                        <NavLink to='/displayCompletedTasks' className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400 hover:text-orange-400">Completed Tasks</NavLink>

                        {
                            user?.email ?
                                <div>
                                    <Link
                                        onClick={handleLogoutUser}
                                        className="inline-flex items-center justify-center h-10 px-6 font-medium tracking-wide text-white  rounded shadow-md bg-purple-800" title="Log Out"
                                    >
                                        Logout
                                    </Link>

                                </div>
                                :
                                <div>
                                    <Link
                                        to="/login"
                                        className="inline-flex items-center justify-center h-10 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-800  focus:shadow-outline focus:outline-none mr-4" title="Login"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        to="/signup"
                                        className="inline-flex items-center justify-center h-10 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-700 focus:shadow-outline focus:outline-none" title="Sign Up"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                        }

                        {/* {
                            theme === 'dark' ?
                                <BsMoon onClick={handleThemeSwitch} className=" my-auto ml-8 mr-12 sm:mt-3 md:mt-3 lg:mt-2 mt-2 text-3xl mb-4 sm:mb-4 md:mb-4 lg:mb-0 " title='Click For Light Mode' ></BsMoon>
                                :
                                <BsSun onClick={handleThemeSwitch} className=" my-auto ml-3 sm:mt-3 md:mt-3 lg:mt-2 mt-2 text-3xl mb-4 sm:mb-4 md:mb-4 lg:mb-0 mr-8" title='Click For Dark Mode'></BsSun>
                        } */}

                    </ul>






                    <div className="lg:hidden">

                        <button
                            aria-label="Open Menu"
                            title="Open Menu"
                            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <svg className="w-6 text-white" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                                />
                            </svg>
                        </button>

                        {isMenuOpen && (

                            // Small Devices
                            <div className="absolute top-0 left-0 w-full">

                                <div className="p-5 bg-gray-900 border rounded shadow-sm">
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <Link
                                                to="/"
                                                className="inline-flex items-center"
                                            >
                                                <img className='w-12 h-12 rounded-full' src={logo} alt="" />
                                                <span className="ml-1 text-xl font-bold tracking-wide text-white uppercase">
                                                    Daily Tasks
                                                </span>
                                            </Link>
                                        </div>

                                        <div>
                                            <button
                                                title="Close Menu"
                                                className="p-2 -mt-2 -mr-2 transition duration-200 rounded bg-gray-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                <svg className="w-5 text-black" viewBox="0 0 24 24">
                                                    <path
                                                        fill="currentColor"
                                                        d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <nav>
                                        <ul className="space-y-4">
                                            <NavLink to='/' className={({ isActive }) => isActive ? 'active' : undefined}></NavLink>

                                            {
                                                user?.email &&
                                                <div className='py-1 bg-gradient-to-r from-violet-900 to-pink-900 px-8 rounded-md lg:hidden block transition ease-in-out delay-150 hover:-translate-y-2  duration-300 animate-pulse'>
                                                    <h1 className='text-center flex justify-start text-xl text-white'>Hi, {user?.email}</h1>
                                                </div>
                                            }

                                            <li>
                                                <NavLink
                                                    to="/addTasks"
                                                    className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                                                >
                                                    Add Task
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/myTasks"
                                                    className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                                                >
                                                    My Tasks
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink
                                                    to="/displayCompletedTasks"
                                                    className="font-medium tracking-wide text-white transition-colors duration-200 hover:text-deep-purple-accent-400"
                                                >
                                                    Completed Tasks
                                                </NavLink>
                                            </li>

                                            {
                                                user?.email ?
                                                    <div>
                                                        <Link
                                                            onClick={handleLogoutUser}
                                                            className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white  rounded shadow-md bg-purple-800 " title="Log Out"
                                                        >
                                                            Logout
                                                        </Link>

                                                    </div>
                                                    :
                                                    <div>
                                                        <Link
                                                            to="/login"
                                                            className="w-full inline-flex items-center justify-center h-10 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-800  focus:shadow-outline focus:outline-none mr-4 mb-4" title="Login"
                                                        >
                                                            Login
                                                        </Link>

                                                        <Link
                                                            to="/signup"
                                                            className="w-full inline-flex items-center justify-center h-10 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-700 focus:shadow-outline focus:outline-none" title="Sign Up"
                                                        >
                                                            Sign Up
                                                        </Link>
                                                    </div>
                                            }
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header1;