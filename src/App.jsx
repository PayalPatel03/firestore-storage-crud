// src/App.jsx
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Form from "./components/Form";

// Authentication check
const isAuthenticated = () => {
  return localStorage.getItem("user") !== null;
};

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <Routes>
      {/* SignUp page (default route) */}
      <Route path="/" element={<SignUp />} />

      {/* SignIn route */}
      <Route path="/signin" element={<SignIn />} />

      {/* Protected Form route */}
      <Route
        path="/form"
        element={
          <ProtectedRoute>
            <Form />
          </ProtectedRoute>
        }
      />

      {/* Catch-all route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
