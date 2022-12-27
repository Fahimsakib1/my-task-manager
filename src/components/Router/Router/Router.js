import { createBrowserRouter } from "react-router-dom";
import AddTask from "../../AddTask/AddTask";
import CompletedTasks from "../../CompletedTasks/CompletedTasks";
import Home from "../../Home/Home/Home";
import Main from "../../Layout/Main";
import MyTasks from "../../MyTasks/MyTasks";

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
            }
        ]
    }
])

export default router;