import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import { useState } from "react";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors,setErrors] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const onLogin = (e) => {
    e.preventDefault();

    const details = {
      email,
      password,
    };

    axios
      .post("https://meghna-budget.onrender.com/login", details)
      .then((res) => {
        //console.log("res--->", res, res.data.password);
        if (res.data.Login) {
          localStorage.setItem("username", res.data.username);
          localStorage.setItem("password", res.data.password);
          localStorage.setItem("id", res.data.id);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("tokenExpiration", res.data.tokenExpiration);
          navigate("/home");
          //location.reload();
        } else {
          setErrors({
            ...errors,
            password: "No matching record exists. Please verify your email and  password.",
          });
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className=" login-container">
      <form onSubmit={onLogin}>
           {/* label tag for email input to increase accessibilty*/}
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            // Add aria-label or aria-labelledby for better accessibility
            aria-label="Email address"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
            {/* Display error for email, if any , use of id for accessbilty */}
        {errors.email && <small id="emailError" style={{ color: "red" }}>{errors.email}</small>}
          <label className="password" htmlFor="exampleInputPassword1">
            Password
          </label>
          <input
            name="password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
     
        {errors.password && (
          <small style={{ color: "red" }}>{errors.password}</small>
        )}
        <br />
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        {/* use of aria-current for accessbilty */}
        <div className="signupblock">
          <small className="mr-2">Dont have an account ?</small> &nbsp;
          <button type="button" className="btn btn-primary btn-sm">
            <Link to="/signup" className="nav-link active" aria-current="page">
              Signup
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
