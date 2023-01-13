import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// export const getAllUsers = createAsyncThunk('allUsers', async () => {
//   const token = window.localStorage.getItem('token');
//   try{
//     if(token){
//     const { data } = await axios.get('/api/admin/users', { headers: { authorization: token }});
//     console.log('user data////', data)  
//     return data;
//     }
//   } catch (error){
//     console.log(error);
//   }
// });
export const getAllUsers = createAsyncThunk('allUsers', async () => {
  try{
    const { data } = await axios.get('/api/admin/users', { headers: { authorization: token }});
    console.log('user data////', data)  
    return data;
  } catch (error){
    console.log(error);
  }
});

const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export const selectUsers = (state) => state.allUsers;

export default allUsersSlice.reducer;