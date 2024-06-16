import { createBrowserRouter } from "react-router-dom";
import AdminProfile from "../dashboard/admin/AdminProfile";
import AddPost from "../dashboard/user/AddPost";
import MyPost from "../dashboard/user/MyPost";
import Layout from "../layout/Layout";
import Dashboard from "../layout/dashboard/Dashboard";
import DashboardLayout from "../layout/dashboard/DashboardLayout";
import ForumComments from "../pages/comments/ForumComments";
import ErrorPage from "../pages/error/ErrorPage";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Membership from "../pages/membership/Membership";
import PostDetailes from "../pages/post_detailes/PostDetailes";
import Register from "../pages/register/Register";
import Activities from "./../dashboard/admin/Activities";
import Annoucements from "./../dashboard/admin/Annoucements";
import ManageUsers from "./../dashboard/admin/ManageUsers";
import MyProfile from "./../dashboard/user/MyProfile";
import AdminRoleRoute from "./AdminRoleRoute";
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
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRoute>
        <DashboardLayout></DashboardLayout>
      </PrivetRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard></Dashboard>,
      },
      {
        path: "my-profile",
        element: (
          <PrivetRoute>
            <MyProfile></MyProfile>
          </PrivetRoute>
        ),
      },
      {
        path: "add-post",
        element: (
          <PrivetRoute>
            <AddPost></AddPost>
          </PrivetRoute>
        ),
      },
      {
        path: "my-post",
        element: (
          <PrivetRoute>
            <MyPost></MyPost>
          </PrivetRoute>
        ),
      },
      {
        path: "comments/:id",
        element: (
          <PrivetRoute>
            <ForumComments></ForumComments>
          </PrivetRoute>
        ),
      },
      {
        path: "admin-profile",
        element: (
          <AdminRoleRoute>
            <AdminProfile></AdminProfile>
          </AdminRoleRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminRoleRoute>
            <ManageUsers></ManageUsers>
          </AdminRoleRoute>
        ),
      },
      {
        path: "activities",
        element: (
          <AdminRoleRoute>
            <Activities></Activities>
          </AdminRoleRoute>
        ),
      },
      {
        path: "announcements",
        element: (
          <AdminRoleRoute>
            <Annoucements></Annoucements>
          </AdminRoleRoute>
        ),
      },
    ],
  },
]);

export default router;
