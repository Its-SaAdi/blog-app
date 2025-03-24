import React from 'react'
import logo from '../../images/Beyond Bytes.webp'

const Logo = ({width = "100px"}) => {
  return (
    <div>
      <img 
        src={logo} 
        alt="Webiste Logo"
        width={50}
        className='rounded-full mx-auto'
      />
    </div>
  )
}

export default Logo