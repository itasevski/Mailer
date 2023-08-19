import { createSlice } from "@reduxjs/toolkit";
import { fetchCurrentUser } from "../thunks/fetchCurrentUser";
import { handleStripeToken } from "../thunks/handleStripeToken";
import { submitSurvey } from "../thunks/submitSurvey";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLoading: false,
    error: "",
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCurrentUser.pending, (state: any, action: any) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state: any, action: any) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(fetchCurrentUser.rejected, (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    builder.addCase(handleStripeToken.fulfilled, (state: any, action: any) => {
      state.user = action.payload;
    });

    builder.addCase(submitSurvey.fulfilled, (state: any, action: any) => {
      state.user = action.payload;
    });
  },
});

export const authReducer = authSlice.reducer;
