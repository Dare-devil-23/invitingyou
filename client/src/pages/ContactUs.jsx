import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useDetectClickOutside } from "react-detect-click-outside";

const ContactUs = () => {
  const [showField, setShowField] = useState(null);

  const fieldVarients = {
    hidden: {
      opacity: 1,
      y: 32,
      x:12,
    },
    show: {
      opacity: 1,
      y: 0,
      x:0,
      transition: {
        duration: 4,
        ease: 'linear',
        damping:0
      }
    }
  }

  const ref = useDetectClickOutside({ onTriggered: ()=>setShowField(null) });

  return (
    <div className='min-h-screen '>
      <div>
        <h1 className='text-5xl p-5 text-center'>
          Contact Us: We LOVE hearing from You!
        </h1>
      </div>
      <div className='h-10 bg-gray-100 dark:bg-zinc-900 w-full mb-10 flex justify-evenly place-items-center'>
        <span className=' '>
          FAQS
        </span>
        <span className=' '>
          SALES INQUIRY
        </span>
        <span className=' '>
          PRIVACY PLOICY
        </span>
        <span className=' '>
          TERMS
        </span>
      </div>
      <div className='flex gap-10 justify-center flex-col md:flex-row mb-10'>
        <div className='w-full lg:w-1/3 p-5'>
          <h2 className='text-3xl pb-5'>
            Send Us A Message
          </h2>
          <form className='flex flex-col leading-5' ref={ref}>
            <motion.div
              variants={fieldVarients}
              animate={showField === 'Name' ? 'animate' : 'hidden'}
              className="-z-10 mt-2"
            >
              Name
            </motion.div>
            <input
              name="name"
              input="text"
              className='w-full p-3 border-b border-gray-500 bg-transparent focus:outline-none'
              onClick={()=>setShowField("Name")}
            />
            <motion.div
              variants={fieldVarients}
              animate={showField === 'Email' ? 'animate' : 'hidden'}
              className="-z-10 mt-2"
            >
              Email
            </motion.div>
            <input
              name="email"
              input="email"
              className='w-full p-3 border-b border-gray-500 bg-transparent focus:outline-none'
              onClick={()=>setShowField("Email")}
            />
            <motion.div
              variants={fieldVarients}
              animate={showField === 'Comment' ? 'animate' : 'hidden'}
              className="-z-10 mt-2"
            >
              Comment
            </motion.div>
            <textarea
              rows={4}
              name="Comment"
              className='w-full p-3 border-b border-gray-500 bg-transparent focus:outline-none'
              onClick={()=>setShowField("Comment")}
            />
            <button className='w-full bg-black text-white dark:text-black dark:bg-white py-3 mt-5'>
              Send Now
            </button>
          </form>
        </div>
        <div className='w-full lg:w-1/3 p-5 '>
          <h2 className='text-3xl pb-5'>
            For Fit Questions And Comments
          </h2>
          <ul className='leading-5'>
            <li className='py-5'>CHAT NOW</li>
            <li className='py-5'>CALL AT 1-123-123-123</li>
            <li className='py-5'>info@canursvp.com</li>
            <li className='py-5'>BOOK AN APPOINMENT</li>
            <li className='py-5'>Racquel & Joe have been with Anatomie for years and are able to help you find the perfect fit to your body.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ContactUs