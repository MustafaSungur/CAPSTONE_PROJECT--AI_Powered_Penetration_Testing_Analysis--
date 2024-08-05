// authActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "../../../api/authFetch.js";

// Kullanıcı kaydı için asenkron eylem oluştur
export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ firstname, lastname, email, password }, { rejectWithValue }) => {
    try {
      return await authService.registerUser({
        firstname,
        lastname,
        email,
        password,
      });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Kullanıcı girişi için asenkron eylem oluştur
export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      return await authService.loginUser({ email, password });
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
