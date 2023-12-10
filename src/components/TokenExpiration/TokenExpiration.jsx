import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./TokenExpiration.css";

const useTokenExpiration = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const checkTokenExpiration = () => {
    const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('tokenExpiration');

    if (token && expirationTime) {
      const currentTime = new Date().getTime();
      const timeToExpire = expirationTime - currentTime;

      if (timeToExpire < 20000 && timeToExpire > 0) {
        setShowModal(true);
        // Automatically log out after 20 seconds if nothing is pressed
        const timeoutId = setTimeout(() => {
          handleLogout();
        }, 20000);

        // Clear timeout if any action is taken
        const handleAction = () => {
          clearTimeout(timeoutId);
        };

        window.addEventListener('click', handleAction);
        window.addEventListener('keydown', handleAction);

        return () => {
          window.removeEventListener('click', handleAction);
          window.removeEventListener('keydown', handleAction);
          clearTimeout(timeoutId);
        };
      }
    }
  };

  const handleExtendSession = () => {
    const newExpirationTime = Date.now() + 3 * 60 * 1000; // Extend by 3 minute
    localStorage.setItem('tokenExpiration', newExpirationTime);
    setShowModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('password');
    localStorage.removeItem('id');
    localStorage.removeItem('tokenExpiration');
    setShowModal(false);
    navigate('/');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkTokenExpiration();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return {
    showModal,
    handleExtendSession,
    handleLogout,
  };
};

export default useTokenExpiration;