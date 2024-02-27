import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';
import { authState } from '../state/authState';

const DiscordAuthRedirect = () => {
  const setAuthState = useSetRecoilState(authState);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    if (token) {
      // Update Recoil authState
      localStorage.setItem('token', token);
      setAuthState((oldState) => ({
        ...oldState,
        isLoggedIn: true, // Update isLoggedIn instead of isAuthenticated
        user: { // Provide a user object with token instead of setting token directly
          email: '', // Provide email if available
          token: token
        }
      }));
      
      navigate('/'); // Redirect to home page
    } else {
      // Handle error or redirect to login page
      navigate('/login');
    }
  }, [location, navigate, setAuthState]);

  return <div>Loading...</div>;
};

export default DiscordAuthRedirect;
