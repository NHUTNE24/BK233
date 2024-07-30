import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../store/slices/authSlice'; // Adjust the path as necessary

const LoginSuccess = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    useEffect(() => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get('token');
      const username = params.get('username');
      const avatar = decodeURIComponent(params.get('avatar'));
      if (token && username && avatar) {
        localStorage.setItem('jwtToken', token); // Store the token in localStorage
        dispatch(login({token, username, avatar })); // Dispatch the login action with the token
        navigate('/'); // Redirect to the home page
      } else {
        console.error('Token or username not found in URL');
      }
    }, [dispatch, navigate]);

  return (
    <div>
      Redirecting...
    </div>
  );
};

export default LoginSuccess;
