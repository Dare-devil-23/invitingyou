import React from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component";
import services from '../../constants/services'

const ServiceDetails = () => {
  return (
    <div className='grid lg:grid-cols-4 gap-5 grid-cols-2 mb-20 mt-10'>
      {
        services.map((service, i) => (
          <div key={i} className="flex flex-col items-center text-center px-5">
            <LazyLoadImage src={service.image} className="h-28 w-28 dark:invert" alt={service.name} />
            <h1 className='text-2xl'>
              {service.name}
            </h1>
            <p className='text-xl'>
              {service.description}
            </p>
          </div>
        ))
      }
    </div>
  )
}

export default ServiceDetails