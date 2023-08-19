import axiosCustom from "../util/axiosCustom";

export const fetchUser = () => axiosCustom.get("/api/whoami");

export const sendToken = (token: any) => axiosCustom.post("/api/stripe", token);

export const surveySubmit = (formData: any) =>
  axiosCustom.post("/api/surveys/create", formData);

export const getSurveys = () => axiosCustom.get("/api/surveys");
