import { createSlice } from "@reduxjs/toolkit";


export interface CounterState {
    adminDetals: any,
    admin_loading:boolean,
    admin_error:boolean
  }

const initialState: CounterState ={
    adminDetals : null,
    admin_loading : false,
    admin_error : false
};

const adminSlice = createSlice({
    name : 'admin',
    initialState,
    reducers:{
        adminSignInStart:(state) => {
            state.admin_loading =true;
        },
        adminSignInSuccess:(state,action) => {
            state.adminDetals = action.payload;
            state.admin_loading = false;
            state.admin_error = false;
        },
        adminSignInFailure : (state,action) => {
            state.admin_loading = false;
            state.admin_error = action.payload;
        },
        adminSignOut:(state) => {
            state.adminDetals = null;
            state.admin_loading = false;
            state.admin_error = false;
        },
    }
});

export const {adminSignInStart,adminSignInSuccess,adminSignInFailure,adminSignOut} = adminSlice.actions;

export default adminSlice.reducer;