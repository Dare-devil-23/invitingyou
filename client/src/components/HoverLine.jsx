import React from 'react'

const HoverLine = ({ text }) => {
  return (
    <div className="relative group hover:text-fuchsia-500 cursor-pointer w-fit">
      <span className='transition-all duration-300'>{text}</span>
      <span className="absolute -bottom-0 left-0 w-0 h-[2px] bg-fuchsia-500 transition-all ease-out duration-300 group-hover:w-full"></span>
    </div>
  )
}

export default HoverLine