import React from 'react'
// import Marquee from 'react-fast-marquee'
// import { LazyLoadImage } from 'react-lazy-load-image-component'
// import HoverLine from '../../components/HoverLine'
import festivals from "../../constants/festivals"
import "../../index.css"
const FestivalSpecial = () => {
  return (
    <div className='my-10'>
      <div>
        <p className='text-2xl text-center mb-5'>Festival Special</p>
        <h1 className='text-4xl mb-10 text-center px-5 md:px-0'>
          Celebrate Festival by Inviting Family/Friends
        </h1>
      </div>
      {/* <Marquee gradient={false} pauseOnHover speed={window.innerWidth / 10}>
        {
          festivals?.map((fest, i) => (
            <div key={i} className="px-10 text-2xl">
              <div className="overflow-hidden cursor-pointer relative group w-52 h-90">
                <div className="z-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out   absolute from-black/80 to-transparent bg-gradient-to-t inset-x-0 -bottom-2 pt-30 text-white flex items-end">
                  <div>
                    <div className="p-5">
                      <div className="font-bold">{fest.name}</div>
                      <div><HoverLine text="Shop Now" /></div>
                    </div>
                  </div>
                </div>
                <LazyLoadImage
                  alt={fest.name}
                  className="object-cover h-full w-full group-hover:scale-110 transition duration-300 ease-in-out"
                  src={fest.featuredImage}
                />
              </div>
            </div>
          ))
        }
      </Marquee> */}
      <div className='h-[100%] pt-28 pb-10 flex items-center justify-center overflow-hidden'>
        <div className="slider">
          {
            festivals.map((fest, i) => (
              <span key={i} style={{'--i': i+1}}>
                <img src={fest.featuredImage} alt={fest.name} className='cursor-pointer'/>
              </span>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default FestivalSpecial