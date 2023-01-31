import React from "react";
import HomeCard from "./HomeCard";
import HomeCarousel from "./HomeCarousel";
import HomeMenu from "./HomeMenu";

const Home = () => {
  return (
    <div className="overflow-hidden">
      <HomeCarousel />
      <HomeCard />
      <HomeMenu />
    </div>
  );
};

export default Home;
