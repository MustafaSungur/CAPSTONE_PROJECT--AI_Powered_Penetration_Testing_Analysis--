import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import osintReducer from "./features/osint/osintSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    osint: osintReducer,
  },
});
export default store;
