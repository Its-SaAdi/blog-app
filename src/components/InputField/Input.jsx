import React, {useId, forwardRef} from 'react'

const Input = forwardRef(function Input({
    label,
    type = "text",
    className = "",
    isRequired,
    ...props
}, ref) {
    const id = useId();

    return (
        <div className='w-full'>
            {label && <label
                className='text-sm font-medium mb-2 pl-1 text-left flex gap-0.5'
                htmlFor={id}
            >
                {label}
                {isRequired && (
                    <span className='text-red-600'>
                        *
                    </span>
                )}
            </label>}
            
            <input  
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                id={id}
                ref={ref}
                {...props}
            />
        </div>
    )
});

export default Input