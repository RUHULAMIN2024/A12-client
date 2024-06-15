import { Helmet } from "react-helmet-async";
import Banner from "../../components/banner/Banner";
import Tags from "../../components/tags/Tags";

const Home = () => {
  return (
    <div className="container mx-auto">
      <Helmet>
        <title>Connect Sphere | Home</title>
      </Helmet>
      <Banner></Banner>
      <Tags></Tags>
    </div>
  );
};

export default Home;
