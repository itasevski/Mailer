import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import { fetchCurrentUser } from "../store";
import NotFound from "./NotFound";
import SurveyNew from "./surveys/SurveyNew";

const App = () => {
  const dispatch = useDispatch<any>();
  const { user, isLoading, error } = useSelector((state: any) => state.auth);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  // every single path that does not contain "api" in it will be routed internally on the client side
  // NOTE: if we have an internal route with the word "api" in it, the proxy will notice that request and redirect it to our server, meaning
  // that the route would be redundant.
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/dashboard" /> : <Landing />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route path="/surveys/new" Component={SurveyNew} />
        <Route path="*" Component={NotFound} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
