import React, { useState } from 'react'
import { Container, Logo } from '../index'
import LogoutBtn from "./LogoutBtn"
import { Link, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector(state => state.auth.status);
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    {
      name: "Home",
      slug: '/',
      active: true,
    },
    {
      name: "Login",
      slug: '/login',
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: '/signup',
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: '/all-posts',
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: '/add-post',
      active: authStatus,
    },
  ];

  return (
    <header className='py-3 shadow bg-gray-500'>
         <Container>
            <nav className="flex items-center justify-between">
               <div>
                  <Link to="/">
                     <Logo width="70px" />
                  </Link>
               </div>

               <button 
                className='text-white text-2xl md:hidden cursor-pointer'
                onClick={() => setIsOpen(!isOpen)}
               >
                {isOpen ? '✖' : '☰'}
               </button>

               <ul 
                className={`absolute md:static top-14 left-0 w-full md:w-auto md:flex bg-gray-500 md:bg-transparent md:space-x-2 p-4 md:p-0 transition-all duration-500 ease-in-out ${
                  isOpen ? 'block' : 'hidden'
                } md:flex`}
               >
                {navItems.map((item) => 
                  item.active && (
                    <li key={item.name}>
                      <button
                        onClick={() => {
                          navigate(item.slug)
                          setIsOpen(false)
                        }} 
                        className='block w-full px-6 py-2 hover:bg-blue-100 rounded-full cursor-pointer duration-200'
                      >
                        {item.name}
                      </button>
                    </li>
                  )
                )}

                {authStatus && (
                  <li>
                    <LogoutBtn />
                  </li>
                )}
               </ul>
            </nav>
         </Container>
      </header>
   );
}

export default Header