import React from 'react'
import authService from '../../appwrite/authService'
import { logout } from "../../store/authSlice";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

function LogoutBtn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        authService.logoutFromAll()
            .then(() => {
                dispatch(logout());
                console.log("Logging user out!");
                navigate('/')
            })
    };
    
  return (
    <button 
        className="inline-block px-4 py-1 font-semibold duration-200 hover:text-green-700 cursor-pointer"
        onClick={handleLogout}
    >
        Logout
    </button>
  )
}

export default LogoutBtn