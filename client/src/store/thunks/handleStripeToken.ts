import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendToken } from "../../services/mailerServices";

const handleStripeToken = createAsyncThunk(
  "stripe/token",
  async (token: any) => {
    const { data } = await sendToken(token);
    return data;
  }
);

export { handleStripeToken };
