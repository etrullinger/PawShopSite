import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchCartAsync, selectCart } from '../features/cartSlice';
import { selectProducts } from '../features/productsSlice';

const Cart = (props) => {
  const cart = useSelector(selectCart); // array of user's cart products [{quantity, productId, userId}]
  const allProducts = useSelector(selectProducts);
  const dispatch = useDispatch();

  console.log(cart);

  useEffect(() => {
    dispatch(fetchCartAsync([props.userId]));
  }, [dispatch]);

  return (
    <div>
      <h3>Cart</h3>
      {cart && cart.length ? cart.map((cartProduct) => 
        <div key={`cart ${props.userId}: product #${cartProduct.productId}`}>
          <div>{cartProduct.quantity}</div>
          {allProducts.filter((product) => product.id === cartProduct.productId).map((product) => 
          <div>
            <p>{product.name}</p>
            <p>{product.price}</p>
            <Link to={`/products/${product.id}`}>
              <img alt={product.name}  src={product.imageUrl} sx={{ width: 150, height: 150 }}/>
            </Link>
          </div>)}
        </div>
      ) : null}
    </div>
  )
}

export default Cart;