import { createSlice } from "@reduxjs/toolkit";
import { fetchSurveys } from "../thunks/fetchSurveys";

const surveysSlice = createSlice({
  name: "surveys",
  initialState: {
    surveys: [],
    isLoading: false,
    error: "",
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchSurveys.pending, (state: any, action: any) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSurveys.fulfilled, (state: any, action: any) => {
      state.isLoading = false;
      state.surveys = action.payload;
    });
    builder.addCase(fetchSurveys.rejected, (state: any, action: any) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const surveysReducer = surveysSlice.reducer;
