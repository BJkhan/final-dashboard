import React, { useState, useEffect } from 'react';
import { toast } from "react-toastify";
import Toast from "./../LoadingError/Toast";

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };

const MethodsPay = () => {
  const [paymentOptions, setPaymentOptions] = useState([]);

  useEffect(() => {
    const fetchPaymentOptions = async () => {
      try {
        const response = await fetch("api/api/paymentOptions");
        const data = await response.json();
        setPaymentOptions(data.payOptions);
      } catch (error) {
        console.error("Error fetching payment options:", error);
      }
    };
    fetchPaymentOptions();
  }, []);

  const togglePaymentOption = async (id) => {
    try {
      await fetch(`api/api/paymentOptions/${id}/toggle`, {
        method: "PUT",
      });
      const response = await fetch("api/api/paymentOptions");
      const data = await response.json();
      setPaymentOptions(data.payOptions);
    } catch (error) {
      console.error("Error toggling payment option:", error);
    }
  };
  const showToast = ()=>{
    toast.success("Payment Method Updated", ToastObjects);
  }
  return (
    <>
      <Toast />  
      <div className="container mt-4">
        <h2>Payment Options Dashboard</h2>
        <p>Checked boxes ensure that payment options are active </p>
        {paymentOptions.map((option) => (
          <div key={option._id} className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              checked={option.isActive}
              onChange={() => togglePaymentOption(option._id)}
            />
            <label className="form-check-label ml-2">{option.name}</label>
          </div>
        ))}
        <button type="button" onClick={showToast} class="btn btn-success mt-4">Save Payment Methods</button>
      </div>
    </>
  );
};


export default MethodsPay;
