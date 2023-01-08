import React from 'react';
import { FaGithub, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from 'react-router-dom';



const Footer = () => {
    return (
        <div className='print:hidden'>

            <footer className="footer mt-72 px-16 py-3 border-t bg-black text-white border-base-300 dark:bg-gray-900">

                <div className="text-center mt-4">
                    <Link to='/'>
                        <p ><span className='text-4xl text-amber-600 text-center font-semibold font-serif tracking-wider'>DAILY TASKS</span><br /><span className='text-md text-gray-400'>Your Best Choice For Task Management Since 2018</span></p>
                    </Link>
                </div>

                <div className="md:place-self-center md:justify-self-end mt-6">
                    <div className=" flex justify-center items-center gap-x-4">

                        <a href='https://www.facebook.com/fahim.sakib.5' className='facebook-icon' title="Facebook" target="blank"><FaFacebook className='text-3xl hover:text-blue-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300'></FaFacebook></a>

                        <a href='https://www.instagram.com/i_fahiim/' className='instagram-icon ' title="Instagram" target="blank"  ><FaInstagram className='text-3xl hover:text-red-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300'></FaInstagram></a>

                        <a href='https://www.linkedin.com/in/fahim-sakib-57029518b/' className=' linkedin-icon' title="LinkedIn" target="blank" ><FaLinkedin className='text-3xl hover:text-blue-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300'></FaLinkedin></a>

                        <a href='https://github.com/Fahimsakib1' className='github-icon' title="GitHub" target="blank" ><FaGithub className='text-3xl hover:text-black hover:bg-white hover:rounded-full border-0 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300'></FaGithub></a>

                    </div>
                </div>
            </footer>

            <div className="text-sm text-center text-gray-400 bg-black pb-4 dark:bg-gray-900">© 2022 Daily Tasks. All Rights Reserved By Fahim Faysal
            </div>


        </div>
    );
};

export default Footer;