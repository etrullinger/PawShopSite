import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProductAsync, selectSingleProduct } from "../features/singleProductSlice";

const SingleProduct = () => {
  const dispatch = useDispatch();

  const { productId } = useParams();
  const product = useSelector(selectSingleProduct);

  // const { name, category, description, price, imageUrl, id } = singleProduct
  console.log('///Product///:', product.name)

  useEffect(() => {
    dispatch(fetchSingleProductAsync(productId))
  }, [dispatch]);

  return (
    <div id="single-product-page">
      <button>Back to Products</button>
      <h3>{product.name}</h3>
      <p>{product.category}</p>
      <img alt={product.name} src={product.imageUrl}/>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <button>Add to Cart 🛒</button>
    </div>
  );

}

export default SingleProduct;
