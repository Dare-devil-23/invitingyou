import React from 'react'
import { motion } from 'framer-motion'

const Modal = ({ isOpen, onClose }) => {
  const modalVarient = {
    show: {
      scale: 1,
      trasition: {
        duration: 2,
        ease: 'linear',
        damping: 0
      }
    },
    hidden: {
      scale: 0,
      trasition: {
        duration: 2,
        ease: 'linear',
        damping: 0
      }
    },
  }
  return (
    <motion.div initial={false} variants={modalVarient} animate={isOpen ? 'show' : 'hidden'} className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-100 dark:bg-zinc-900 w-1/2 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Hire a Designer</h2>
        <div className="flex justify-end">
          <button
            type="button"
            className="px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded"
          >
            Hire
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default Modal