import React from "react";
import Sidebar from "./../components/sidebar";
import Header from "./../components/Header";
import MethodsPay from "../components/paymentMethods/MethodsPay";

const PayMethods = () => {
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <MethodsPay />
      </main>
    </>
  );
};

export default PayMethods;