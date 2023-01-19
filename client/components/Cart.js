import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCartAsync, selectCart, removeFromCartAsync } from '../features/cartSlice';
import { updateCartProductAsync } from '../features/cartProductSlice';
import { TextField, MenuItem, Button } from "@mui/material";

const Cart = (props) => {
  const cart = useSelector(selectCart); // array of user's cart products [{quantity, productId, userId}]
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartAsync(props.userId));
  }, [dispatch]);

  const handleChange = async (userId, productId, quantity) => {
    await dispatch(updateCartProductAsync({ userId, productId, quantity}));
  }

  const handleRemove = async (userId, productId) => {
    await dispatch(removeFromCartAsync({ userId, productId }));
  }

  var quantityValues = [];
  for (var i = 1; i <= 50; i++) {
    quantityValues.push(i);
  }

  return (
    <div id="cart-page">
      <h3>Shopping Cart</h3>
      <div id="cart-products-container">
      {cart && cart.length ? cart.map((product) => 
        <div
        className="single-product-container" 
        key={`cart${props.userId}: product #${product.productId}`}>
    
          <Link to={`/account/cart/${product.productId}`}>
            <img 
              className="single-product-image" 
              alt={product.product ? product.product.name : ""} 
              src={product.product ? product.product.imageUrl : ""} 
            />
          </Link>

          <div className="single-product-details">
            <h3>{product.product ? product.product.name : ""}</h3>
            <p>{product.product ? product.product.description : ""}</p>
            <p>${product.product ? product.product.price : '$0.00'}</p>
            
            <TextField
            name='quantity'
            select
            label="Quantity"
            defaultValue={product.quantity}
            helperText="Edit Quantity"
            sx={{width: "8rem"}}
            onChange={(evt) => handleChange(props.userId, product.productId, evt.target.value)}
            >
              {quantityValues.map((quantity) => (
                <MenuItem 
                key={`cart product ${product.productId} quantity ${quantity}`} 
                value={quantity}
                >
                  {quantity}
                </MenuItem>
              ))}
            </TextField>
            
            <div className='cart-remove-button'>
              <Button
                name="remove"
                variant="contained"
                size="small"
                onClick={() => handleRemove(props.userId, product.productId)}
              >
                Remove
              </Button>
            </div>
            
          </div>
        </div>
      ) : null}
      </div>

      <div className='proceed-to-checkout'>
        <Button 
          component={Link} 
          to={'/account/cart/checkout'}
          variant="contained"
        >
          Proceed To Checkout
        </Button>
      </div>
    </div>
  )
}

export default Cart;