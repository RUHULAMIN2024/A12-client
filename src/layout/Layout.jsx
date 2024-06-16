import { Outlet } from "react-router-dom";

import Footer from "./../components/footer/Footer";
import Nav from "./../components/header/Nav";
const Layout = () => {
  return (
    <>
      <Nav></Nav>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default Layout;
