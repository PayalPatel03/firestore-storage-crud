import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Form from "./components/Form";

// Protect Route
const isAuthenticated = () => {
  return localStorage.getItem("user") !== null;
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Form />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
