import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { MdDashboard } from "react-icons/md";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Nav from "../../components/header/Nav";

function Dashboard() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return (
    <>
      <Helmet>
        <title>Connect Sphere | Dashboard</title>
      </Helmet>
      <section>
        <Nav></Nav>
        <div className="container h-[calc(100vh-92px)] grid grid-cols-1 lg:grid-cols-4 gap-4 justify-between">
          <div className="col-span-1 border border-slate-300 p-3">
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
            </ul>
          </div>
          <div className="lg:col-span-3 border border-slate-300 p-3">
            <Outlet></Outlet>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard;
