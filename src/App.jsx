import authService from './appwrite/authService';
import {login, logout} from './store/authSlice'
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import './App.css'
import { Outlet } from 'react-router';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
      .then(userData => {
        if (userData) {
          dispatch(login({userData}));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className='min-h-screen w-full flex flex-wrap content-between bg-zinc-100'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) :  ( 
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="w-24 h-24 border-4 border-green-700 border-solid border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}

export default App
