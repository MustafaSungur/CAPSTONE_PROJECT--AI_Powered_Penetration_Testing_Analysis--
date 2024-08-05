import { createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "./authActions";
import Cookies from "universal-cookie";
import jwt_Decode from "../../../utils/jwtDecode";
const cookie = new Cookies(null, { path: "/" });

//resetToken gibi checkCookie fonksiyonu oluştur Cookie.get ile kontrol et

const initialState = {
  loading: false,
  userInfo: null,
  userToken: null,
  error: null,
  success: false,
};

// Redux Toolkit'in createSlice fonksiyonu ile bir Auth oluşturuluyor
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkCookie: (state) => {
      const availableToken = cookie.get("token");
      if (availableToken) {
        state.userToken = availableToken;
        state.userInfo = jwt_Decode(availableToken).data;
      } else {
        state.userToken = null;
        state.userInfo = null;
      }
    },
    resetToken: (state) => {
      state.userToken = null;
      state.loading = false;
      state.error = null;
      state.success = false;
      cookie.remove("token");
    },
  },

  extraReducers: (builder) => {
    // registerUser asenkron eyleminin durumlarına tepki gösteren ek reducer'lar
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

    // loginUser asenkron eyleminin durumlarına tepki gösteren ek reducer'lar
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        const decoded = jwt_Decode(payload.token);
        state.loading = false;
        state.userInfo = decoded.data;
        state.userToken = payload.token;
        state.success = true;

        cookie.set("token", payload.token, {
          expires: new Date(decoded.exp * 1000),
          secure: true, // Sadece HTTPS üzerinden iletilmesini sağlar
        });
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

// authSlice reducer'ını ihraç et
export default authSlice.reducer;
export const { resetToken, checkCookie } = authSlice.actions;
