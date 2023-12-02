import React, { useState } from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import ReactSimplyCarousel from 'react-simply-carousel';

const AboutUs = () => {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  return (
    <div className='min-h-screen'>
      <h1 className='text-5xl text-center mt-5 p-5'>
        About Canursvp
      </h1>
      <div className='flex w-full lg:w-1/2 lg:text-center mx-auto text-lg px-10 pt-5'>
        Inviting You offers a wide array of spectacular
        invitation templates in assorted styles and lets
        you design the perfect invitation in just a few
        clicks! Our design tools allow you to add a
        personal touch to your creation by adding images,
        logos, and text thereby generating elegant invitations
        and greeting cards for your occasions.
      </div>
      <div className='p-10 flex flex-col lg:flex-row gap-10 mt-20'>
        <div className='lg:w-1/2'>
          <LazyLoadImage src="https://images.pexels.com/photos/614482/pexels-photo-614482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt='our vision' />
        </div>
        <div className='lg:w-1/2'>
          <h1 className='text-3xl mb-5'>
            Our Vision
          </h1>
          <div className='leading-8'>
            At Inviting You, we believe that anyone, regardless
            of design experience, should be able to create beautiful
            content with minimal effort. Our vision is to empower
            people across the world to express themselves through
            beautiful designs that they can be proud of and that
            their loved ones will appreciate. With our exquisite
            digital invites, we are dedicated to assisting our customers
            in celebrating their valuable relationships and special
            events that give life meaning and purpose. ‘Inviting You’
            believes in the power of expression and is always available
            to assist people with the words, designs, and stories they require.
            Our team is versatile, talented, and enthusiastic and we are
            admired for our creativity and innovative work. The happiness
            of people is the center of everything we do, and we strive to
            achieve this with our beautiful and easily accessible designs.
          </div>
        </div>
      </div>
      <div className='bg-gray-100 dark:bg-zinc-900 p-10 my-5'>
        <h1 className='text-4xl text-center mb-5'>Our Values</h1>
        <div className='flex w-full lg:w-1/2 text-center mx-auto text-lg'>
          Our team is highly committed to serving
          our customers with the best possible solutions
          and always strives to make a positive difference
          in the businesses we serve.
        </div>
      </div>
      <div className='p-10 flex flex-col-reverse lg:flex-row gap-10'>
        <div className='lg:w-1/2'>
          <h1 className='text-3xl mb-5'>
            Our Mission
          </h1>
          <div className='leading-8'>
            With our user-friendly digital platform,
            Inviting You’s mission is to consistently push
            the limits of print & designs beyond what we thought was
            possible. Our passion is to create intricately crafted designs
            while also offering unparalleled service to our customers.
            Team Inviting You is persistent to embrace each new
            challenge that comes our way and presenting innovative
            and high-quality solutions to our customers.
          </div>
        </div>
        <div className='lg:w-1/2'>
          <LazyLoadImage src="https://images.pexels.com/photos/262438/pexels-photo-262438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt='our vision' />
        </div>
      </div>
      <div className='m-10 relative'>
        <h1 className='text-5xl px-10 mb-10'>
          Our People
        </h1>
        <ReactSimplyCarousel
          activeSlideIndex={activeSlideIndex}
          onRequestChange={setActiveSlideIndex}
          itemsToShow={1}
          itemsToScroll={1}
          dotsNav={{
            show: true,
            itemBtnProps: {
              className:"z-50 h-1 w-20 trasition-trnasfrom duration-500 bg-gray-200 dark:bg-zinc-900 my-10"
            },
            activeItemBtnProps: {
              className:"z-50 h-1 w-20 trasition-trnasfrom duration-500 bg-black dark:bg-white my-10"
            }
          }}
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
              itemsToShow: 2,
              itemsToScroll: 1,
              minWidth: 1000,
            },
          ]}
          speed={400}
          easing="ease-in"
        >
          <div className='h-full w-[400px] px-5'>
            <LazyLoadImage className='h-full' src="https://images.pexels.com/photos/14024329/pexels-photo-14024329.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt='one' />
          </div>
          <div className='h-full w-[400px] px-5'>
            <LazyLoadImage className='h-full' src="https://images.pexels.com/photos/846741/pexels-photo-846741.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt='two' />
          </div>
          <div className='h-full w-[400px] px-5'>
            <LazyLoadImage className='h-full' src="https://images.pexels.com/photos/2769753/pexels-photo-2769753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt='three' />
          </div>
          <div className='h-full w-[400px] px-5'>
            <LazyLoadImage className='h-full' src="https://images.pexels.com/photos/7142755/pexels-photo-7142755.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt='four' />
          </div>
        </ReactSimplyCarousel>
      </div>
    </div>
  )
}

export default AboutUs