import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";

const Home = () => {
    return (
        <div className="container mx-auto">
            <Helmet><title>Connect Sphere | Home</title></Helmet>
            <Banner></Banner>

        </div>
    );
};

export default Home;