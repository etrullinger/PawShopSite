import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsersAsync = createAsyncThunk('users', async () => {
  const token = window.localStorage.getItem('token');
  try{
    if(token){
    const { data } = await axios.get('/api/admin/users', { headers: { authorization: token }});
 
    return data;
    }
  } catch (error){
    console.log(error);
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsersAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export const selectUsers = (state) => {
  return state.users;
}

export default usersSlice.reducer;