import React from 'react';

const Checkout = () => {

  return (
    <div id="checkout-page">
      <div id="checkout-left-container" className="checkout-container">
        <div id="checkout-shipping-info" className="checkout-left-item">
          Shipping Info
        </div>
        <div id="checkout-cart-items" className="checkout-left-item">
          Checkout Items
        </div>
        <div id="checkout-payment-info" className="checkout-left-item">
          Payment Info
        </div>
      </div>
      <div id="checkout-right-container" className="checkout-container">
        <div id="checkout-place-order" className="checkout-right-item">
          Place Order
        </div>
      </div>
    </div>
  )
}

export default Checkout;