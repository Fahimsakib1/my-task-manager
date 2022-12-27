import { createBrowserRouter } from "react-router-dom";
import AddTask from "../../AddTask/AddTask";
import CompletedTasks from "../../CompletedTasks/CompletedTasks";
import Home from "../../Home/Home/Home";
import Main from "../../Layout/Main";
import Login from "../../Login/Login";
import MyTasks from "../../MyTasks/MyTasks";
import Signup from "../../Signup/Signup";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },

            {
                path: '/addTasks',
                element: <AddTask></AddTask>
            },

            {
                path: '/myTasks',
                element: <MyTasks></MyTasks>
            },

            {
                path:'/completedTasks',
                element: <CompletedTasks></CompletedTasks>
            },

            {
                path: '/login',
                element: <Login></Login>
            },

            {
                path: '/signup',
                element: <Signup></Signup>
            }
        ]
    }
])

export default router;