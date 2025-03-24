import React from 'react'
import SignupComp from '../components/Signup/Signup'

function Signup() {
  return (
    <div className='py-8 flex justify-center items-center gap-12 flex-wrap bg-zinc-950'>
        <figure className='relative w-lg not-md:hidden'>
          <img src="./sign-up1.svg" alt="sign-up" />
        </figure>

        <SignupComp />
    </div>
  )
}

export default Signup