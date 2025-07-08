import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import "./SignIn.css"; // 👈 custom CSS

const SignIn = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { email, password } = user;
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log("sign-In successful");
        localStorage.setItem("user", JSON.stringify(res.user));
        navigate("/");
      })
      .catch((error) => {
        console.log(error.code);
        alert(`Wrong ${error.code}`);
      });
    setUser({});
  };

  return (
    <div className="signin-container">
      <div className="signin-box">
        <h2 className="text-center mb-4">Welcome Back </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-white">Email:</label>
            <input
              type="email"
              name="email"
              value={user.email || ""}
              onChange={handleChange}
              className="form-control"
              id="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label text-white">Password:</label>
            <input
              name="password"
              value={user.password || ""}
              onChange={handleChange}
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-light w-100">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
