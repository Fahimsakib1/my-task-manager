import logo from './logo.svg';
import './App.css';
import Header from './components/Shared/Header/Header';
import Header1 from './components/Shared/Header/Header1';
import AddTask from './components/AddTask/AddTask';
import { RouterProvider } from 'react-router-dom';
import router from './components/Router/Router/Router';
import { Toaster } from 'react-hot-toast';


function App() {
  return (
    <div className=''>
      <RouterProvider router ={router}>
      </RouterProvider>
      <Toaster></Toaster>
    </div>
  );
}

export default App;
