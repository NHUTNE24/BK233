import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/slices/authSlice';

const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div className="h-[16px] font-normal text-base">
            <button onClick={handleLogout} className="btn-logout">
                Log out
            </button>
        </div>
    );
};
export default LogoutButton;
