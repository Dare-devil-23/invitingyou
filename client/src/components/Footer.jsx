import React from 'react'
import Marquee from 'react-fast-marquee'
import HoverLine from "./HoverLine"
import otherLinks from "../constants/otherLinks"
import { AiOutlineAmazon, AiOutlineFacebook, AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai"
import { Link } from 'react-router-dom'

const Footer = () => {
  const scrollingPhrases = [
    {
      phrase: "Cherish Your Love",
      image: ''
    },
    {
      phrase: "Strengthen Family Ties",
      image: ''
    },
    {
      phrase: "Enjoy Time Together",
      image: ''
    },
    {
      phrase: "Embrace Affection",
      image: ''
    },
    {
      phrase: "Create Bonding Moments",
      image: ''
    },
    {
      phrase: "Celebrate Together Joyfully",
      image: ''
    },
    {
      phrase: "Share Loving Memories",
      image: ''
    },
    {
      phrase: "Unite Your Family",
      image: ''
    },
  ]

  return (
    <footer
      style={{ '--image-url': 'url("/bg/footer_left_bottom.png")' }}
      className='min-h-screen dark:text-white bg-gray-100 bg-[image:var(--image-url)] bg-contain lg:bg-right bg-bottom bg-no-repeat dark:bg-zinc-900'
    >
      <div className='h-3/4 p-5'>
        <div className='w-full text-center md:text-left md:flex md:justify-between text-3xl'>

          <div className='mb-5 md:mb-0 font-bold flex gap-1 items-center'>
            <img src="/logo-nobg.png" className='h-10 w-10' alt="logo" />
            <img src="/logo-text.png" className='h-10 w-fit' alt="logo" />
          </div>
          <div className='flex gap-4 justify-center'>
            <AiOutlineInstagram className='cursor-pointer hover:text-fuchsia-500 transition-all duration-500' />
            <AiOutlineFacebook className='cursor-pointer hover:text-fuchsia-500 transition-all duration-500' />
            <AiOutlineTwitter className='cursor-pointer hover:text-fuchsia-500 transition-all duration-500' />
            <AiOutlineAmazon className='cursor-pointer hover:text-fuchsia-500 transition-all duration-500' />
          </div>
        </div>
        <div className='w-full grid grid-cols-1 lg:grid-cols-5 my-14 text-lg'>
          <div className='lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-10'>
            <div className='min-w-40'>
              <h1 className='mb-5 font-bold'>Need help ?</h1>
              <div><HoverLine text="Email: contact@canursvp.com" /></div>
              <div><HoverLine text="Phone: +99 123 123 123" /></div>
            </div>
            <div className='min-w-40'>
              <h1 className='mb-5 font-bold'>Brand</h1>
              <div><HoverLine text="Our engagements" /></div>
              <div><HoverLine text="Our story" /></div>
            </div>
            <div className='min-w-40'>
              <h1 className='mb-5 font-bold'>Site Map</h1>
              {
                otherLinks.map((link, i) => (
                  <div key={i} onClick={() => {
                    window.scrollTo({
                      top: 0,
                      behavior: 'smooth'
                    })
                  }}>
                    <Link to={`/${link.route}`} >
                      <HoverLine text={link.name} />
                    </Link>
                  </div>
                ))
              }
            </div>
            <div>
              <h1 className='mb-5'>FREQUENTLY ASKED QUESTIONS (FAQ)</h1>
              <div><HoverLine text="My account" /></div>
              <div><HoverLine text="Shipping Policy" /></div>
              <div><HoverLine text="Contact us" /></div>
            </div>
          </div>
          <div className='lg:col-span-2 w-full mt-10 lg:mt-0'>
            <h1 className='text-2xl'>Subscribe to our newsletter to receive our information</h1>
            <input placeholder='Enter email' type={'email'} className='p-3 my-5 border w-3/4 border-gray-500 bg-transparent' />
            <button className='p-3 border border-gray-500 w-1/4 bg-gray-100 dark:bg-zinc-900'>Subscribe</button>
          </div>
        </div>
      </div>
      <Marquee
        gradient={false}
        speed={50}
        className="h-1/4 py-5"
      >
        {
          scrollingPhrases.map((item, index) => (
            <span key={index} className="text-3xl font-dance px-10">
              {item.phrase}&nbsp;
            </span>
          ))
        }
      </Marquee>
    </footer>
  )
}

export default Footer