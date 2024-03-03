import React, { useEffect, useState } from "react";
import OrderDetailProducts from "./OrderDetailProducts";
import OrderDetailInfo from "./OrderDetailInfo";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  changeOrderStatus,
  deliverOrder,
  getOrderDetails,
} from "../../Redux/Actions/OrderActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";
import moment from "moment";

const OrderDetailmain = (props) => {
  const [orderStatus, setOrderStatus] = useState('Order received');
  const { orderId } = props;
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { loading, error, order } = orderDetails;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDelivered, success: successDelivered } = orderDeliver;

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId, successDelivered]);

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };
  const handleStatusChange = (e) => {
    setOrderStatus(e.target.value);
  };
  const saveOrderStatus = () => {
    dispatch(changeOrderStatus(order, orderStatus))
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="content-main">
      {/* Exclude from print */}
      <div className="content-header">
        <Link to="/orders" className="btn btn-dark text-white print-exclude">
          Back To Orders
        </Link>
        <button onClick={handlePrint} className="btn btn-secondary ms-2 print-exclude">
          Print
        </button>
      </div>

      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="card">
          <header className="card-header p-3 Header-green">
            <div className="row align-items-center ">
              <div className="col-lg-6 col-md-6">
                <span>
                  <i className="far fa-calendar-alt mx-2"></i>
                  <b className="text-white">
                    {moment(order.createdAt).format("llll")}
                  </b>
                </span>
                <br />
                <small className="text-white mx-3 ">
                  Order ID: {order._id}
                </small>
              </div>
              <div className="col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center">
                <h5 className="text-white mx-3 mt-2">
                  {" "}
                  <span class="badge bg-success">{order.orderStatus}</span>
                </h5>
                <select
                  className="form-select d-inline-block"
                  style={{ maxWidth: "200px" }}
                  value={orderStatus}
                  onChange={handleStatusChange}
                >
                  <option>Change Status</option>
                  <option>Awaiting payment</option>
                  <option>Confirmed</option>
                  <option>Shipped</option>
                </select>
                {order.isDelivered ? (
                  <></>
                ) : (
                  <button
                    onClick={saveOrderStatus}
                    className="btn btn-success ms-2"
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </header>
          <div className="card-body">
            {/* Order info */}
            <OrderDetailInfo order={order} />
            <div className="row">
              <div className="col-lg-9 col-12">
                <div className="table-responsive">
                  <OrderDetailProducts order={order} loading={loading} />
                </div>
              </div>
              {/* Payment Info */}
              <div className="col-lg-3 col-12">
                <div className="box shadow-sm bg-light">
                  {order.isDelivered ? (
                    <button className="btn btn-success col-12">
                      DELIVERED AT (
                      {moment(order.isDeliveredAt).format("MMM Do YY")})
                    </button>
                  ) : order.isPaid ? (
                    <>
                      {loadingDelivered && <Loading />}
                      <button
                        onClick={deliverHandler}
                        className="btn btn-dark col-12"
                      >
                        MARK AS DELIVERED
                      </button>
                    </>
                  ) : (
                    <h6 className="text-center">Payment Due</h6>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default OrderDetailmain;
