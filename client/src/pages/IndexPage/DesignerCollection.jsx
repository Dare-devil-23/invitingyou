import React, { useState } from 'react'
import { FaCodepen, FaInstagram, FaDribbble, FaFacebook } from 'react-icons/fa'
import Modal from '../../components/Modal'

const designers = [
  {
    name: "Mark",
    photo: 'https://images.pexels.com/photos/8971793/pexels-photo-8971793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    name: "Hopper",
    photo: 'https://images.pexels.com/photos/13794995/pexels-photo-13794995.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    name: "John",
    photo: 'https://images.pexels.com/photos/10025077/pexels-photo-10025077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
]

const DesignerCollection = () => {
  const [showDetails, setShowDetails] = useState(null)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='overflow-auto'>
      <h1 className='text-3xl text-center mb-5'>
        Top Dedsigner Collections
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center gap-5 m-10'>
        {
          designers.map((designer, i) => (
            <div key={i} className='w-full flex justify-center'>
              <div
                style={{ '--image-url': `url(${designer.photo})` }}
                className={`
                  bg-[image:var(--image-url)] bg-[length:300px_400px] bg-center bg-no-repeat hover:bg-left hover:bg-[length:500px_700px]
                  h-[379px] w-[300px] bg-black rounded-lg transition-all duration-1000 overflow-hidden shadow-lg flex items-center justify-center
                `}
                onMouseEnter={() => setShowDetails(i)}
                onMouseLeave={() => setShowDetails(null)}
              >
                <div className='h-[369px] w-[290px] rounded-lg border-2 border-transparent transition-[border] hover:border-white relative'>
                  <h2 className={
                    `text-white m-5 transition-opacity duration-1000 text-2xl opacity-0
                    ${showDetails === i ? 'opacity-100' : ''}
                    `
                  }>
                    {designer.name}
                  </h2>
                  <div className={`
                    absolute fill-current text-white h-[130px] top-[226px] w-[50px] flex flex-col items-center justify-around
                    transition-opacity duration-1000 opacity-0
                    ${showDetails === i ? 'opacity-100' : ''}
                  `}>
                    <a href='https://codesandbox.io/' target='_blank'>
                      <FaCodepen className='hover:text-fuchsia-500 transition-all duration-500 text-lg' />
                    </a>
                    <a href='https://instagram.com/' target='_blank'>
                      <FaInstagram className='hover:text-fuchsia-500 transition-all duration-500 text-lg' />
                    </a>
                    <a href='https://dribbble.com/' target='_blank'>
                      <FaDribbble className='hover:text-fuchsia-500 transition-all duration-500 text-lg' />
                    </a>
                    <a href='https://facebook.com/' target='_blank'>
                      <FaFacebook className='hover:text-fuchsia-500 transition-all duration-500 text-lg' />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className='text-center my-5'>
        <button 
          onClick={()=>setIsOpen(true)}
          className='text-lg transition-all duration-500 shadow-lg px-6 py-2 rounded-full text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l'>
          Hire Designer
        </button>
      </div>
      <Modal isOpen={isOpen} onClose={()=>setIsOpen(false)} />
    </div>
  )
}

export default DesignerCollection