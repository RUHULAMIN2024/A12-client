import { Helmet } from "react-helmet-async";
import Annoucements from "../../components/annoucements/Annoucements";
import Banner from "../../components/banner/Banner";
import MainPost from "../../components/main_post/MainPost";
import Tags from "../../components/tags/Tags";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Connect Sphere | Home</title>
      </Helmet>
      <Banner></Banner>
      <Tags></Tags>
      <Annoucements></Annoucements>
      <MainPost></MainPost>
    </>
  );
};

export default Home;
