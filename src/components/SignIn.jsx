import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase/config";

const SignIn = () => {

    const [user, setUser] = useState({});
    
    const handleChange = (e)=>{
        let {name,value} = e.target;
        setUser({...user,[name]:value})
    }

    const handleSubmit =(e)=>{
        e.preventDefault();
        let {email,password} = user
        signInWithEmailAndPassword(auth,email,password)
        .then(()=>{
            console.log("sign-In successful")
        })
        .catch((error)=>{
            console.log(error)
        })
        setUser({})
    }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto mt-5">
            <h1>Sign-In</h1>
            <form method="post" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email :
                </label>
                <input
                  type="email"
                  name="email"
                  value={user.email || ''}
                  onChange = {handleChange}
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password :
                </label>
                <input
                  name="password"
                  value={user.password || ''}
                  onChange = {handleChange}
                  type="password"
                  className="form-control"
                  id="password"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;