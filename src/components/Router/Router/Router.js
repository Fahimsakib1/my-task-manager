import { createBrowserRouter } from "react-router-dom";
import AddTask from "../../AddTask/AddTask";
import CompletedTasks from "../../CompletedTasks/CompletedTasks";
import DisplayCompletedTasks from "../../DisplayCompletedTasks/DisplayCompletedTasks";
import Home from "../../Home/Home/Home";
import Main from "../../Layout/Main";
import Login from "../../Login/Login";
import MyTasks from "../../MyTasks/MyTasks";
import Signup from "../../Signup/Signup";
import UpdateTask from "../../UpdateTask/UpdateTask";
import ViewComments from "../../ViewComments/ViewComments";
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
                path:'/displayCompletedTasks',
                element: <PrivateRoute><DisplayCompletedTasks></DisplayCompletedTasks></PrivateRoute>
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
                loader: ({params}) => fetch(`https://task-manager-server-silk.vercel.app/task/${params.id}`),
                element: <UpdateTask></UpdateTask>
            },

            {
                path: '/completeTask/:id',
                loader: ({params}) => fetch(`https://task-manager-server-silk.vercel.app/task/${params.id}`),
                element: <CompletedTasks></CompletedTasks>
            },

            {
                path: '/comments/:id',
                loader: ({params}) => fetch(`https://task-manager-server-silk.vercel.app/comments/${params.id}`),
                element: <ViewComments></ViewComments>
            }
        ]
    }
])

export default router;