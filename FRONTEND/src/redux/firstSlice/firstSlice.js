import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  userData: {},
  loginStatus: "Login",
  signupStatus: false,
  passType:false,
  passType2nd:false
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    changePasstype:(state)=>{
       if(state.passType){
        state.passType=false;
       }else{
        state.passType=true;
       }
    },
    changePasstype2nd:(state)=>{
       if(state.passType2nd){
        state.passType2nd=false;
       }else{
        state.passType2nd=true;
       }
    },

    userSignUp: (state) => {
      state.signupStatus = true;
    },
    userSignUpfalse:(state)=>{
      state.signupStatus=false;
    },
    userStatusLogin: (state) => {
      state.loginStatus = "Login";
    },
    userStatusLogout: (state) => {
      state.loginStatus = "Logout";
    },
    incAnddec: (state) => {
      state.value == 0 ? (state.value += 1) : (state.value -= 1);
    },
    updateuserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const {changePasstype,changePasstype2nd, incAnddec, updateuserData, userStatusLogin, userStatusLogout ,userSignUp,userSignUpfalse} =
  menuSlice.actions;
export default menuSlice.reducer;
