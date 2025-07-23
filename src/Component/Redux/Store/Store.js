import { configureStore } from "@reduxjs/toolkit";
import  profileReducerData  from "../Features/Slice/GetDataApiReducer";
export const store = configureStore({
  reducer: {
    Profile: profileReducerData,
  },
});
