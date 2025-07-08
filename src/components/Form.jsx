import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBook, deleteBook, fetchBook } from "../features/book/bookSlice";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

const Form = () => {
  const [emp, setEmp] = useState({});
  const dispatch = useDispatch();
  const { book } = useSelector((state) => state.book);
  const navigate = useNavigate();

  // ✅ Fetch Firebase logged-in user
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(fetchBook());
    }
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setEmp({ ...emp, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBook(emp));
    setEmp({});
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mt-3">
          <h5>Logged in as: {user?.email}</h5>
          <button onClick={handleLogout} className="btn btn-danger">
            Logout
          </button>
        </div>

        <div className="row">
          <div className="col-md-6 mx-auto">
            <h1 className="my-4">Employee Data Form:</h1>
            <form method="post" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="eName" className="form-label">Employee Name:</label>
                <input
                  type="text"
                  name="eName"
                  value={emp.eName || ""}
                  onChange={handleChange}
                  className="form-control"
                  id="eName"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={emp.email || ""}
                  onChange={handleChange}
                  className="form-control"
                  id="email"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={emp.password || ""}
                  onChange={handleChange}
                  className="form-control"
                  id="password"
                />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col-md-8 mx-auto">
            <h2 className="my-3">Employee Data:</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Employee Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {book.map((item, idx) => (
                  <tr key={item.id}>
                    <td>{idx + 1}</td>
                    <td>{item.eName}</td>
                    <td>{item.email}</td>
                    <td>{item.password}</td>
                    <td>
                      <button className="btn btn-warning me-1">Edit</button>
                      <button
                        className="btn btn-danger me-1"
                        onClick={() => dispatch(deleteBook(item.id))}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
