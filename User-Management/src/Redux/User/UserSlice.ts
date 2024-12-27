import { createSlice } from "@reduxjs/toolkit";


export interface CounterState {
    currentUser: any,
    loading:boolean,
    error:boolean
  }

const initialState: CounterState ={
      currentUser : null,
      loading : false,
      error : false
};

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers:{
        signInStart:(state) => {
            state.loading =true;
        },
        signInSuccess:(state,action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = false;
        },
        signInFailure : (state,action) => {
            state.loading = false;
            state.error = action.payload;
        },
        signOut: (state) => {
            state.currentUser = null; 
            state.loading = false;
            state.error = false;
          },
    }
});

export const {signInStart,signInSuccess,signInFailure,signOut} = userSlice.actions;

export default userSlice.reducer;