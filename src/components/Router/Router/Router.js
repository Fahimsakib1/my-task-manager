import { createBrowserRouter } from "react-router-dom";
import AddTask from "../../AddTask/AddTask";
import CompletedTasks from "../../CompletedTasks/CompletedTasks";
import Home from "../../Home/Home/Home";
import Main from "../../Layout/Main";
import Login from "../../Login/Login";
import MyTasks from "../../MyTasks/MyTasks";
import Signup from "../../Signup/Signup";
import UpdateTask from "../../UpdateTask/UpdateTask";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

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
                element: <PrivateRoute><MyTasks></MyTasks></PrivateRoute>
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
            },

            {
                path: '/task/:id',
                loader: ({params}) => fetch(`http://localhost:5000/task/${params.id}`),
                element: <UpdateTask></UpdateTask>
            }
        ]
    }
])

export default router;