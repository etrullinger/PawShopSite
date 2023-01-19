import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const addOrderProductAsync = createAsyncThunk("ordersProduct/add", async ({ userId, productId, orderId, quantity }) => {
  try {
    const {data} = await axios.post(`/api/orders/${userId}/${orderId}`, {
      productId,
      orderId,
      quantity
    });
    return data;
  } catch (error) {
    console.log(error);
  };
});

export const orderProductsSlice = createSlice({
  name: "orderProducts",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addOrderProductAsync.fulfilled, (state, action) => {
      state.push(action.payload);
    })
  }
});

export const selectOrderProducts = (state) => state.orderProducts;

export default orderProductsSlice.reducer;