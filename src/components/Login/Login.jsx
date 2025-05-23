import React, { useState } from 'react'
import authService from '../../appwrite/authService'
import { login as authLogin } from '../../store/authSlice'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import { Button, Input, Logo } from '../index'
import { useForm } from 'react-hook-form'

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const { register, handleSubmit } = useForm();

    const login = async (data) => {
        // console.log(data);
        setError("");
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                navigate("/");
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className='flex items-center justify-center w-[45%] not-sm:w-[92%] py-8'>
          <div className={`mx-auto w-full max-w-lg bg-zinc-100 rounded-3xl shadow-lg p-10 border border-black/10`}>
            <div className="mb-3 flex justify-center">
              <span className='inline-block w-full max-w-[100px]'>
                <Logo width='100%'/>
              </span>
            </div>
    
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
            <p className="mt-2 text-center text-base text-black/60">
              Don&apos;t have any account?&nbsp;
              <Link
                  to="/signup"
                  className="font-medium text-primary transition-all duration-200 hover:underline"
              >
                  Sign Up
              </Link>
            </p>
    
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
    
            <form onSubmit={handleSubmit(login)} className='mt-8 text-left'>
              <div className="space-y-5">
                <Input 
                  label="Email: "
                  placeholder="johndoe@gmail.com"
                  type="email"
                  required
                  {...register("email", {
                    required: true,
                    validate: {
                      matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                    }
                  })}
                />
    
                <Input 
                  label="Password: "
                  placeholder="12345678"
                  type="password"
                  required
                  {...register("password", {
                    required: true,
                  })}
                />
    
                <Button type='submit' bgColor='bg-green-700' className='w-full cursor-pointer hover:bg-green-800 transition-colors duration-200 font-semibold rounded-xl shadow-md'>Sign in</Button>
              </div>
            </form>
    
          </div>
        </div>
      )
}

export default Login