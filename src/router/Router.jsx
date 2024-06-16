import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import ErrorPage from "../pages/error/ErrorPage";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Membership from "../pages/membership/Membership";
import PostDetailes from "../pages/post_detailes/PostDetailes";
import Register from "../pages/register/Register";
import PrivetRoute from "./PrivetRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout></Layout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/membership",
        element: (
          <PrivetRoute>
            <Membership></Membership>
          </PrivetRoute>
        ),
      },
      {
        path: "/post/:id",
        element: (
          <PrivetRoute>
            <PostDetailes></PostDetailes>
          </PrivetRoute>
        ),
      },
      // {
      //   path: "dashboard",
      //   element: (
      //     <PrivetRoute>
      //       <Dashboard></Dashboard>
      //     </PrivetRoute>
      //   ),
      //   children: [
      //     {
      //       path: "my-profile",
      //       element: <Profile></Profile>,
      //     },
      //     {
      //       path: "add-post",
      //       element: <AddPost></AddPost>,
      //     },
      //     {
      //       path: "my-post",
      //       element: <MyPost></MyPost>,
      //     },
      //     {
      //       path: "admin-profile",
      //       element: <MyPost></MyPost>,
      //     },
      //     {
      //       path: "manage-users",
      //       element: <MyPost></MyPost>,
      //     },
      //     {
      //       path: "reported--activities",
      //       element: <MyPost></MyPost>,
      //     },
      //     {
      //       path: "make-announcement",
      //       element: <MyPost></MyPost>,
      //     },
      //   ],
      // },
    ],
  },
]);

export default router;
