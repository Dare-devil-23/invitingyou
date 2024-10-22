import React, { Fragment, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LoadImg from '../components/LoadImg'
import customToast from '../hooks/customToast'
import { BsHeart } from 'react-icons/bs'
import Accordion from '../components/Accordion'
import apiClient from '../axios'

const Category = () => {
  const [category, setCategory] = useState({})
  const location = useLocation()
  const id = location.state?.id
  const sub_cat = location.state?.sub_cat

  useEffect(() => {
    apiClient.get(sub_cat ? `/categories/${id}/?sub_cat=${sub_cat}` : `/categories/${id}`).then((res) => {
      setCategory(res.data)
    }).catch((err) => {
      customToast(err.response.message || "Something went wrong", "error")
    })
  }, [id,sub_cat])

  return (
    <div className='min-h-screen'>
      {
        category._id && (
          <div className='flex flex-col'>
            <div className='h-80 w-screen relative'>
              <div className='w-full h-full'>
                <LoadImg src={category.hero_banner} alt={category._id} className="w-full h-full object-cover rounded-none" />
              </div>
              <div className='absolute left-10 top-10 lg:w-1/2 font-medium'>
                <h1 className='text-5xl mb-5 '>Find your favorite card for {category.name}</h1>
                <p className='font-2xl'>
                  {category.description}
                </p>
              </div>
            </div>
            <div className='min-h-screen'>
              <div className='flex mt-10'>
                <div className="flex flex-col h-screen p-3 w-80">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <h2 className="text-xl font-bold">Filters</h2>
                    </div>
                    <div className="flex-1">
                      <ul className="pt-2 pb-4 space-y-1 text-sm">
                        <li className="rounded-sm">
                          <Accordion title={"Sort By"} children={[
                            "Most Popular",
                            "Recently Added",
                            "Price (Low)",
                            "Price (High)"
                          ]} />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="container mx-auto">
                  <div className="grid w-full grid-cols-12 gap-6 mb-6">
                    {
                      category.sub_categories.map((subCategory) => (
                        <Fragment key={subCategory._id}>
                          {
                            subCategory.cards.map((card) => (
                              <div key={card._id} className='col-span-12 md:col-span-4 lg:col-span-3'>
                                <Link to={`/customize/${card._id}`} state={{ cardId: card._id }} className="flex flex-col w-fit cursor-pointer overflow-hidden relative z-[1]">
                                  <LoadImg src={card.image} alt={card._id} className="w-full h-[280px] hover:scale-105 transition-all duration-500" />
                                  <div className='flex justify-between font-medium mt-2'>
                                    <h1>{card.name}</h1>
                                    <p>$&nbsp;{card.price}</p>
                                  </div>
                                  <p className='text-gray-500 dard:text-zinc-500'>{card.designer}</p>
                                  <button className='top-3 right-3 absolute' onClick={() => { }}>
                                    <BsHeart className='hover:text-red-600 transition-all duration-500 text-xl' />
                                  </button>
                                </Link>
                              </div>
                            ))
                          }
                        </Fragment>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }

    </div>
  )
}

export default Category