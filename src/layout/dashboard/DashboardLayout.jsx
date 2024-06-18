import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { CgPlayListAdd } from "react-icons/cg";
import { GrUserAdmin } from "react-icons/gr";
import { ImProfile } from "react-icons/im";
import { MdDashboard, MdOutlineManageAccounts } from "react-icons/md";
import { SiApostrophe } from "react-icons/si";
import { TfiAnnouncement } from "react-icons/tfi";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Nav from "../../components/header/Nav";
import useAdminRole from "../../hooks/useAdminRole";

function Dashboard() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  const [isAdminRole] = useAdminRole();

  return (
    <>
      <Helmet>
        <title>Connect Sphere | Dashboard</title>
      </Helmet>
      <section>
        <Nav></Nav>
        <div className="container h-[calc(100vh-92px)] grid grid-cols-1 lg:grid-cols-4 gap-4 justify-between">
          <div className="static lg:top-[72px] lg:sticky lg:z-[999999] col-span-1 h-fit border border-slate-300 p-3">
            <ul className=" text-slate-600 font-medium space-y-3">
              <li className="flex items-center gap-2">
                <MdDashboard></MdDashboard>
                <NavLink
                  className={({ isActive }) => (isActive ? "text-primary" : "")}
                  to={"/dashboard"}
                >
                  Dashboard
                </NavLink>
              </li>

              {isAdminRole ? (
                <>
                  <li className="flex items-center gap-2">
                    <GrUserAdmin></GrUserAdmin>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "text-primary" : ""
                      }
                      to={"/dashboard/admin-profile"}
                    >
                      Admin Profile
                    </NavLink>
                  </li>{" "}
                  <li className="flex items-center gap-2">
                    <MdOutlineManageAccounts></MdOutlineManageAccounts>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "text-primary" : ""
                      }
                      to={"/dashboard/manage-users"}
                    >
                      Manage Users
                    </NavLink>
                  </li>{" "}
                  <li className="flex items-center gap-2">
                    <MdDashboard></MdDashboard>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "text-primary" : ""
                      }
                      to={"/dashboard/activities"}
                    >
                      Activities
                    </NavLink>
                  </li>
                  <li className="flex items-center gap-2">
                    <TfiAnnouncement></TfiAnnouncement>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "text-primary" : ""
                      }
                      to={"/dashboard/announcements"}
                    >
                      Make Announcement
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center gap-2">
                    <ImProfile></ImProfile>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "text-primary" : ""
                      }
                      to={"/dashboard/my-profile"}
                    >
                      My Profile
                    </NavLink>
                  </li>{" "}
                  <li className="flex items-center gap-2">
                    <CgPlayListAdd></CgPlayListAdd>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "text-primary" : ""
                      }
                      to={"/dashboard/add-post"}
                    >
                      Add Post
                    </NavLink>
                  </li>{" "}
                  <li className="flex items-center gap-2">
                    <SiApostrophe></SiApostrophe>
                    <NavLink
                      className={({ isActive }) =>
                        isActive ? "text-primary" : ""
                      }
                      to={"/dashboard/my-post"}
                    >
                      My Post
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="lg:col-span-3 h-fit border border-slate-300 p-3">
            <Outlet></Outlet>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
