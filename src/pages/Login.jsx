import React from 'react'
import LoginComp from '../components/Login/Login'

function Login() {
  return (
    <div className='py-8 flex justify-center items-center gap-12 flex-wrap bg-zinc-950'>
      <figure className='relative w-md not-md:hidden'>
        <img src="./login.svg" alt="login" />
        <div className='w-7 h-7 bg-indigo-500 rounded-full absolute top-4 right-20'></div>
        <div className='w-6 h-6 bg-indigo-500 rounded-full absolute top-12 right-10'></div>
        <div className='w-5 h-5 bg-indigo-500 rounded-full absolute top-18 right-20'></div>
      </figure>

      <LoginComp />
    </div>
  )
}

export default Login