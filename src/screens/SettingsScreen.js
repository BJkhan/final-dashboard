import React from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import PriceUpdateForm from "../components/priceSettings/PriceSetting"
const Settings = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <PriceUpdateForm></PriceUpdateForm>
      </main>
    </>
  );
};

export default Settings;