import React from "react";
import Navbar from "./navbar";
import Hero from "./hero";
import Features from "./features";
import Appstats from "./appstats";
import Reviews from "./reviews";
import Footer from "./footer";

const Homepage = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Hero />
      <Features />
      <Appstats />
      {/* < Reviews /> */}
      <Footer />
    </React.Fragment>
  );
};

export default Homepage;
