import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingToRedirect = () => {
  const navigate = useNavigate();

  const [count, setCount] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);

    if (count === 0) navigate('/login');

    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div className="mt-2">
      <h5>Redirecting you in {count} seconds</h5>
    </div>
  );
};

export default LoadingToRedirect;
