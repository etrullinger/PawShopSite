import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCartAsync, selectCart } from "../features/cartSlice";
import { updateCartProductAsync } from "../features/cartProductSlice";
import { TextField, MenuItem, Button } from "@mui/material";

const Checkout = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);

  const userId = useSelector((state) => state.auth.me.id);
  const cart = useSelector(selectCart);

  const dispatch = useDispatch();

  const handleChange = async (userId, productId, quantity) => {
    await dispatch(updateCartProductAsync({ userId, productId, quantity}));
  }

  const handleRemove = async (userId, productId) => {
    await dispatch(removeFromCartAsync({ userId, productId }));
  }

  const calculateSubtotal = () => {
    var total = 0;
    for (var product of cart) {
      total += (Number(product.product.price)*product.quantity);
    }
    setSubtotal((Math.round(total*100)/100).toFixed(2));
  }

  const calculateTax = () => {
    var tax = 0;
    tax += (Number(subtotal) * 0.07);
    setTax((Math.round(tax*100)/100).toFixed(2));
  }

  const calculateTotal = () => {
    var total = 0;
    total += Number(subtotal);
    total += Number(tax);
    setOrderTotal((Math.round(total*100)/100).toFixed(2));
  }

  useEffect(() => {
    calculateSubtotal();
    calculateTax();
    calculateTotal();
  }, [handleChange, handleRemove])

  var quantityValues = [];
  for (var i = 0; i <= 50; i++) {
    quantityValues.push(i);
  }

  return (
    <div id="checkout-page">
      <div id="checkout-left-container" className="checkout-container">
        <div id="checkout-shipping-info" className="checkout-left-item">
          <b>Shipping Information</b>
          <br />
          <form className="checkout-form">
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
          <br />
          <div id="checkout-items-container">
            {cart && cart.length ? cart.map ((product) => 
              <div className="single-product-container checkout" key={`checkout-item: product #${product.productId}`}>
                <img 
                  className="single-product-image checkout" 
                  alt={product.product ? product.product.name : ""} 
                  src={product.product ? product.product.imageUrl : ""}
                />

                <div className="single-product-details checkout">
                  <h6>{product.product ? product.product.name : ""}</h6>
                  <p>${product.product ? product.product.price : ""}</p>

                  <TextField
                  name='quantity'
                  select
                  label="Quantity"
                  defaultValue={product.quantity}
                  helperText="Edit Quantity"
                  onChange={(evt) => evt.target.value === 0 ? 
                    handleRemove(userId, product.productId) :
                    handleChange(userId, product.productId, evt.target.value)}
                  >
                    {quantityValues.map((quantity) => (
                      <MenuItem 
                      key={`checkout product ${product.productId} quantity ${quantity}`} 
                      value={quantity}
                      >
                        {quantity}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              </div>
            ) : 
              <div>
                <p>No Items to Checkout</p>
              </div>
            }
          </div>
        </div>
        <div id="checkout-payment-info" className="checkout-left-item">
          <b>Payment Info</b>
          <br />
          <form className="checkout-form">
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

          <div id="checkout-order-summary" className="checkout-right-item-section">
            <h4>Order Summary</h4>
            <p>
              <span>Subtotal: </span>
              <span>${subtotal}</span>
            </p>
            <p>
              <span>Flat-Rate Shipping: </span>
              <span>FREE</span>
            </p>
            <p>
              <span>Estimated Tax: </span>
              <span>${tax}</span>
            </p>
            <hr style={{height: '2px'}} />
            <h4>
              <span>OrderTotal: </span>
              <span>${orderTotal}</span>
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
