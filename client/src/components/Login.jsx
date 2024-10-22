import React from 'react'
import HoverLine from "./HoverLine"
import { FcGoogle } from "react-icons/fc"
import { ImFacebook } from "react-icons/im"
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext.jsx";
import customToast from '../hooks/customToast'
import apiClient from '../axios.js'

const Login = ({ setOpen }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const logInUser = (ev) => {
    ev.preventDefault();
    apiClient.post('/login', { email, password }).then((res) => {
      setUser(res.data)
      customToast("Logged in")
      navigate('/account')
    }).catch((err) => {
      customToast(err.response?.data || "Something went wrong", "error")
    })
  }

  return (
    <div className='h-full w-full max-w-lg p-10 rounded-lg mx-auto bg-gray-100 dark:bg-zinc-900 overflow-x-hidden mb-10'>
      <form className='flex flex-col' onSubmit={logInUser}>
        <h1 className='text-3xl'>Log in</h1>
        <label className='text-left'>Email</label>
        <input
          type={'email'}
          placeholder="Enter your email"
          onChange={ev => setEmail(ev.target.value)}
          className='p-3 my-5 mx-1 border border-gray-500 bg-transparent' />
        <label className='text-left'>Password</label>
        <input
          type={'password'}
          placeholder="Password"
          onChange={ev => setPassword(ev.target.value)}
          className='p-3 my-5 mx-1 border border-gray-500 bg-transparent' />
        <button type="submit" className='w-3/4 mx-auto mt-5 text-lg transition-all duration-500 shadow-lg px-5 py-2 rounded-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l'>
          Login
        </button>
        <div className='flex justify-center'>
          Don't have account?&nbsp;
          <Link to="/register" onClick={() => setOpen(false)}>
            <HoverLine text={"Create"} />
          </Link>
        </div>
        <div className='flex gap-5 text-xl justify-center mt-10'>
          <FcGoogle className='  ' />
          <ImFacebook className='text-blue-600  ' />
        </div>
      </form>
    </div>
  )
}

export default Login