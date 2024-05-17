import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItem: 0,
  value: 0,
  page: 1,
  defaultPage: null,
  getData: [],
  readMore: [],
  wishlistedArr: [],
  
};

const apiSlice = createSlice({
  name: "myAPI",
  initialState,
  reducers: {
    cartItem: (state, action) => {
      state.cartItem = action.payload;
    },

    myWishlist: (state, action) => {
      state.wishlistedArr = action.payload;
    },
    updateReadMore: (state, action) => {
      state.readMore = action.payload;
    },
    updateToDefault: (state, action) => {
      state.defaultPage = action.payload;
    },
    updatePageRev: (state) => {
      state.page -= 1;
    },
    updatePage: (state) => {
      state.page += 1;
    },
    storeAPIdata: (state, action) => {
      state.getData = action.payload;
    },
  },
});

export const {
  updatePage,
  storeAPIdata,
  updatePageRev,
  updateToDefault,
  updateReadMore,
  myWishlist,
  cartItem
} = apiSlice.actions;
export default apiSlice.reducer;
