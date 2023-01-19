import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSingleProductAsync = createAsyncThunk("singleProduct", async (productId) => {
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    return data
  } catch (error) {
    console.log(error);
  }
});

export const editProductAsync = createAsyncThunk('singleProduct/edit', async (editedProduct) => {
  try{
    const { name, price, description, category, imageUrl, productId } = editedProduct;
    const { data } = await axios.put(`/api/products/${productId}`, {
      name,
      price,
      description,
      category,
      imageUrl
    })
    return data;
  } catch(error){
    console.log(error)
  }
})

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState: {},
  reducers: {
    //using extraReducers
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {
      return action.payload
    });
    builder.addCase(editProductAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  }
})

export const selectSingleProduct = (state) => {
  // console.log("state.singleProduct:", state.singleProduct)
  return state.singleProduct;
}

export default singleProductSlice.reducer;
