import React, { useState } from "react";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Orders from "./Orders";
import { useDispatch, useSelector } from "react-redux";
import { listOrders } from "../../Redux/Actions/OrderActions";

const OrderMain = () => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [limit, setLimit] = useState(20); // Default limit is 20

  // Refresh Orders
  const refreshOrders = () => {
    setSelectedStatus("All");
    setSearchQuery("")
    dispatch(listOrders());
  };

  // Search Orders
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filterOrdersBySearch = () => {
    return orders.filter((order) =>
    order._id && order._id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  };

  // Fitler Orders
  const handleChange = (e) => {
    setSelectedStatus(e.target.value);
  };
  // Filter Orders
  const filterOrdersByStatus = (status) => {
    if (status === "All") {
      return orders;
    } else {
      return orders.filter((order) => order.orderStatus === status);
    }
  };

  // Limit order to show
  // Set Limit
  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value)); // Convert value to integer
  };
  return (
    <section className="content-main">
      <div className="content-header">
        <h2 className="content-title">Orders</h2>
      </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
                type="text"
                placeholder="Search by Order Id..."
                className="form-control p-2"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
              <select
                className="form-select"
                value={selectedStatus}
                onChange={handleChange}
              >
                <option>All</option>
                <option>Awaiting Payment</option>
                <option>Confirmed</option>
                <option>Shipped</option>
                <option>Delivered</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
            <select
                className="form-select"
                value={limit}
                onChange={handleLimitChange}
              >
                <option value={20}>Show 20</option>
                <option value={40}>Show 40</option>
                <option value={80}>Show 80</option>
              </select>
            </div>
            <div className="col-1">
              <button
                onClick={refreshOrders}
                type="button"
                className="btn btn-primary "
              >
                <i className="fas fa-sync-alt"></i>
              </button>
            </div>
          </div>
        </header>
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              // <Orders orders={filterOrdersByStatus(selectedStatus)} />
              <Orders
                orders={
                  selectedStatus === "All"
                    ? filterOrdersBySearch().slice(0, limit)
                    : filterOrdersByStatus(selectedStatus).slice(0, limit)
                }
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderMain;
