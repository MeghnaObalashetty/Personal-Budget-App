import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Modal.css';

const Modal = () => {
  const navigate = useNavigate();
  const location = useLocation();
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

  if (location.pathname === '/') {
    // Don't show popup on the root route
    return null;
  }

  return (
    showPopup && (
      <div className="popup-container">
        <div className="popup">
          <p>
            Your session is about to expire in {logoutTimer} seconds. Do you want to extend it?
          </p>
          <button onClick={extendSession}>Extend</button>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    )
  );
};

export default Modal;