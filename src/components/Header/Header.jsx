import React, { useState } from 'react'
import { Container, Logo } from '../index'
import LogoutBtn from "./LogoutBtn"
import { Link, NavLink, useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import { Menu, X } from 'lucide-react'

function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector(state => state.auth.status);
  const [isOpen, setIsOpen] = useState(false);
  
  const navItems = [
    {
      name: "Posts",
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
      name: "My Posts",
      slug: '/all-posts',
      active: authStatus,
    },
    {
      name: "Create Post",
      slug: '/add-post',
      active: authStatus,
    },
  ];

  return (
    <header className='py-1 shadow-md bg-zinc-100 text-zinc-600'>
      <Container>
        <nav className="flex items-center justify-between">
          <div>
            <Link to="/" className='flex items-center space-x-1 hover:scale-105 duration-200 '>
                <Logo width="70px" />
                <span className='hidden md:block font-semibold text-xl text-green-700 relative'>Mind Nibbles</span>
            </Link>
          </div>

          <button 
            className='text-2xl font-semibold md:hidden cursor-pointer'
            onClick={() => setIsOpen(!isOpen)}
            >
            {isOpen ? <X /> : <Menu />}
          </button>

          <ul 
            className={`absolute md:static top-17 left-0 z-10 w-full md:w-auto md:flex items-center bg-zinc-100 md:bg-transparent md:space-x-2 p-4 md:p-0 transition-all duration-500 ease-in-out ${
              isOpen ? 'block' : 'hidden'
            } md:flex`}
          >
            {navItems.map((item) => 
              item.active && (
                <li key={item.name}>
                  <NavLink 
                    to={item.slug} 
                    className={({ isActive })=> `block w-full px-4 py-1.5 hover:text-green-700 font-semibold cursor-pointer duration-200 ${isActive ? 'text-green-700' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </NavLink>
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