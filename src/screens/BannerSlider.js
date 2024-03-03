import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import AddSliders from "../components/AddSliders";

const BannerSlider = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <AddSliders />
      </main>
    </>
  );
};

export default BannerSlider;