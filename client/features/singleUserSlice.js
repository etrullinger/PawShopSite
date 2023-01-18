import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleUserAsync = createAsyncThunk("singleUser", async(userId) => {
  try {
    const token = window.localStorage.getItem('token');
    if(token){
    const { data } = await axios.get(`/api/users/${userId}`);
    return data;
    }
  } catch (error) {
    console.log(error)
  }
});

export const editUserAsync = createAsyncThunk("singleUser/edit", async(editedUser) => {
  try{
    const { firstName, lastName, email, userId } = editedUser;
    const { data } = await axios.put(`/api/users/${userId}`, {
      firstName,
      lastName,
      email,
    });
    return data;
  } catch(error){
    console.log(error)
  }
});

const singleUserSlice = createSlice({
  name: "singleUser",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleUserAsync.fulfilled, (state, action) => {
      console.log('single user payload', action.payload)
      return action.payload;
    });
    builder.addCase(editUserAsync.fulfilled, (state, action) => {
      console.log('edit user payload', action.payload)
      return action.payload;
    });
  }
});

export const selectSingleUser = (state) => state.singleUser;

export default singleUserSlice.reducer;