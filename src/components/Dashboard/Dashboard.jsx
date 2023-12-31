import { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import useTokenExpiration from '../TokenExpiration/TokenExpiration';

const Dashboard = () => {
  //const checkTokenExpiration = useTokenExpiration();
  // Call the token expiration check
  //checkTokenExpiration();
  const { showModal, handleExtendSession, handleLogout } = useTokenExpiration();

  const [budgetDetails, setBudgetDetails] = useState([]);
  const [error, setError] = useState(null);

  const userDetails = {
    id: localStorage.getItem("id") || ""
  };

  useEffect(() => {
    axios.post('https://meghna-budget.onrender.com/dashboard', userDetails)
      .then(response => {
        setBudgetDetails(response.data.budgetDetails);
      })
      .catch((error) => {
        setError('', error);
      });
  }, []);

  const isEmpty = Object.keys(budgetDetails).length === 0;

  //exceeded value if expense more than budget
  const getExceededValue = (totalBudget, expense) => {
    const exceededValue = expense - totalBudget;
    return exceededValue > 0 ? exceededValue : 0;
  };

  // Group budget details by month
  const groupedByMonth = budgetDetails.reduce((acc, detail) => {
    const { month } = detail;
    if (!acc[month]) {
      acc[month] = [];
    }
    acc[month].push(detail);
    return acc;
  }, {});

  return (
    <div className="dashboard-container">
      {error && <p>{error}</p>}
      <h1>Budget Details</h1>
      {isEmpty && (
        <p>No expenses added. Please configure budget and expenses first.</p>
      )}
      {Object.keys(groupedByMonth).map(month => (
        <div key={month}>
          <h2>{month}</h2>
          <div className="table-container">
            {/* use of summary and scope for increasinga accessibilty */}
            <table summary={`Budget details for ${month}`}>    
              <thead>
                <tr>
                  <th scope="col">Category</th>
                  <th scope="col">Total Budget</th>
                  <th scope="col">Expense</th>
                  <th scope="col">Exceeded Expense</th> 
                </tr>
              </thead>
              <tbody>
                {groupedByMonth[month].map(detail => (
                  <tr key={detail.category}>
                    <td>{detail.category}</td>
                    <td>
                      {detail.totalBudget}
                    </td>
                    <td>
                      {detail.expense}
                    </td>
                    <td style={{ color: getExceededValue(detail.totalBudget, detail.expense) > 0 ? 'red' : 'inherit' }}>
                      {getExceededValue(detail.totalBudget, detail.expense)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
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
  );
};

export default Dashboard;