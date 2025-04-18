import React from 'react'
import logo from '../../images/logo-transparent.png'

const Logo = ({width = "100px"}) => {
  return (
    <div>
      <img 
        src={logo} 
        alt="Webiste Logo"
        width={60}
        className='rounded-full mx-auto'
      />
    </div>
  )
}

export default Logo