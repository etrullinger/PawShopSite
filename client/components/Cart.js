import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchCartAsync, selectCart, updateCartAsync, removeFromCartAsync } from '../features/cartSlice';
import { TextField, MenuItem, Button } from "@mui/material";

const Cart = (props) => {
  const cart = useSelector(selectCart); // array of user's cart products [{quantity, productId, userId}]
  const dispatch = useDispatch();
  const { userId } = useParams();

  useEffect(() => {
    dispatch(fetchCartAsync(userId));
  }, [dispatch, cart.quantity, cart.length]);

  const handleChange = async (userId, productId, quantity) => {
    await dispatch(updateCartAsync({ userId, productId, quantity}));
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
    
          <Link to={`/account/cart/${props.userId}/${product.productId}`}>
            <img 
              className="single-product-image" 
              alt={product.product.name} 
              src={product.product.imageUrl} 
            />
          </Link>

          <div className="single-product-details">
            <h3>{product.product.name}</h3>
            <p>{product.product.description}</p>
            <p>${product.product.price}</p>
            
            <TextField
            name='quantity'
            select
            label="Quantity"
            defaultValue={product.quantity}
            helperText="Edit Quantity"
            sx={{width: "8rem"}}
            onChange={(evt) => handleChange(userId, product.productId, evt.target.value)}
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
                onClick={() => handleRemove(userId, product.productId)}
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
          to={`/account/cart/${props.userId}/checkout`}
          variant="contained"
        >
          Proceed To Checkout
        </Button>
      </div>
    </div>
  )
}

export default Cart;