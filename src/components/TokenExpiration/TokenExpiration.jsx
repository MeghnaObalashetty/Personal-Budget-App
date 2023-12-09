import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useTokenExpiration = () => {
  const navigate = useNavigate();

  const checkTokenExpiration = () => {
    const token = localStorage.getItem('token');
    const expirationTime = localStorage.getItem('tokenExpiration');

    if (token && expirationTime) {
      const currentTime = new Date().getTime();
      const timeToExpire = expirationTime - currentTime;
      
      if (timeToExpire < 20000 && timeToExpire > 0) {
        const extendSession = window.confirm('Your session is about to expire in 20 sec. Do you want to extend it?');
        if (extendSession) {
          const newExpirationTime = Date.now() + 60 * 1000; // Extend by 1 minute
          localStorage.setItem('tokenExpiration', newExpirationTime);
        } else {
          // Redirect to root route if session is not extended
          localStorage.removeItem('username');
          localStorage.removeItem('token');
          localStorage.removeItem('password');
          localStorage.removeItem('id');
          localStorage.removeItem('tokenExpiration');
          navigate('/');
        }
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      checkTokenExpiration();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return checkTokenExpiration;
};

export default useTokenExpiration;