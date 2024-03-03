import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPrices, listPrices } from "../../Redux/Actions/PriceActions";
import  Toast  from ".././LoadingError/Toast";

const PriceUpdateForm = () => {
  const dispatch = useDispatch();
  const [shipping, setShipping] = useState("");
  const [tax, setTax] = useState("");

  // Fetch prices from the server when the component mounts
  useEffect(() => {
    dispatch(listPrices());
  }, [dispatch]);

  // Retrieve prices from the Redux store
  const taxes = useSelector((state) => state.taxSettings);
  const { price, loading, error } = taxes;

  // Populate input fields with fetched prices
  useEffect(() => {
    if (!loading && !error && price) {
      const getShipping = price?.passedPrice?.shipping;
      const getTax = price?.passedPrice?.tax;
      // Check for undefined values before setting state
      if (getShipping !== undefined) {
        setShipping(getShipping);
      }
      if (getTax !== undefined) {
        setTax(getTax);
      }
    }
  }, [price, loading, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Dispatch action to update prices
    dispatch(editPrices({ shipping, tax }));
  };

  return (
    <>
      <Toast />
      <form onSubmit={handleSubmit}>
        <div className="mb-3 mx-4 col-3">
          <label htmlFor="shipping" className="form-label">
            Shipping
          </label>
          <input
            type="number"
            className="form-control"
            id="shipping"
            value={shipping}
            onChange={(e) => setShipping(e.target.value)}
          />
        </div>
        <div className="mb-3 mx-4 col-3">
          <label htmlFor="tax" className="form-label">
            Tax
          </label>
          <input
            type="number"
            className="form-control"
            id="tax"
            value={tax}
            onChange={(e) => setTax(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary mx-4">
          Update Prices
        </button>
      </form>
    </>
  );
};

export default PriceUpdateForm;
