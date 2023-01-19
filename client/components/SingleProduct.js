import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProductAsync, selectSingleProduct } from "../features/singleProductSlice";
import { Button, MenuItem, TextField } from "@mui/material";
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';

// Currently hardcoded quantities.
const quantityValues = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]

const SingleProduct = (props) => {

  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector(selectSingleProduct);

  const handleAddToCart2 = () => {
    if (!localStorage.getItem("cart")){
      // if cart does not exist in local storage, create key:val of "cart" and "[product]"
      localStorage.setItem("cart", JSON.stringify([product]))
    } else {
      // since the key: "cart" exists in local storage, grab the JSON string value array
      let cart = localStorage.getItem("cart")
      // since the value is in JSON string, parse to change back to an array
      let cartArray = JSON.parse(cart)
      // Send back to local storage with new product in string array
      localStorage.setItem("cart", JSON.stringify([...cartArray, product]))

    }
  }

  useEffect(() => {
    dispatch(fetchSingleProductAsync(productId))
  }, [dispatch]);

  return (
    <div id="single-product-page">

      <Button
        component={Link}
        to={props.name === 'singleProduct' ? '/products' : '/account/cart'}
        variant="outlined"
        size="small"
        sx={{textTransform: "none"}}
      >
        {props.name === 'singleProduct' ? 'Back to Products' : 'Back to Cart'}
      </Button>

      <div className="single-product-container">
        <img className="single-product-image" alt={product.name} src={product.imageUrl}/>

        <div className="single-product-details">
          <h3>{product.name}</h3>
          <p>{product.category}</p>
          <p>{product.description}</p>
          <p>${product.price}</p>

          <TextField
          id="outlined-select-quantity"
          select
          label="Quantity"
          defaultValue="1"
          helperText="Select Quantity"
          sx={{width: "8rem"}}
          >
            {quantityValues.map((quantity) => (
              <MenuItem key={`product ${product.id} quantity ${quantity}`} value={quantity}>
                {quantity}
              </MenuItem>
            ))}
          </TextField>

          <div>
            <Button onClick={() => handleAddToCart2()} variant="contained" endIcon={<AddShoppingCart />}>Add to Cart</Button>
          </div>

        </div>
      </div>
    </div>
  );

}

export default SingleProduct;



// Code History of Shame Below:

// const [ cart, setCart ] = useState([]);
// localStorage.getItem("cart");
// setCart(JSON.parse(localCart))
// console.log('cart info BEFORE add button clicked -->', localStorage.getItem("cart"))

// const handleAddToCart = (item) => {
//   console.log("Add to cart CLicked")

//     let cartCopy = [...cart, item ];

//     console.log('cart info AFTER add button clicked -->', cart)

//     let { productId } = item;

//     let existingItem = cartCopy.find(cartItem => cartItem.productId === productId)

//     if(existingItem) {
//       existingItem.quantity += item.quantity // update item
//     } else {
//     cartCopy.push(item)
//     }

//     setCart(cartCopy)
//     console.log('cart info AFTER push -->', cart)
//     let stringCart = JSON.stringify(cartCopy);
//     localStorage.setItem('cart', stringCart)

// };
