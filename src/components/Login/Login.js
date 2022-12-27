import React, { useContext, useState } from 'react';
import { FcGoogle } from 'react-icons/fc'
import image from '../../images/LoginImage/signup-nobg.png';
import { BsEye } from 'react-icons/bs';
import { BsEyeSlash } from 'react-icons/bs';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthProvider/AuthProvider';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import SmallSpinner from '../Spinner/SmallSpinner/SmallSpinner';


const Login = () => {

    const { userLogin, googleSignIn, loading, setLoading } = useContext(AuthContext)

    const [loginError, setLoginError] = useState('')

    const { register, handleSubmit, reset, formState: { errors } } = useForm();


    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';

    //visible the password
    const [visiblePassword, setVisiblePassword] = useState(false);

    const handleLogin = (data) => {
        console.log(data);
        setLoginError('');
        userLogin(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log("User From Login Page", user);
                toast.success('Login Successful');
                navigate(from, { replace: true });
                reset();
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Login Failed.. Try Again',
                })
                setLoading(false)
                setLoginError(error.message)
            })
    }

    const handleSignInByGoogle = () => {

    }


    return (
        <div>
            <div className='flex-col lg:flex-row-reverse grid md:grid-cols-1'>

                <div
                    className="text-center lg:text-left">
                    <img className='w-full mt-4' src={image} alt="" />
                </div>

                <div className='mt-4 flex justify-center items-center  '>
                    <div className='p-6 border-2 rounded-xl  w-full max-w-md shadow-2xl  sm:w-3/4  lg:w-full md:w-full  mx-2 sm:mx-2 md:mx-2 lg:mx-0'>
                        <h2 className='text-2xl text-center font-bold uppercase'>Login</h2>

                        <form onSubmit={handleSubmit(handleLogin)}>


                            <div className="form-control w-full mb-1">
                                <label className="label">
                                    <span className="label-text font-semibold">Email</span>
                                </label>

                                <input type="email" {...register("email", { required: "Email is Required" })}
                                    placeholder="Enter Email" className="w-full rounded-md focus:ring focus:ring-violet-400 border-2 border-gray-400 px-4 py-2 mt-2 mb-2 text-black " />

                                {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}

                            </div>


                            <div className='flex justify-between items-center gap-x-6'>
                                <div className="form-control w-full mb-1 -mt-2">
                                    <label className="label">
                                        <span className="label-text font-semibold ">Password</span>
                                    </label>

                                    <div className='flex justify-between'>
                                        <input type={visiblePassword ? 'text' : 'password'} {...register("password", {
                                            required: "Password is Required",
                                            minLength: { value: 6, message: 'Password must be at least 6 characters or longer' },

                                        })} placeholder="Enter Password" className="w-full rounded-md focus:ring focus:ring-violet-400 border-2 border-gray-400 px-4 py-2 mt-2  text-black " />


                                        <div className='flex justify-end mt-6 -ml-16 mr-4'>
                                            {
                                                !visiblePassword ?
                                                    <BsEyeSlash onClick={() => setVisiblePassword(!visiblePassword)} className='text-black'></BsEyeSlash>
                                                    :
                                                    <BsEye onClick={() => setVisiblePassword(!visiblePassword)} className='text-black'></BsEye>
                                            }
                                        </div>
                                    </div>


                                    {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}

                                </div>

                            </div>

                            {
                                loginError && <p className='text-red-600'>{loginError}</p>
                            }


                            <button type='submit' className='w-full py-[10px] font-semibold rounded bg-violet-800 hover:bg-violet-800 text-white mt-4'>
                                {loading ? <SmallSpinner></SmallSpinner> : 'Login'}
                            </button>

                        </form>

                        <div className='mt-3'>
                            <p className='text-sm text-center font-semibold'>New To The Website ? <Link to='/signup' className='text-blue-600 font-semibold'>Please Sign Up</Link></p>
                        </div>

                        <hr className='my-4'></hr>

                        <div className='mt-2'>
                            <button onClick={handleSignInByGoogle} className='text-white bg-gray-800 uppercase w-full rounded-lg'>
                                <div className='flex justify-center items-center py-2'>
                                    <FcGoogle className='text-2xl mr-2'></FcGoogle>
                                    <h1>Google Log In</h1>
                                </div>
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;