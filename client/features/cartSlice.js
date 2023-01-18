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

export const updateCartAsync = createAsyncThunk("cart/update", async ({ userId, productId, quantity }) => {
  try {
    const {data} = await axios.put(`/api/cart/${userId}/${productId}`, { quantity });
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const removeFromCartAsync = createAsyncThunk("cart/remove", async ({ userId, productId }) => {
  try {
    const {data} = await axios.delete(`/api/cart/${userId}/${productId}`);
    return data;
  } catch (error) {
    next(error);
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

    builder.addCase(updateCartAsync.fulfilled, (state, action) => {
      return action.payload;
    });

    builder.addCase(removeFromCartAsync.fulfilled, (state, action) => {
      return state.filter((product) => product.id !== action.payload.id);
    });
  }
})

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;