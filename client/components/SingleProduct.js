import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProductAsync, selectSingleProduct } from "../features/singleProductSlice";
import { Button, InputAdornment, MenuItem, TextField } from "@mui/material";
import AddShoppingCart from '@mui/icons-material/AddShoppingCart';

// Currently hardcoded quantities.
const quantityValues = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]

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

      <Button
      component={Link}
      to={`/products`}
      variant="outlined"
      size="small"
      sx={{textTransform: "none"}}
      >
      Back to Products</Button>

      <div id="single-product-container">
        <img id="single-product-image" alt={product.name} src={product.imageUrl}/>

        <div id="single-product-details">
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
              <MenuItem key={quantity} value={quantity}>
                {quantity}
              </MenuItem>
            ))}
          </TextField>

          <div>
            <Button variant="contained" endIcon={<AddShoppingCart />}>Add to Cart</Button>
          </div>

        </div>
      </div>



    </div>
  );

}

export default SingleProduct;
