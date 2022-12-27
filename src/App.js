import logo from './logo.svg';
import './App.css';
import Header from './components/Shared/Header/Header';
import Header1 from './components/Shared/Header/Header1';
import AddTask from './components/AddTask/AddTask';
import { RouterProvider } from 'react-router-dom';
import router from './components/Router/Router/Router';


function App() {
  return (
    <div className="App">
      <RouterProvider router ={router}>

      </RouterProvider>
    </div>
  );
}

export default App;
