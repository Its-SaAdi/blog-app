import React from 'react'

const Button = ({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    title = "",
    className = "",
    ...props
}) => {
  return (
    <button
        type={type}
        className={`px-4 py-2 rounded-lg cursor-pointer ${className} ${bgColor} ${textColor}`}
        title={title}
        {...props}
    >
        {children}
    </button>
  )
}

export default Button