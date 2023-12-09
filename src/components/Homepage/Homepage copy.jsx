import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Homepage.css';

const Home = () => {
  const isLoggedIn = localStorage.getItem('username');
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [logoutTimer, setLogoutTimer] = useState(20); // Countdown timer in seconds
  const [timerId, setTimerId] = useState(null);


  const checkTokenExpiration = () => {
    const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('tokenExpiration');

    if (token && expirationTime) {
      const currentTime = new Date().getTime();
      const timeToExpire = expirationTime - currentTime;

      if (timeToExpire < 20000 && timeToExpire > 0) {
        setShowPopup(true);
        startTimer();
      }
    }
  };
  const startTimer = () => {
    const id = setInterval(() => {
      setLogoutTimer((prevTimer) => prevTimer - 1);
    }, 1000);
    setTimerId(id);
  };

  useEffect(() => {
    checkTokenExpiration();
    return () => clearInterval(timerId);
  }, []);

  useEffect(() => {
    if (logoutTimer === 0) {
      clearInterval(timerId);
      logout();
    }
  }, [logoutTimer, timerId]);

  const extendSession = () => {
    const newExpirationTime = Date.now() + 60 * 1000; // Extend by 1 minute
    localStorage.setItem('tokenExpiration', newExpirationTime);
    setShowPopup(false);
    clearInterval(timerId);
  };

  const logout = () => {
    clearInterval(timerId);
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('password');
    localStorage.removeItem('id');
    localStorage.removeItem('tokenExpiration');
    window.location.reload();
    navigate('/');
  };


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

      {showPopup && (
        <div className="popup-container">
          <div className="popup">
            <p>
              Your session is about to expire in {logoutTimer} seconds. Do you want to extend it?
            </p>            
            <button onClick={extendSession}>Extend</button>
            <button onClick={logout}>Logout</button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
