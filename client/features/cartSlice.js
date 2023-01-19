import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartAsync = createAsyncThunk("cart", async (userId) => {
  try{
    const {data} = await axios.get(`/api/cart/${userId}`);
    return data;
  } catch(error){
    console.log(error);
  }
});

export const addToCartAsync = createAsyncThunk("cart/add", async ({ userId, productId, quantity }) => {
  try {
    const {data} = await axios.post(`/api/cart`, {
      quantity,
      productId,
      userId,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
})

export const removeFromCartAsync = createAsyncThunk("cart/remove", async ({ userId, productId }) => {
  try {
    const {data} = await axios.delete(`/api/cart/${userId}/${productId}`);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCartAsync.fulfilled, (state, action) => {
      return action.payload;
    });

    builder.addCase(removeFromCartAsync.fulfilled, (state, action) => {
      return state.filter((product) => product.productId !== action.payload.productId);
    });

    builder.addCase(addToCartAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    });
  }
})

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;