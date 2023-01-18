import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCartAsync, selectCart } from '../features/cartSlice';
import { selectProducts } from '../features/productsSlice';

const inCart = [{
  quantity: 1,
  productId: 10,
  userId: null,
  }, {
  quantity: 2,
  productId: 2,
  userId: null,
  },
]

const GuestCart = () => {
  // array of user cart products [{quantity, productId, userId}]
  // const cart = useSelector(selectCart);
  // console.log("cart:", cart);
  const allProducts = useSelector(selectProducts);
  const dispatch = useDispatch();
  const [ products, setProducts ] = useState(allProducts);

  const [ cart, setCart ] = useState([]);

  let localCart = localStorage.getitem("cart")

  const addItem = (item)  =>   {}
  const updateItem = (itemID, amount) => {}
  const removeItem = (itemID) => {}

  useEffect(() => {
    localCarrt = JSON.parse(localCart);
    if (localcart){
      setCart(localCart);
    }
  }, []);

  // useEffect(() => {
  //   dispatch(fetchCartAsync(props.userId));
  // }, [cart, dispatch]);

  const handleRemove = (productToRemove) => {
    console.log('remove button clicked')
    setCart(cart.filter((product) => product.productId !== productToRemove.productId))
    console.log("after remove click", cart)
  }

  return (
    <div>
      <h3>Guest Shopping Cart</h3>

      {cart && cart.length ? cart.map((cartProduct) =>
        <div key={cartProduct.productId}>
          <div>{cartProduct.quantity}</div>

          {products.filter((product) => product.id === cartProduct.productId).map((product) =>
          <div key={`cartProductDetails #${product.id}`}>
            <p>{product.name}</p>
            <p>{product.price}</p>

            <Link to={`/products/${product.id}`}>
              <img alt={product.name}  src={product.imageUrl} sx={{ width: 150, height: 150 }}/>
            </Link>

            <button onClick={() => handleRemove(product)}>Remove from Cart</button>
          </div>)}

        </div>
      ) : null}

    </div>
  )
}

export default GuestCart;
