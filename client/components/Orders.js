import React, { useEffect } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrdersAsync, selectOrders } from "../features/ordersSlice";

const Orders = () => {
  const user = useSelector((state) => state.auth.me);
  const orders = useSelector(selectOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrdersAsync(user.id));
  }, [dispatch]);

  return (
    <div id="orders-page">
      <h3>Order History</h3>
      <div id="order-history-container">
        
        {orders && orders.length ? orders.map((order) => 
          <div key={`order #${order.invoiceId}`}>
            <Link 
            to={`/account/orders/${order.orderId}`} 
            className="link" 
            >
              <div className="single-order-container">
                <div className="single-order-detail">
                  <h5 className="single-order-detail-row">Invoice #</h5>
                  <p className="single-order-detail-row">{order.invoiceId}</p>
                </div>
                <div className="single-order-detail">
                  <h5 className="single-order-detail-row">Sent to</h5>
                  <p className="single-order-detail-row">{user.firstName} {user.lastName}</p>
                </div>
                <div className="single-order-detail">
                  <h5 className="single-order-detail-row">Total</h5>
                  <p className="single-order-detail-row">${order.total ? order.total : 'FREE.99'}</p>
                </div>
                <div className="single-order-detail">
                  <p className="single-order-detail-row">
                    Placed on {order.orderDate.slice(0, 10)}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ) : 
          <div className="single-order-detail">
            <h4>No recent orders.</h4>
            <p>You have not placed any orders yet.</p>
          </div>
        }

      </div>
    </div>
  )
}

export default Orders;