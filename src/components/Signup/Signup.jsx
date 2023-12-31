import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import React, { useState } from "react";
import axios from "axios";
import Validations from "../Validations";

const Signup = () => {
  const [user, setUser] = React.useState({
    id: 0,
    fullname: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const navigate = useNavigate();

  const [error, setError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInput = (e) => {
    e.persist();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const saveChanges = (e) => {
    //console.log("saveChanges", user);
    user.id = Math.floor(Math.random() * 1000);

    const newErrors = Validations(user);
    console.log("newErrors", newErrors);

    setError(newErrors);
    //console.log("!newErrors", newErrors);
    const allValuesAreEmpty = Object.values(newErrors).every(
      (value) => value === ""
    );
    if (allValuesAreEmpty) {  
      axios
      .post("https://meghna-budget.onrender.com/signup", user)
      .then((res) => {
        console.log("res", res);
        alert("Registration completed successfully.");
        navigate("/login");
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.error === "Email already exists") {
          setError({ ...error, email: "Email already exists" });
        } else {
          console.log(err);
        }
      });
    }
    e.preventDefault();
  };
  return (
    <div className="signup-container">
      <form onSubmit={saveChanges}>
         {/* use of htmlfor accessibilty */}
          <label htmlFor="fullName" className="fullName">Full name</label>
          <input
            name="fullname"
            type="text"
            className="form-control"
            id="fullName"
            placeholder="Enter Full Name"
            onChange={handleInput}
            required
          />
       
          <label htmlFor="email" className="email">
            Email address
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={handleInput}
            required
          />
  
        {error.email && <small style={{ color: "red" }}>{error.email}</small>}
   
          <label className="password" htmlFor="exampleInputPassword1">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter Password"
            onChange={handleInput}
            required
          />

        {error.password && (
          <small style={{ color: "red" }}>{error.password}</small>
        )}
 
          <label className="confirmPassword" htmlFor="exampleInputPassword1">
            Confirm Password
          </label>
          <input
            name="confirmPassword"
            type="password"
            className="form-control"
            id="password"
            placeholder=" Confirm Password"
            onChange={handleInput}
            required
          />
 
        {error.confirmPassword && (
          <small style={{ color: "red" }}>{error.confirmPassword}</small>
        )}
  
        <button type="submit" className="btn btn-primary">
          Signup
        </button>

        <div className="signupblock">
          <small className="mr-2">Already have an account ?</small> &nbsp;
          <button type="button" className="btn btn-primary btn-sm">
            <Link to="/login" className="nav-link active" aria-current="page">
              Login
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
