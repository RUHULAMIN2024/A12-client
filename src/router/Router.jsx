import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../layout/Dashboard";
import Profile from "../pages/Profile";
import AddPost from "../pages/AddPost";
import MyPost from "../pages/MyPost";
import PrivetRoute from "./PrivetRoute";
import Membership from "../pages/Membership";



const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      errorElement:<ErrorPage></ErrorPage>,
      children:[
        {
          path:"/",
          element:<Home></Home>,
        },
        {
          path:"/login",
          element:<Login></Login>,
        },
        {
          path:"/register",
          element:<Register></Register>,
        },
        {
          path:"/membership",
          element:<Membership></Membership>,
        },
        {
          path:"dashboard",
          element:<PrivetRoute><Dashboard></Dashboard></PrivetRoute>,
          children:[
            {
              path:"my-profile",
              element:<Profile></Profile>,
            },
            {
              path:"add-post",
              element:<AddPost></AddPost>,
            },
            {
              path:"my-post",
              element:<MyPost></MyPost>,
            },
            {
              path:"admin-profile",
              element:<MyPost></MyPost>,
            },
            {
              path:"manage-users",
              element:<MyPost></MyPost>,
            },
            {
              path:"reported--activities",
              element:<MyPost></MyPost>,
            },
            {
              path:"make-announcement",
              element:<MyPost></MyPost>,
            },
          ]
        },
        
         
      
        
      ]
    },
  ])

  export default router;