import { useContext, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { motion } from "framer-motion";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
import customToast from "../hooks/customToast";
import apiClient from "../axios";


export default function RegisterPage() {
  const {user} = useContext(UserContext);
  const [showField, setShowField] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fieldVarients = {
    hidden: {
      opacity: 1,
      y: 37,
      x: 12,
    },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: 4,
        ease: 'linear',
        damping: 0
      }
    }
  }

  const registerUser = (ev) => {
    ev.preventDefault();
    apiClient.post('/register', {
      name,
      email,
      password,
    },{
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      customToast("Resitration successful")
      setName('')
      setEmail('')
      setPassword('')
      window.location.href = '/login';
    }).catch((e) => {
      customToast(e?.response?.data.error || "Something went wrong" , "error")
    })
  }

  if(user?.email){
    return <Navigate to="/" replace={true}/> 
  }
  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 hidden lg:block">
        <LazyLoadImage src="https://images.pexels.com/photos/9721597/pexels-photo-9721597.jpeg"
          alt="sighnup"
          className="w-full h-full object-cover" />
      </div>
      <div className="w-full lg:w-1/2 mx-10 lg:px-20 flex justify-center flex-col h-fit">
        <h1 className="text-center text-3xl my-5">Create Account</h1>
        <form className="flex flex-col" onSubmit={registerUser}>
          <motion.div
            variants={fieldVarients}
            animate={(showField === 'Name' || name !== '') ? 'animate' : 'hidden'}
            className="-z-10 mt-2"
          >
            Name
          </motion.div>
          <input
            type="text"
            value={name}
            required
            className='w-full p-3 border-b border-gray-500 bg-transparent focus:outline-none'
            onClick={() => setShowField("Name")}
            onChange={ev => setName(ev.target.value)}
          />
          <motion.div
            variants={fieldVarients}
            animate={(showField === 'Email' || email !== '') ? 'animate' : 'hidden'}
            className="-z-10 mt-2"
          >
            Email
          </motion.div>
          <input
            type="email"
            value={email}
            required
            className='w-full p-3 border-b border-gray-500 bg-transparent focus:outline-none'
            onClick={() => setShowField("Email")}
            onChange={ev => setEmail(ev.target.value)}
          />
          <motion.div
            variants={fieldVarients}
            animate={(showField === 'Password' || password !== '') ? 'animate' : 'hidden'}
            className="-z-10 mt-2"
          >
            Password
          </motion.div>
          <input 
            type="password"
            required
            value={password}
            className='w-full p-3 border-b border-gray-500 bg-transparent focus:outline-none'
            onClick={() => setShowField("Password")}
            onChange={ev => setPassword(ev.target.value)} />
          <button
            type="submit"
            className='w-3/4 mx-auto mt-5 text-lg transition-all duration-500 shadow-lg px-5 py-2 rounded-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l'
          >Register</button>
        </form>
      </div>
    </div>
  );
}