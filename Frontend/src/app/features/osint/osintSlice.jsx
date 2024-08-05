import { createSlice } from "@reduxjs/toolkit";
import { startOsintAsync } from "./osintAction";

const osintSlice = createSlice({
  name: "osint",
  initialState: {
    loading: localStorage.getItem("loading") === "true" || false,
    error: null,
    response: null,
  },
  reducers: {
    resetResponse: (state) => {
      state.response = null;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(startOsintAsync.pending, (state) => {
        localStorage.setItem("loading", true);
        state.loading = true;
      })
      .addCase(startOsintAsync.fulfilled, (state, { payload }) => {
        localStorage.setItem("loading", false);
        state.loading = false;
        state.response = payload;
      })
      .addCase(startOsintAsync.rejected, (state, action) => {
        localStorage.setItem("loading", false);
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default osintSlice.reducer;
export const { resetResponse, resetError } = osintSlice.actions;
