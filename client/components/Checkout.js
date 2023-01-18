import React, { useState } from "react";

const Checkout = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  return (
    <div id="checkout-page">
      <div id="checkout-left-container" className="checkout-container">
        <div id="checkout-shipping-info" className="checkout-left-item">
          Shipping Address
          <br />
          <form>
            <label>Address</label>
            <input 
            type="text" 
            name="address" 
            value={address} 
            onChange={(e) => setAddress(e.target.value)}></input>
            <label>City</label>
            <input 
            type="text" 
            name="city" 
            value={city}
            onChange={(e) => setCity(e.target.value)}>
            </input>
            <label>State</label>
            <input
              type="text"
              pattern="[A-Za-z]{2}"
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            ></input>
            <label>Zip</label>
            <input
              type="number"
              pattern="[0-9]{5}"
              name="zip"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            ></input>
          </form>
          <br/>
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
  );
};

export default Checkout;
