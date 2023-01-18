import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCartAsync, selectCart } from '../features/cartSlice';
import { selectProducts } from '../features/productsSlice';

// const inCart = [{
//   quantity: 1,
//   productId: 10,
//   userId: 2,
//   }, {
//   quantity: 2,
//   productId: 2,
//   userId: 2,
//   },
// ]

const GuestCart = () => {
  const allProducts = useSelector(selectProducts);
  const [ products, setProducts ] = useState(allProducts);



  let localCart = localStorage.getItem("cart");

  const [ cart, setCart ] = useState(JSON.parse(localCart));
  console.log("cart data that is parsed-->", cart)
  console.log("cart[0] data that is parsed-->", cart[0])
  console.log("cart[0].name data that is parsed-->", cart[0].name)
  // console.log('///////cart/////:', JSON.parse(cart))
  // console.log('///////cart[0].name/////:', JSON.parse(cart[0].name))

  // functionalities
  const addItem = (item)  =>   {
    //create a copy of our cart state, avoid overwritting existing state
    let cartCopy = [...cart];
    //assuming we have an ID field in our item
    let { productId } = item;
    //look for item in cart array
    let existingItem = cartCopy.find(cartItem => cartItem.productId === productId)
    // if item already exists
    if(existingItem) {
      existingItem.quantity += item.quantity // update item
    } else {
      cartCopy.push(item)
    }
    // update upp state
    setCart(cartCopy)
    // make cart a string and store in local space
    let stringCart = JSON.stringify(cartCopy);
    localStorage.setItem('cart', stringCart)
  }

  const editItem = (itemID, amount) => {
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

  const removeItem = (itemID) => {
    let cartCopy = [...cart];
    cartCopy = cartCopy.filter(item => item.productId !== itemID);
    setCart(cartCopy);
    let stringCart = JSON.stringify(cartCopy);
    localStorage.setItem('cart', stringCart);
  }

  useEffect(() => {
    localCart = JSON.parse(localCart);
    if (localCart) setCart(localCart);

  }, []);

  return (
    <div>
      <h3>Guest Shopping Cart</h3>

      {cart && cart.length ? cart.map((item) => <h1>{item.name}</h1>) : null}

      {/* {cart && cart.length ? cart.map((cartProduct) =>
        <div key={cartProduct.productId}>
          <div>{cartProduct.quantity}</div>

          {cart.filter((product) => product.id === cartProduct.productId).map((product) =>
          <div key={`cartProductDetails #${product.id}`}>
            <p>{product.name}</p>
            <p>{product.price}</p>

            <Link to={`/products/${product.id}`}>
              <img alt={product.name}  src={product.imageUrl} sx={{ width: 150, height: 150 }}/>
            </Link>

            <button onClick={() => handleRemove(product)}>Remove from Cart</button>
          </div>)}

        </div>
      ) : null} */}

    </div>
  )
}

export default GuestCart;
