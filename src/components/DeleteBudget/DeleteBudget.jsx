import { useState, useEffect } from 'react';
import axios from 'axios';
import useTokenExpiration from '../TokenExpiration/TokenExpiration';

const DeleteBudget = () => {
  //const checkTokenExpiration = useTokenExpiration();
  // Call the token expiration check
  //checkTokenExpiration();
  const { showModal, handleExtendSession, handleLogout } = useTokenExpiration();

  const [details, setDetails] = useState({
    category: '',
    month: '',
  });

  const [months, setMonths] = useState([]);
  const [categories, setCategories] = useState([]); 

  useEffect(() => {
    fetchBudgetDetails();
  }, []);

  const fetchBudgetDetails = () => {
    const userDetails = {
      id: localStorage.getItem('id') || '',
    };

    axios
      .post('https://meghna-budget.onrender.com/dashboard', userDetails)
      .then((response) => {
        const responseData = response.data;

        if (Array.isArray(responseData.budgetDetails)) {
          const uniqueMonths = Array.from(new Set(responseData.budgetDetails.map((item) => item.month)));
          setMonths(uniqueMonths);
          // Set initial categories for the first month
          if (uniqueMonths.length > 0) {
            fetchCategoriesByMonth(uniqueMonths[0]);
          }
        } else {
          console.error('Unexpected response format for months:', responseData);
        }
      })
      .catch((error) => {
        console.error('Error fetching budget details:', error);
      });
  };

  const fetchCategoriesByMonth = async (selectedMonth) => {
    try {
        const id = localStorage.getItem('id') || '';
      const response = await axios.post('https://meghna-budget.onrender.com/categories', { month: selectedMonth,userId:id });
      const responseData = response.data;
      console.log(responseData);
      if (Array.isArray(responseData)) {
        setCategories(responseData);
      } else {
        console.error('Unexpected response format for categories:', responseData);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        const id = localStorage.getItem('id') || '';
        const { month, category } = details;
    
        await axios.delete('https://meghna-budget.onrender.com/deleteBudget', {
          data: { month, userId: id, category },
        });
    
        alert('Budget for the month Deleted successfully. Thank you.');
      } catch (error) {
        console.error('Error deleting budget:', error);
        alert('Failed to delete budget. Please try again.');
      }
  };

  const handleInput = async (e) => {
    const { name, value } = e.target;
    if (name === 'month') {
      setDetails({ ...details, [name]: value, category: '' });
      await fetchCategoriesByMonth(value);
    } else {
      setDetails({ ...details, [name]: value });
    }
  };

  return (
    /* className="visually-hidden" for improving accessibilty */
    <div className="budgetPage">
      <h3 style={{ textAlign: 'center' }}>Record an Expense</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="month" className="visually-hidden">
            Month
          </label>
          <select name="month" className="form-control" onChange={handleInput} required>
            <option value="">Select Month</option>
            {months.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="category" className="visually-hidden">
            Category
          </label>
          <select
            name="category"
            className="form-control"
            value={details.category}
            onChange={handleInput}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        
        <button type="submit" className="btn btn-primary">
          Delete Budget
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
  );
};

export default DeleteBudget;