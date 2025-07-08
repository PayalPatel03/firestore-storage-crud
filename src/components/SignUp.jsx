import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../firebase/config";

const SignUp = () => {

    const [user, setUser] = useState({});
    
    const handleChange = (e)=>{
        let {name,value} = e.target;
        setUser({...user,[name]:value})
    }

    const handleSubmit =(e)=>{
        e.preventDefault();
        let {email,password} = user
        createUserWithEmailAndPassword(auth,email,password)
        .then(()=>{
            console.log("sign-up successful")
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
            <h1>Sign-Up</h1>
            <form method="post" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email :
                </label>
                <input
                  type="email"
                  name="email"
                  value={user.email || ''}
                  onChange = {handleChange}
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password :
                </label>
                <input
                  name="password"
                  value={user.password || ''}
                  onChange = {handleChange}
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
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

export default SignUp;