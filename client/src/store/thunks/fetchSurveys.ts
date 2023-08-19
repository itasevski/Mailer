import { createAsyncThunk } from "@reduxjs/toolkit";
import { getSurveys } from "../../services/mailerServices";

const fetchSurveys = createAsyncThunk("surveys/fetch", async () => {
  const { data } = await getSurveys();
  return data;
});

export { fetchSurveys };
