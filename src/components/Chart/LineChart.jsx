import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './Chart.css';

const LineChart = () => {
  const [budgetDetails, setBudgetDetails] = useState([]);
  const [error, setError] = useState(null);
  const [startMonth, setStartMonth] = useState('January');
  const [endMonth, setEndMonth] = useState('December');
  const [lineChartData, setLineChartData] = useState(null);

  const userDetails = {
    id: localStorage.getItem('id') || '',
  };

  useEffect(() => {
    axios
      .post('https://meghna-budget.onrender.com/dashboard', userDetails)
      .then(response => {
        setBudgetDetails(response.data.budgetDetails);
      })
      .catch(error => {
        setError('', error);
      });
  }, []);

  useEffect(() => {
    if (budgetDetails.length > 0) {
        const categories = {};

      const startIndex = [
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
      ].indexOf(startMonth);

      const endIndex = [
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
      ].indexOf(endMonth);

      budgetDetails.forEach(detail => {
        const detailMonthIndex = [
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
        ].indexOf(detail.month);

        if (detailMonthIndex >= startIndex && detailMonthIndex <= endIndex) {
          if (!categories[detail.category]) {
            categories[detail.category] = [];
          }
          categories[detail.category].push({
            expense: detail.expense,
            label: categories[detail.category].length + 1,
          });
        }
      });

       const labels = Object.keys(categories);
      const selectedMonths = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ].slice(startIndex, endIndex + 1);

      const datasets = labels.map(label => ({
        label,
        data: categories[label].map(item => item.expense),
        borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
          Math.random() * 256
        )}, ${Math.floor(Math.random() * 256)}, 1)`,
        borderWidth: 2,
        fill: false,
      }));

      const newLineChartData = {
        labels: selectedMonths,
        datasets,
      };

      setLineChartData(newLineChartData);
    }
  }, [startMonth, endMonth, budgetDetails]);


  const handleStartMonthSelect = e => {
    setStartMonth(e.target.value);
  };

  const handleEndMonthSelect = e => {
    setEndMonth(e.target.value);
  };

  return (
    /*use of label, h1,aria-labelledby="startMonth" for improving accessibilty */
    <div className="chart-container" style={{ width: '100%'}}>
      {error && <p>{error}</p>}
      <h1>Line Chart</h1>
      <div className='dropdown-container'>
        <label htmlFor="startMonth" className="visually-hidden">  <h3>Select Start Month:</h3></label>
        <select className='sel' value={startMonth} onChange={handleStartMonthSelect} aria-labelledby="startMonth">
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
        <label htmlFor="endMonth" className="visually-hidden">   <h3>Select End Month:</h3></label> 
        <select className='sel' value={endMonth} onChange={handleEndMonthSelect} aria-labelledby="endMonth">
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
      <div className="canvas-container" style={{ width: '100%'}}>
        <h2>Line Chart (Category-wise Expense Over Time)</h2>
        {lineChartData && lineChartData.datasets.length > 0 ? (
          <Line data={lineChartData} 
          options={{
            elements: {
              line: {
                borderWidth: 4, // Increase line thickness
              },
            }, 
          }}/>
        ) : (
          <p>No data available for this month range</p>
        )}
      </div>
    </div>
  );
};

export default LineChart;