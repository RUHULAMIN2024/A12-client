import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Annoucements from "../../components/annoucements/Annoucements";
import Banner from "../../components/banner/Banner";
import MainPost from "../../components/main_post/MainPost";
import Tags from "../../components/tags/Tags";

const Home = () => {
  const [bannerSearchTag, setBannerSearchTag] = useState("");
  return (
    <>
      <Helmet>
        <title>Connect Sphere | Home</title>
      </Helmet>
      <Banner setBannerSearchTag={setBannerSearchTag}></Banner>
      <Tags></Tags>
      <Annoucements></Annoucements>
      <MainPost
        setBannerSearchTag={setBannerSearchTag}
        bannerSearchTag={bannerSearchTag}
      ></MainPost>
    </>
  );
};

export default Home;
