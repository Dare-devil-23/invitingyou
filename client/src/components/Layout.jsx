import { useState, useEffect } from 'react';
import Navbar from "./Navbar"
import Footer from "./Footer"
import { BsMoonStars, BsSun } from 'react-icons/bs'
import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"))

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      localStorage.setItem("theme", theme)
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem("theme", theme)
    }
  }, [theme])

  const themeVariants = {
    dark: {
      rotate: 90,
      transition: {
        duration: 0.2,
      },
    },
    light: {
      rotate: 0,
      transition: {
        duration: 0.2,
      },
    },
  };
  return (
      <div className="font-forum transition-colors duration-300">
        <div className='right-0 bottom-0 fixed z-50'>
          {
            theme === 'dark' ? (
              <motion.button
                variants={themeVariants}
                animate={theme === 'dark' ? 'dark' : 'light'}
                onClick={() => setTheme('light')}
                className='m-5 p-3 drop-shadow-md text-black bg-white rounded-full'
              >
                <BsSun />
              </motion.button>
            ) : (
              <motion.button
                onClick={() => setTheme('dark')}
                className='m-5 p-3 drop-shadow-md text-white bg-black rounded-full'
              >
                <BsMoonStars />
              </motion.button>
            )
          }
        </div>
        <Navbar />
          <div >
            <Toaster />
            <Outlet />
          </div>
        <Footer />
      </div>
  )
}

export default Layout