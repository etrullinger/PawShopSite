import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrdersAsync = createAsyncThunk("orders", async (userId) => {
  try {
    const {data} = await axios.get(`/api/orders/${userId}`);
    return data;
  } catch (error) {
    console.log(error);
  };
});

export const ordersSlice = createSlice({
  name: "orders",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOrdersAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export const selectOrders = (state) => state.orders;

export default ordersSlice.reducer;