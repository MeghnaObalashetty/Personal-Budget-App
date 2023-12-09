import { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './Chart.css';
import LineChart from './LineChart'; 
import useTokenExpiration from '../TokenExpiration/TokenExpiration';

const Chart = () => {
  const checkTokenExpiration = useTokenExpiration();
  // Call the token expiration check
  checkTokenExpiration();
  
  const [budgetDetails, setBudgetDetails] = useState([]);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [chartData, setChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);

  const userDetails = {
    id: localStorage.getItem('id') || '',
  };

  useEffect(() => {
    axios
      .post('http://localhost:3001/dashboard', userDetails)
      .then(response => {
        setBudgetDetails(response.data.budgetDetails);
      })
      .catch(error => {
        setError('Error fetching budget details', error);
      });
  }, []);

  useEffect(() => {
    if (budgetDetails.length > 0) {
      const categories = {};

      // Iterate through all budget details
      budgetDetails.forEach(detail => {
        if (detail.month === selectedMonth) {
          if (!categories[detail.category]) {
            categories[detail.category] = {
              totalBudget: 0,
              totalExpense: 0,
            };
          }
          categories[detail.category].totalBudget += detail.totalBudget;
          categories[detail.category].totalExpense += detail.expense;
        }
      });

      const labels = Object.keys(categories);
      const budgetData = labels.map(label => categories[label].totalBudget);
      const expenseData = labels.map(label => categories[label].totalExpense);

      const newChartData = {
        labels,
        datasets: [
          {
            label: 'Budget',
            data: budgetData,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
          },
          {
            label: 'Expense',
            data: expenseData,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      };

      setChartData(newChartData);

      // Prepare data for Pie Chart
      const pieData = labels.map(label => categories[label].totalExpense);
      const pieColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];

      const newPieChartData = {
        labels,
        datasets: [
          {
            data: pieData,
            backgroundColor: pieColors,
          },
        ],
      };

      setPieChartData(newPieChartData);
    }
  }, [selectedMonth, budgetDetails]);

  return (
    /*use of label , htmlFor, id ,aria-labelledby to improve accessibilty */
    <div className="chart-container">
      {error && <p>{error}</p>}
      <h1>Budget and Expense Visualization</h1>
      <label htmlFor="selectMonth" className="visually-hidden">
      <h3>Select Month:</h3>
      </label>
      <div className='dropdown'>
        
        <select id="selectMonth" value={selectedMonth} onChange={e => setSelectedMonth(e.target.value) }  aria-labelledby="selectMonth">
          {[
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December',
          ].map(month => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <div className="canvas-container">
      <h2>Bar Chart (Category-wise Expense and Budget)</h2>
      {chartData && chartData.labels.length > 0 ? (
        <Bar data={chartData} />
      ) : (
        <p>No data available for this month</p>
      )}
      </div>
      <div className="canvas-container">
      <h2>Pie Chart (Category-wise Expense)</h2>
      {pieChartData && pieChartData.labels.length > 0 ? (
        <Pie data={pieChartData} />
      ) : (
        <p>No data available for this month</p>
      )}
      </div>
      {/* Include LineChart component */}
      <LineChart />
    </div>  
  );
};
export default Chart; 