import { useContext } from "react";
import { HiOutlineLogout } from "react-icons/hi";
import { IoMdHome } from "react-icons/io";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../AuthProvider/AuthProvider";

function Dashboard() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  return (
    <>
      <ul className="w-full font-medium space-y-3 text-slate-600 ">
        <li className="flex items-center gap-2">
          <IoMdHome></IoMdHome>
          <NavLink
            className={({ isActive }) => (isActive ? "text-primary" : "")}
            to={"/"}
          >
            Home
          </NavLink>
        </li>
        <li className="flex items-center gap-2">
          <HiOutlineLogout></HiOutlineLogout>
          <button
            onClick={() => {
              logout()
                .then(() => {
                  navigate("/");
                  toast.success("Logout success");
                })
                .catch(() => {
                  toast.error("An error occurred!");
                });
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </>
  );
}

export default Dashboard;
