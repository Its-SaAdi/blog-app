import authService from '../../appwrite/authService'
import LoadingOverlay from '../LoadingOverlay/LoadingOverlay';
import { useState } from 'react';
import { logout } from "../../store/authSlice";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

function LogoutBtn() {
    const [loggingOut, setLoggingOut] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        setLoggingOut(true);
        authService.logoutFromAll()
            .then(() => {
                dispatch(logout());
                console.log("Logging user out!");
                setLoggingOut(false);
                navigate('/login')
            })
    };
    
  return (
    <>
        {loggingOut && <LoadingOverlay message="Logging out..." />}
        <button 
            className="inline-block px-4 py-1 font-semibold duration-200 hover:text-green-700 cursor-pointer"
            onClick={handleLogout}
        >
            Log Out
        </button>
    </>
  )
}

export default LogoutBtn