import { createAsyncThunk } from "@reduxjs/toolkit";
import { surveySubmit } from "../../services/mailerServices";

const submitSurvey = createAsyncThunk(
  "survey/submit",
  async (formData: any, { rejectWithValue }) => {
    try {
      const { data } = await surveySubmit(formData);
      return data;
    } catch (err: any) {
      // The Redux Thunk creates a wrapper around response objects returned from Axios requests. If we want error response data specified from
      // our backend to be returned to us, we must use the "rejectWithValue" utility function from RTK.
      // ...
      // rejectWithValue is a utility function that you can return (or throw) in your action creator to return a rejected response with a
      // defined payload and meta. It will pass whatever value you give it and return it in the payload of the rejected action.
      return rejectWithValue(err.response.data);
    }
  }
);

export { submitSurvey };
