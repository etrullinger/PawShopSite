import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCartAsync, selectCart } from '../features/cartSlice';
import { selectProducts } from '../features/productsSlice';

const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart') || "[]")

const GuestCart = () => {

  const [ cart, setCart ] = useState(cartFromLocalStorage)

  // array of guest cart products [{quantity, productId, userId}]
  // const cart = useSelector(selectCart);
  // console.log("cart:", cart);

  const allProducts = useSelector(selectProducts);

  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart]);

  // useEffect(() => {
  //   dispatch(fetchCartAsync(props.userId));
  // }, [dispatch]);

  return (
    <div>
      <h3>Guest Shopping Cart</h3>

      {cart && cart.length ? cart.map((cartProduct) =>
        <div key={`cart${props.userId}: product #${cartProduct.productId}`}>
          <div>{cartProduct.quantity}</div>

          {allProducts.filter((product) => product.id === cartProduct.productId).map((product) =>
          <div key={`cartProductDetails #${product.id}`}>
            <p>{product.name}</p>
            <p>{product.price}</p>

            <Link to={`/products/${product.id}`}>
              <img alt={product.name}  src={product.imageUrl} sx={{ width: 150, height: 150 }}/>
            </Link>
          </div>)}

        </div>
      ) : "No Items in Cart"}

    </div>
  )
}

export default GuestCart;
