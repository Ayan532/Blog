import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadUserApi, loginUserApi, logoutUserApi, registerUserApi } from "./userApi";

export const registerUser = createAsyncThunk(
    'users/register',
    async (user) => {
      
      const data = await registerUserApi(user);
      return data;
    }
  );
export const loginUser = createAsyncThunk(
    'users/login',
    async (user) => {
      
      const data = await loginUserApi(user);
      return data;
    }
  );
export const loadUser = createAsyncThunk(
    'users/loadUser',
    async () => {
      
      const data = await loadUserApi();
   
      return data;
    }
  );
export const logoutUser = createAsyncThunk(
    'users/logout',
    async () => {
      
      const data = await logoutUserApi();
      
      return data;
    }
  );
  

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        loading:false,
        error:false,
        message:null,
        isAuthenticated:false,
        user:{}
     },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending,(state)=>{
             state.loading=true;
        }),
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading=false
            state.message=action.payload.message;
            state.user=action.payload.user
            state.isAuthenticated=true;
        }),
        builder.addCase(registerUser.rejected,(state,action)=>{
           state.loading=false;
           state.user=null
           state.error=action.payload
        }),
        builder.addCase(loadUser.pending,(state)=>{
             state.loading=true;
        }),
        builder.addCase(loadUser.fulfilled, (state, action) => {
            state.loading=false
            state.isAuthenticated=true;
            state.user=action.payload.user
        }),
        builder.addCase(loadUser.rejected,(state,action)=>{
           state.loading=false;
           state.user=null
           state.error=action.payload
        }),
        builder.addCase(loginUser.pending,(state)=>{
             state.loading=true;
        }),
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading=false
            state.isAuthenticated=true;
            state.user=action.payload.user
            state.message=action.payload.message
        }),
        builder.addCase(loginUser.rejected,(state,action)=>{
           state.loading=false;
           state.user=null
           state.isAuthenticated=false;
           state.error=action.payload
        }),
        builder.addCase(logoutUser.pending,(state)=>{
             state.loading=true;
        }),
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.loading=false
            state.isAuthenticated=false;
            state.user={}
            state.message=action.payload.message
        }),
        builder.addCase(logoutUser.rejected,(state,action)=>{
           state.loading=false;
           state.user=null
           state.isAuthenticated=false;
           state.error=action.payload
        })
       
          
      
    }
  });
  export default usersSlice.reducer;