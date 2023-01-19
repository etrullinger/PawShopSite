import React, { useState } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Checkout = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  return (
    <div id="checkout-page">
      <div id="checkout-left-container" className="checkout-container">
        <div id="checkout-shipping-info" className="checkout-left-item">
          <b>Shipping Information</b>
          <br />
          <form>
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="123 Main St"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label>City</label>
            <input
              type="text"
              name="city"
              value={city}
              placeholder="City name"
              onChange={(e) => setCity(e.target.value)}
            />
            <label>State</label>
            <input
              type="text"
              pattern="[A-Za-z]{2}"
              name="state"
              placeholder="AZ"
              value={state}
              maxLength="2"
              onChange={(e) => setState(e.target.value)}
            />
            <label>Zip</label>
            <input
              type="text"
              pattern="[0-9]{5}"
              name="zip"
              placeholder="12345"
              maxLength="5"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
          </form>
          <br />
        </div>
        <div id="checkout-cart-items" className="checkout-left-item">
          <b>Checkout Items</b>
        </div>
        <div id="checkout-payment-info" className="checkout-left-item">
          <b>Payment Info</b>
          <br />
          <form>
            Card Number:
            <input
              type="text"
              name="cardNumber"
              placeholder="1111 2222 3333 4444"
              maxLength="16"
            />
            <br/>
            Card Expiration:
            <select name="expireMM" id="expireMM">
              <option value="">Month</option>
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
            </select>
            <select name="expireYY" id="expireYY">
              <option value="">Year</option>
              <option value="23">2023</option>
              <option value="24">2024</option>
              <option value="25">2025</option>
              <option value="26">2026</option>
              <option value="27">2027</option>
            </select>
            <input type="hidden" name="expiry" id="expiry" maxLength="4" />
            <br/>
            CVC#
            <input type='text' name='cvc' size="5" placeholder='000' maxLength="3" />
          </form>
        </div>
      </div>
      <div id="checkout-right-container" className="checkout-container">
        <div id="checkout-place-order" className="checkout-right-item">
          <Button component={Link}
        to={`/order-complete`} variant="contained" type="submit">Place Order</Button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
