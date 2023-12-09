import { Link } from 'react-router-dom';
import './Homepage.css';

const Home = () => {
  const isLoggedIn = localStorage.getItem('username');

  return (
    <main className="home-container">
      <h2>Welcome to the Personal Budget App!</h2>
      {!isLoggedIn && (
        <section>
          <p>Please log in or signup to access dashboard and charts.</p>
        </section>
      )}
      {isLoggedIn && (
        <section>
          <p>Logged in as: {isLoggedIn}</p>
          <nav>
            <Link to="/dashboard">
              <button className="btn btn-primary">View Dashboard</button>
            </Link>
            <Link to="/charts">
            <button className="btn btn-primary">View Charts</button>
          </Link>
          <Link to="/budget">
            <button className="btn btn-primary">Add Budget</button>
          </Link>
          <Link to="/Expense">
            <button className="btn btn-primary">Add Expense</button>
          </Link>
          <Link to="/deleteBudget">
            <button className="btn btn-primary">Delete Budget</button>
          </Link>
          </nav>
        </section>
      )}
    </main>
  );
};

export default Home;
