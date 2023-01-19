import { Button, MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const GuestCart = () => {

  const [ cart, setCart ] = useState(JSON.parse(localStorage.getItem("cart")));
  console.log("What's in the cart? :", cart)

  const editItem2 = (itemID, amount) => {
    let cartCopy = [...cart];
    //find if item exists, just in case
    let existingItem = cartCopy.find(item => item.productId === itemID);
    //if it doesn't exist simply return
    if (!existingItem) return;
    //continue and update quantity
    existingItem.quantity += amount;
    //validate result
    if (existingItem.quantiy <= 0) {
      // remove item by filtering it from cart array
      cartCopy = cartCopy.filter(item => item.productId !== itemID)
    }
    // update state and local state
    setCart(cartCopy);
    let stringCart = JSON.stringify(cartCopy);
    localStorage.setItem('cart', stringCart);
  }

  const editItem = (itemId, amount) => {
    if (!localStorage.getItem){
      localStorage.setItem('cart', JSON.stringify([]))
    } else {
      let cart = JSON.parse(localStorage.getItem("cart"))

      const existingItem = cartArray.find(item => item.id === newItem.id)
      if (!existingItem) return
      existingItem.quantity += amount
      if (existingItem.quantity <= 0)
      console.log("newItem.quantity", newItem.quantity)
    }
  }

  const removeItem = (item) => {
    if (!localStorage.getItem){
      localStorage.setItem('cart', JSON.stringify([]))
    } else {
      let cart = JSON.parse(localStorage.getItem("cart"))
      console.log("cart//:", cart)
      let filteredCart = cart.filter(product => product.id !== item.id)
      setCart(filteredCart)
      localStorage.setItem("cart", JSON.stringify([...filteredCart]))
    }
  }

  useEffect(() => {
    if (cart) setCart(cart);
  }, [cart]);

  var quantityValues = [];
  for (var i = 1; i <= 50; i++) {
    quantityValues.push(i);
  }

  return (
    <div>
      <h3>Guest Shopping Cart</h3>
      <div id="cart-products-container">
      {cart && cart.length ? cart.map((item) =>
      <div key={item.id} className="single-product-container">
        <img
          className="single-product-image"
          alt={item.name}
          src={item.imageUrl}
        />
        <div className="single-product-details">
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <p>{item.price}</p>

          <TextField
            name='quantity'
            select
            label="Quantity"
            defaultValue={item.quantity}
            helperText="Edit Quantity"
            sx={{width: "8rem"}}
            onChange={(e) => editItem(item.id, item.quantity, e.target.value)}
            >
              {quantityValues.map((quantity) => (
                <MenuItem
                key={`cart product ${item.id} quantity ${item.quantity}`}
                value={quantity}
                >
                  {quantity}
                </MenuItem>
              ))}
            </TextField>

            </div>
              <Button name="remove" variant="contained" size="small"onClick={() => removeItem(item)}>Remove</Button>
            </div>
      ) : null}

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
    </div>
  )
}

export default GuestCart;
