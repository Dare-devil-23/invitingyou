import React, { useState } from 'react'
import { CiFilter } from 'react-icons/ci'
import { HiOutlineSortAscending } from 'react-icons/hi'
import { BiDollar } from 'react-icons/bi'
import { BsHeart } from 'react-icons/bs';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import trendingProducts from '../../constants/trendingProducts'
import CustomPaginate from '../../components/CustomPaginate';
import Filters from '../../components/Filters';
import HoverLine from "../../components/HoverLine"
import PopOver from '../../components/PopOver';
import { useDetectClickOutside } from 'react-detect-click-outside';

const Trending = () => {
  const [openFilter, setOpenFilter] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const lastPostIndex = currentPage * 8;
  const firstPostIndex = lastPostIndex - 8;
  const currentPosts = trendingProducts.slice(firstPostIndex, lastPostIndex)

  const ref = useDetectClickOutside({ onTriggered:()=>setOpenFilter(false)})

  return (
    <div className='min-h-screen mb-10' id="trendings" >
      <Filters open={openFilter} setOpenFilter={setOpenFilter} />
      <div className='flex justify-between px-5 items-center mb-10' id="filter" ref={ref}>
        <a href="#filter" >
          <div className='flex gap-2 place-items-center   relative' onClick={() => setOpenFilter(true)}>
            <CiFilter />
            <HoverLine text='Filter' />
          </div>
        </a>
        <div className='text-3xl'>
          Trending Invites
        </div>
          <PopOver label="Sort" icon={<HiOutlineSortAscending />}/>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-4 place-items-center'>
        {
          currentPosts.map((item, i) => (
            <div key={i} className="m-5   mb-10">
              <LazyLoadImage
                src={item.image}
                alt={item.name}
                className="w-52 h-60 hover:scale-95 duration-1000 transition-all"
              />
              <div className='flex justify-between py-4 font-bold text-lg'>
                <div>
                  {item.name}
                </div>
                <div className='flex place-items-center gap-2'>
                  <div className='flex place-items-center'>
                    {item.price}
                    <BiDollar />
                  </div>
                  <div className=''>
                    <BsHeart className='' />
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className='w-full mx-auto'>
        <CustomPaginate
          currentPage={currentPage}
          length={trendingProducts.length}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  )
}

export default Trending