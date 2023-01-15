import logo from './logo.svg';
import './App.css';
import Header from './components/Shared/Header/Header';
import Header1 from './components/Shared/Header/Header1';
import AddTask from './components/AddTask/AddTask';
import { RouterProvider } from 'react-router-dom';
import router from './components/Router/Router/Router';
import { Toaster } from 'react-hot-toast';
import Cursor from 'react-cursor-follow';
import ProgressBar from "react-scroll-progress-bar";



function App() {
  return (
    <div className='dark:bg-black dark:text-white'>
      <ProgressBar bgcolor="#de8d12"/>
      <RouterProvider router={router}>
      </RouterProvider>
      <Toaster></Toaster>
      <Cursor
        pulse
        color='#4513d1'
        duration={0.3}
        size={40}
        opacity='0.6' >
      </Cursor>
    </div>
  );
}

export default App;
