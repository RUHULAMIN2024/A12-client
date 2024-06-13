import { NavLink, Outlet } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdPostAdd } from "react-icons/md";
import { MdLocalActivity } from "react-icons/md";


const Dashboard = () => {
    return (
        <div className="flex gap-5"> 
            <div className="w-64 p-4 min-h-[calc(100vh-368px)] bg-orange-400">
                <ul>
                    <li className="flex items-center space-x-1">
                        <CgProfile />
                        <NavLink to="/dashboard/my-profile">My Profile</NavLink>
                    </li>
                    <li className="flex items-center space-x-1">
                        <MdPostAdd />
                        <NavLink to="/dashboard/add-post">Add Post</NavLink></li>
                    <li className="flex items-center space-x-1">
                        <MdLocalActivity />
                        <NavLink to="/dashboard/my-post">My Posts</NavLink></li>
                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Dashboard;