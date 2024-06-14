import { NavLink, Outlet } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdPostAdd } from "react-icons/md";
import { MdLocalActivity } from "react-icons/md";
import { FaUsersBetweenLines } from "react-icons/fa6";
import { GrAnnounce } from "react-icons/gr";


const Dashboard = () => {


    const isAdmin = true;

    return (
        <div className="flex gap-5">
            <Helmet><title>Connect Sphere | Dashboard</title></Helmet>

            <div className="w-64 p-4 min-h-[calc(100vh-368px)] bg-orange-400">
                <ul>
                    {
                        isAdmin ? <>
                            <li className="flex items-center space-x-1">
                                <CgProfile />
                                <NavLink to="/dashboard/admin-profile" className={({ isActive }) => isActive ? 'text-white bg-primary py-2  px-3 rounded-md font-bold' : 'font-bold px-3 py-2'}>Admin Profile</NavLink>
                            </li>
                            <li className="flex items-center space-x-1">
                                <FaUsersBetweenLines />
                                <NavLink to="/dashboard/manage-users" className={({ isActive }) => isActive ? 'text-white bg-primary py-2  px-3 rounded-md font-bold' : 'font-bold px-3 py-2'}>Manage Users</NavLink></li>
                            <li className="flex items-center space-x-1">
                                <MdLocalActivity />
                                <NavLink to="/dashboard/reported--activities" className={({ isActive }) => isActive ? 'text-white bg-primary py-2  px-3 rounded-md font-bold' : 'font-bold px-3 py-2'}>Reported Activities</NavLink></li>
                            <li className="flex items-center space-x-1">
                                <GrAnnounce />
                                <NavLink to="/dashboard/make-announcement" className={({ isActive }) => isActive ? 'text-white bg-primary py-2  px-3 rounded-md font-bold' : 'font-bold px-3 py-2'}>Make Announcement</NavLink></li>
                        </> : <>
                            <li className="flex items-center space-x-1">
                                <CgProfile />
                                <NavLink to="/dashboard/my-profile" className={({ isActive }) => isActive ? 'text-white bg-primary py-2  px-3 rounded-md font-bold' : 'font-bold px-3 py-2'}>My Profile</NavLink>
                            </li>
                            <li className="flex items-center space-x-1">
                                <MdPostAdd />
                                <NavLink to="/dashboard/add-post" className={({ isActive }) => isActive ? 'text-white bg-primary py-2  px-3 rounded-md font-bold' : 'font-bold px-3 py-2'}>Add Post</NavLink></li>
                            <li className="flex items-center space-x-1">
                                <MdLocalActivity />
                                <NavLink to="/dashboard/my-post" className={({ isActive }) => isActive ? 'text-white bg-primary py-2  px-3 rounded-md font-bold' : 'font-bold px-3 py-2'}>My Posts</NavLink></li>
                        </>
                    }
                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Dashboard;