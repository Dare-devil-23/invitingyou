import { useState } from 'react';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import ReactSimplyCarousel from 'react-simply-carousel';
import testimonialData from "../../constants/testimonialData"

const Testimonials = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  return (
    <div className='cursor-grabbing my-20 relative'>
      <h1 className='text-3xl px-10 md:px-20 mb-5'>
        Our Customers Say....
      </h1>
      <div className='bg-gray-100 dark:bg-zinc-900'>
        <ReactSimplyCarousel
          activeSlideIndex={activeSlideIndex}
          onRequestChange={setActiveSlideIndex}
          itemsToShow={1}
          itemsToScroll={1}
          forwardBtnProps={{
            className: "p-5 h-fit my-auto absolute top-0 right-0 z-50",
            children: <BsArrowRight />,
          }}
          backwardBtnProps={{
            className: "p-5 h-fit my-auto absolute top-0 right-10 z-50",
            children: <BsArrowLeft />,
          }}
          responsiveProps={[
            {
              itemsToShow: 4,
              itemsToScroll: 1,
              minWidth: 768,
            },
          ]}
          speed={400}
          easing="linear"
        >
          {
            testimonialData.map((item, index) => (
              <div key={index} className="p-5 w-60 rounded-lg h-full">
                <div className='flex flex-col justify-between gap-5'>
                  <div className='font-bold'>
                    {item.rating}&nbsp;ratings
                  </div>
                  <div className='text-2xl mt-5'>
                    "{item.comment}"
                  </div>
                  <div className='text-lg'>
                    {item.author}
                  </div>
                </div>
              </div>
            ))
          }
        </ReactSimplyCarousel>
      </div>
    </div>
  );
}

export default Testimonials;