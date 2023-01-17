import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCartAsync = createAsyncThunk("cart", async (userId)=> {
  try{
      const {data} = await axios.get(`/api/cart/${userId}`);
      return data;
  } catch(error){
      console.log(error)
  }
});

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
      builder.addCase(fetchCartAsync.fulfilled, (state, action) => {
          return action.payload;
      })
  }
})

export const selectCart = (state) => state.cart;

export default cartSlice.reducer;