import { Link } from 'react-router-dom';
import './Homepage.css';
import useTokenExpiration from '../TokenExpiration/TokenExpiration';
const Home = () => {
  const isLoggedIn = localStorage.getItem('username');
  const { showModal, handleExtendSession, handleLogout } = useTokenExpiration();

  //const checkTokenExpiration = useTokenExpiration();
  // Call the token expiration check
  //checkTokenExpiration();
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
            <button className="btn btn-primary">Update Expense</button>
          </Link>
          <Link to="/deleteBudget">
            <button className="btn btn-primary">Delete Budget</button>
          </Link>
          </nav>
        </section>
      )}
       {showModal && (
         <div className="overlay">
         <div className="modal-content">
          <p>Your session is about to expire in 20 sec. Do you want to extend it?</p>
          <button onClick={handleExtendSession}>Extend Session</button>
          <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;