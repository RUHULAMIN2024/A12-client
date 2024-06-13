import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Nav from "../components/Nav";


const Layout = () => {
    return (
        <div>
            <Nav></Nav>
            <div className="flex items-center container mx-auto min-h-[calc(100vh-368px)]">
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Layout;