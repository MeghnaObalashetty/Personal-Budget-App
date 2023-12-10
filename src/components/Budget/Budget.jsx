import { useState } from "react";
import "./Budget.css";
import axios from "axios";
import useTokenExpiration from '../TokenExpiration/TokenExpiration';


const Budget = () => {
  const { showModal, handleExtendSession, handleLogout } = useTokenExpiration();

  //const checkTokenExpiration = useTokenExpiration();
  // Call the token expiration check
  //checkTokenExpiration();
  const [details, setDetails] = useState({
    id: "",
    category: "", 
    totalBudget: "",
    expense: "0",
    month: "",
  });
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const handleSubmit = (e) => {
    e.preventDefault();
    details["id"] = localStorage.getItem("id") || "";
    console.log("details-->", details);
    axios
      .post("http://localhost:3001/budgetList", details)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => console.log(err));

    return alert("Your Budget has been submitted successfully. Thank you.");
  };

  const handleInput = (e) => {
    e.persist();
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
 
 
 
  return (
    <>
   
   <div className="budgetPage">
        <h3 style={{ textAlign: "center" }}>Record an Budget</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
             {/* use of label,htmlFor for accessibilty   */}
            <label htmlFor="category" className="category">
              Category
            </label>
            <input
              name="category"
              type="text"
              className="form-control"
              id="category"
              placeholder="Enter Budget Category"
              required
              onChange={handleInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="totalBudget" className="budgetAmount">
              Total Budget
            </label>
            <input
              name="totalBudget"
              type="number"
              className="form-control"
              id="totalBudget"
              placeholder="Enter Total Budget"
              required
              onChange={handleInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="expense" className="amount">
              Add Initial Expense Amount
            </label>
            <input
              name="expense"
              type="number"
              className="form-control"
              id="expense"
              placeholder="Enter Expense Amount or 0 initially"
              required
              onChange={handleInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="month" className="month">
              Month
            </label>
            <select
              name="month"
              className="form-control"
              id="month"
              onChange={handleInput}
              required
            >
              <option value="">Select Month</option>
              {months.map((month, index) => (
                <option key={index} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Record Budget
          </button>
        </form>
        {showModal && (
         <div className="overlay">
         <div className="modal-content">
          <p>Your session is about to expire in 20 sec. Do you want to extend it?</p>
          <button onClick={handleExtendSession}>Extend Session</button>
          <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}
      </div>
    </>
  );
};

export default Budget;