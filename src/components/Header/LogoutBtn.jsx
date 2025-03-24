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
        className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full cursor-pointer"
        onClick={handleLogout}
    >
        Logout
    </button>
  )
}

export default LogoutBtn