import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { reducer as formReducer } from "redux-form";
import { surveysReducer } from "./slices/surveysSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    form: formReducer,
    surveys: surveysReducer,
  },
});

export { store };
export * from "./thunks/fetchCurrentUser";
export * from "./thunks/handleStripeToken";
export * from "./thunks/submitSurvey";
export * from "./thunks/fetchSurveys";
