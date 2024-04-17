import { configureStore } from "@reduxjs/toolkit";
import menuSlice from "./firstSlice/firstSlice";
import apiSlice from "./firstSlice/myapiSlice";
export const store=configureStore({
    reducer:{
       "menu":menuSlice,
       "myAPI":apiSlice
    }
});