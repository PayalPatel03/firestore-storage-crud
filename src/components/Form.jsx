import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBook, deleteBook, fetchBook } from "../features/book/bookSlice";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import "./Form.css"; 
import { FaEdit, FaEye, FaEyeSlash } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { updateBook } from "../features/book/bookSlice";



const Form = () => {
  const [emp, setEmp] = useState({});
  const dispatch = useDispatch();
  const { book } = useSelector((state) => state.book);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [visibleIndex, setVisibleIndex] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (!user) {
     navigate("/");

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

  if (isEdit) {
    dispatch(updateBook(emp));
    setIsEdit(false);
  } else {
    dispatch(addBook(emp));
  }

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
    <div className="form-page">
      <div className="topbar d-flex justify-content-between align-items-center px-4 py-3">
        <h6 className="text-white mb-0">Logged in as: {user?.email}</h6>
        <button onClick={handleLogout} className="btn btn-outline-light">
          Logout
        </button>
      </div>

      <div className="form-container container">
        <div className="form-box">
          <h2 className="text-white text-center mb-4">Employee Data Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="eName" className="form-label text-white">
                Employee Name:
              </label>
              <input
                type="text"
                name="eName"
                value={emp.eName || ""}
                onChange={handleChange}
                className="form-control"
                id="eName"
                placeholder="Enter name"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-white">
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={emp.email || ""}
                onChange={handleChange}
                className="form-control"
                id="email"
                placeholder="Enter email"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="form-label text-white">
                Password:
              </label>
              <input
                type="password"
                name="password"
                value={emp.password || ""}
                onChange={handleChange}
                className="form-control"
                id="password"
                placeholder="Enter password"
                required
              />
            </div>
            <button type="submit" className="btn btn-light w-100">
              {isEdit ? "Update" : "Submit"}
            </button>
          </form>
        </div>

        <div className="data-table mt-5">
          <h3 className="text-white mb-3">Employee Records</h3>
          <div className="table-responsive">
            <table className="table  table-hover table-bordered">
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
                {book.map((item, idx) => {
                  const { eName, email, password, id } = item;
                  return (
                    <tr key={id}>
                      <td>{idx + 1}</td>
                      <td>{eName}</td>
                      <td>{email}</td>
                      <td className="d-flex align-items-center">
                        <input
                          disabled
                          type={visibleIndex === idx ? "text" : "password"}
                          value={password}
                          className="form-control me-2"
                        />
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            setVisibleIndex(visibleIndex === idx ? null : idx)
                          }
                        >
                          {visibleIndex === idx ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => {
                            setEmp(item);
                            setIsEdit(true);
                          }}
                        >
                          <FaEdit />
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => dispatch(deleteBook(id))}
                        >
                          <RiDeleteBin6Line />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
