import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import styled from "styled-components";
import { useEffect, useState } from "react";

const CustomNavBar = styled.nav`
  color: white;
`;

const NavBar = () => {
  const [username, setUsername] = useState("");
  let value = localStorage.getItem("username");
  const navigate = useNavigate();

  useEffect(() => {
    setUsername(value || "");
    console.log("username", username);
  }, [value, username]);

  //let storedUsername = localStorage.getItem("username") || "";
  const handleLogout = () => {
    // console.log("handleLogout---->");
    localStorage.clear();
    // console.log(
    //   "localStorage.getItem('username')",
    //   localStorage.getItem("username")
    // );
    setUsername(value || "");
    navigate("/");
    location.reload();
  };
  return (
    /*Use of as=header for accessibility */
    <CustomNavBar
      as="header"
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#CC8899" }}
    >
      <div className="container-fluid">
        <h3>MY PERSONAL BUDGET TRACKER</h3>


        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
           
            {!username && (
              <>
                <li className="nav-item ">
                  <Link to="/login" className="nav-link active">
                    LOGIN
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="nav-link active">
                    SIGNUP
                  </Link>
                </li>
              </>
            )}
            {username && (
              
           <>
            <li className="nav-item">
              <Link to="/home" className="nav-link active" aria-current="page">
                HOME
              </Link>
            </li>
           
             {location.pathname === "/budget" && (
                  <li className="nav-item">
                    <Link to="/deleteBudget" className="nav-link active">
                      DELETE BUDGET
                    </Link>
                  </li>
                )}   
                <li className="nav-item ">     
           <span className="nav-link active username"><h4>Welcome {`${username.toUpperCase()} :)`}</h4></span>
              </li>
              {location.pathname === "/budget" && (
                  <li className="nav-item ">
                    <Link to="/Expense" className="nav-link active">
                      ADD EXPENSE
                    </Link>
                  </li>
                )}
              
              <li className="nav-item ">
                <Link to="/" className="nav-link active" onClick={handleLogout}>
                  LOGOUT
                </Link>
              </li>   
              </>
            )}
          </ul>
        </div>
      </div>
    </CustomNavBar>
  );
};

export default NavBar;
