import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { email, password } = user;
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        console.log("sign-up successful");
        navigate("/signin"); // 👈 Redirect to sign-in after sign-up
      })
      .catch((error) => {
        console.log(error);
        alert(error.message);
      });
    setUser({});
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto mt-5">
          <h1>Sign-Up</h1>
          <form method="post" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email :</label>
              <input
                type="email"
                name="email"
                value={user.email || ""}
                onChange={handleChange}
                className="form-control"
                id="email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password :</label>
              <input
                name="password"
                value={user.password || ""}
                onChange={handleChange}
                type="password"
                className="form-control"
                id="password"
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
