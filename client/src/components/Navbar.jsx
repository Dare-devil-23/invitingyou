import { BsHandbag, BsHeart } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';
import HoverLine from './HoverLine';
import otherLinks from '../constants/otherLinks';
import { HiOutlineUser } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import toSnakeCase from '../helpers/stringToSnake';

const Navbar = () => {
  const [openAllInvites, setopenAllInvites] = useState(false)
  const [other, setOther] = useState(false)
  const [openWishList, setOpenWishList] = useState(false)
  const [openCart, setOpenCart] = useState(false)

  const [allInvites, setAllInvites] = useState([])

  useEffect(() => {
    getCategories()
  }, [])

  const getCategories = () => {
    axios.get(`/subcategories`).then((res) => {
      setAllInvites(res.data)
    }).catch(err => {
      console.error(err)
    })
  }

  const ref = useDetectClickOutside({
    onTriggered: () => {
      setOpenCart(false)
      setOpenWishList(false)
    }
  })

  const navVariants = {
    hidden: {
      opacity: 0,
      y: -50,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 140,
      },
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        delay: .5,
      },
    },
  };
  return (
    <motion.nav
      variants={navVariants}
      initial='hidden'
      animate='show'
      className='grid grid-cols-7 items-center text-center p-5 select-none relative'
      ref={ref}
      onMouseLeave={() => {
        setOther(false)
        setopenAllInvites(false)
      }}
    >
      <div className='col-span-2 hidden lg:flex justify-evenly '>
        <div onMouseEnter={() => {
          setopenAllInvites(true)
          setOther(false)
        }}>
          <HoverLine text="All Invites" />
        </div>
        <div onMouseEnter={() => {
          setOther(true)
          setopenAllInvites(false)
        }}>
          <HoverLine text="Others" />
        </div>
      </div>
      <div className='col-span-7 lg:col-span-3 text-3xl font-semibold '>
        <Link to="/">Inviting You</Link>
      </div>
      <div className='col-span-2 hidden lg:flex gap-8 justify-end'>
        <BsHeart className='items-center cursor-pointer' onClick={() => setOpenWishList(true)} />
        <BsHandbag className='items-center cursor-pointer' onClick={() => setOpenCart(true)} />
        <Link to="/login" >
          <HiOutlineUser className='items-center' />
        </Link>
      </div>
      <div className='absolute top-[60px] bg-gray-100 dark:bg-zinc-900 w-screen z-50'>
        <SlideDown className={'my-dropdown-slidedown'}>
          {
            openAllInvites ? <div className='grid grid-cols-4 gap-5 p-5 w-3/4 mx-auto text-left'>
              {
                allInvites.map((item, index) => (
                  <div key={index}>
                    <span className='font-bold'>
                      {item.name}
                    </span>
                    <div>
                      {
                        item.sub_categories.map((field_item, field_index) => (
                          <div key={field_index} className='px-2 cursor-pointer leading-8'>
                            <Link 
                              to={`/category/${toSnakeCase(item.name)}`} 
                              state={{id : item._id, sub_cat : field_item._id}}
                              onClick={()=>setopenAllInvites(false)}
                            >
                              <HoverLine text={field_item.name}/>
                            </Link>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                ))
              }
            </div> : null
          }
        </SlideDown>
        <SlideDown className={'my-dropdown-slidedown'}>
          {
            other ? <div className='flex justify-around mx-auto p-5'>
              {
                otherLinks.map((item, index) => (
                  <Link to={`${item.route}`} key={index} onClick={() => setOther(false)}>
                    {item.name}
                  </Link>
                ))
              }
            </div> : null
          }
        </SlideDown>
      </div>
    </motion.nav>
  )
}

export default Navbar