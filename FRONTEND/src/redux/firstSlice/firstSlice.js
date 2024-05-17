import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  userData: {},
  readPost:[],
  loginStatus: "Login",
  signupStatus: false,
  passType:false,
  passType2nd:false,
  navBarUpdated:null,
  profile:false,
  profileDetails:null
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setProfileDetails:(state,action)=>{
     state.profileDetails=action.payload;
    },
    setProfiletrue:(state,action)=>{
        state.profile=action.payload
    },
    navBarUpdated:(state,action)=>{
      state.navBarUpdated=action.payload
    },
    readPostOnClick:(state,action)=>{
      state.readPost=action.payload
    },

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

export const {setProfileDetails,setProfiletrue,navBarUpdated,changePasstype,changePasstype2nd, incAnddec, updateuserData, userStatusLogin, userStatusLogout ,userSignUp,userSignUpfalse, readPostOnClick} =
  menuSlice.actions;
export default menuSlice.reducer;
