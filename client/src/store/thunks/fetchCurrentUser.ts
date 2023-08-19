import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUser } from "../../services/mailerServices";

const fetchCurrentUser = createAsyncThunk("auth/user", async () => {
  const { data } = await fetchUser();
  return data;
});

export { fetchCurrentUser };
